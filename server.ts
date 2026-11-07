import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory token cache for Zoho Bigin OAuth
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

/**
 * Helper to obtain a valid Zoho Bigin access token using the refresh token flow.
 */
async function getBiginAccessToken(): Promise<string | null> {
  const clientId = process.env.BIGIN_CLIENT_ID;
  const clientSecret = process.env.BIGIN_CLIENT_SECRET;
  const refreshToken = process.env.BIGIN_REFRESH_TOKEN;
  const accountsUrl = process.env.BIGIN_ACCOUNTS_URL || 'https://accounts.zoho.in';

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  // Return cached token if valid (with a 60-second safety window)
  if (cachedAccessToken && Date.now() < tokenExpiresAt - 60000) {
    return cachedAccessToken;
  }

  try {
    const params = new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
    });

    const response = await fetch(`${accountsUrl}/oauth/v2/token?${params.toString()}`, {
      method: 'POST',
    });

    const data = (await response.json()) as {
      access_token?: string;
      expires_in?: number;
      error?: string;
    };

    if (data.access_token) {
      cachedAccessToken = data.access_token;
      tokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000;
      return cachedAccessToken;
    } else {
      console.error('[Bigin] Failed to refresh OAuth access token:', data);
      return null;
    }
  } catch (err) {
    console.error('[Bigin] Network error requesting OAuth token:', err);
    return null;
  }
}

/**
 * POST /api/bigin/contact
 * Endpoint to store incoming web form submissions as Contacts in Bigin by Zoho CRM.
 */
app.post('/api/bigin/contact', async (req, res) => {
  try {
    const { name, district, contactNumber, biMonthlyBill, source } = req.body;

    if (!name || !contactNumber) {
      return res.status(400).json({
        success: false,
        error: 'Name and contact number are required.',
      });
    }

    // Split name into First_Name and Last_Name (Bigin Contacts module requires Last_Name)
    const nameParts = String(name).trim().split(/\s+/);
    let firstName = '';
    let lastName = '';

    if (nameParts.length === 1) {
      lastName = nameParts[0];
    } else {
      firstName = nameParts.slice(0, -1).join(' ');
      lastName = nameParts[nameParts.length - 1];
    }

    const leadNote = [
      `District: ${district || 'Not specified'}`,
      `Bi-monthly EB Bill: ${biMonthlyBill || 'Not specified'}`,
      `Lead Source: ${source || 'NIRT Renewable Energy Website'}`,
      `Captured At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    ].join(' | ');

    const contactPayload = {
      Last_Name: lastName,
      ...(firstName ? { First_Name: firstName } : {}),
      Phone: contactNumber,
      Mobile: contactNumber,
      Mailing_City: district || '',
      Description: leadNote,
    };

    // 1. Try Bigin Webhook / Web-to-Contact Form URL if defined
    const webhookUrl = process.env.BIGIN_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...contactPayload,
            name,
            district,
            contactNumber,
            biMonthlyBill,
            source,
          }),
        });

        if (webhookRes.ok) {
          return res.json({
            success: true,
            message: 'Contact stored in Bigin via webhook integration.',
            mode: 'webhook',
          });
        } else {
          console.warn('[Bigin] Webhook returned non-200 code:', webhookRes.status);
        }
      } catch (webhookErr) {
        console.error('[Bigin] Webhook delivery failed:', webhookErr);
      }
    }

    // 2. Try direct Bigin REST API using OAuth token
    const accessToken = await getBiginAccessToken();
    if (accessToken) {
      const apiUrl = process.env.BIGIN_API_BASE_URL || 'https://www.zohoapis.in/bigin/v2';
      const apiRes = await fetch(`${apiUrl}/Contacts`, {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [contactPayload],
        }),
      });

      const apiData = (await apiRes.json()) as {
        data?: Array<{
          code?: string;
          status?: string;
          message?: string;
          details?: { id?: string };
        }>;
      };

      if (apiRes.ok && apiData.data?.[0]?.status === 'success') {
        const recordId = apiData.data[0].details?.id;
        return res.json({
          success: true,
          message: 'Contact successfully stored in Bigin by Zoho CRM.',
          recordId,
          mode: 'api',
        });
      } else {
        console.error('[Bigin] API response error:', apiData);
        return res.status(502).json({
          success: false,
          error: 'Bigin API returned an error',
          details: apiData,
        });
      }
    }

    // 3. Fallback when API keys are not yet provided in .env
    console.log('[Bigin Contact Stored (Mock Mode)]', {
      name,
      district,
      contactNumber,
      biMonthlyBill,
      source: source || 'NIRT Solar Website',
      timestamp: new Date().toISOString(),
    });

    return res.json({
      success: true,
      message: 'Contact recorded. Set BIGIN_CLIENT_ID, BIGIN_CLIENT_SECRET & BIGIN_REFRESH_TOKEN in .env to sync live to Bigin.',
      mode: 'mock',
    });
  } catch (error) {
    console.error('[Bigin] Unexpected submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while saving contact to Bigin.',
    });
  }
});

// Mount Vite middleware in development or serve static assets in production
if (!isProduction) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port} with Bigin integration active.`);
});
