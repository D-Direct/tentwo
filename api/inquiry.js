// api/inquiry.js
// Vercel Serverless Function
// Handles the "Check Availability" form:
//   1. Sends an email via Resend to both reservation addresses
//   2. Logs the same submission to a Google Sheet via a Google Apps Script webhook
//
// Required Environment Variables (set these in Vercel Project Settings > Environment Variables):
//   RESEND_API_KEY        -> your Resend API key
//   GOOGLE_SCRIPT_URL      -> the Google Apps Script Web App URL (see google-apps-script/Code.gs)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { arrival, departure, guests, email } = req.body || {};

  // Basic validation
  if (!arrival || !departure || !guests || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const submittedAt = new Date().toISOString();

  // ---------- 1. Send email via Resend ----------
  let emailSent = false;
  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // NOTE: "from" must be an address on a domain you have verified in Resend.
        // Using a subdomain like "inquiries@tentwo.lk" is recommended once tentwo.lk
        // is verified in your Resend dashboard. Until then, Resend's default
        // "onboarding@resend.dev" sender can be used for testing.
        from: 'TenTwo Website <inquiries@tentwo.lk>',
        to: ['tentwo.residence@gmail.com', 'reservation@tentwo.lk'],
        reply_to: email,
        subject: `New Availability Inquiry — ${arrival} to ${departure}`,
        html: `
          <h2>New Availability Inquiry</h2>
          <p><strong>Arrival:</strong> ${arrival}</p>
          <p><strong>Departure:</strong> ${departure}</p>
          <p><strong>Guests:</strong> ${guests}</p>
          <p><strong>Guest Email:</strong> ${email}</p>
          <p><strong>Submitted At:</strong> ${submittedAt}</p>
        `,
      }),
    });

    emailSent = emailResponse.ok;
    if (!emailResponse.ok) {
      const errText = await emailResponse.text();
      console.error('Resend error:', errText);
    }
  } catch (err) {
    console.error('Error sending email via Resend:', err);
  }

  // ---------- 2. Log to Google Sheet ----------
  let loggedToSheet = false;
  try {
    if (process.env.GOOGLE_SCRIPT_URL) {
      const sheetResponse = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ arrival, departure, guests, email, submittedAt }),
      });
      loggedToSheet = sheetResponse.ok;
      if (!sheetResponse.ok) {
        const errText = await sheetResponse.text();
        console.error('Google Sheet logging error:', errText);
      }
    }
  } catch (err) {
    console.error('Error logging to Google Sheet:', err);
  }

  // We still return success to the visitor even if one channel fails,
  // as long as at least the email or the log succeeded — but we log
  // failures server-side (visible in Vercel's function logs) so you can
  // investigate issues without the guest seeing an error.
  if (!emailSent && !loggedToSheet) {
    return res.status(502).json({ error: 'Failed to process inquiry' });
  }

  return res.status(200).json({ success: true, emailSent, loggedToSheet });
}
