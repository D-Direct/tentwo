const nodemailer = require('nodemailer');

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if contact looks like a phone number
function isPhoneNumber(contact) {
  // Remove common separators and check if mostly digits
  const cleaned = contact.replace(/[\s\-\(\)\.]/g, '');
  return /^\+?\d{8,}$/.test(cleaned);
}

// Format phone for WhatsApp link
function formatWhatsAppNumber(phone) {
  // Remove all non-digit characters except leading +
  let cleaned = phone.replace(/[^\d+]/g, '');
  // Remove + from start for wa.me link
  cleaned = cleaned.replace(/^\+/, '');
  return cleaned;
}

// Format date for display
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Get Sri Lanka time
function getSriLankaTime() {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Colombo',
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

// Generate email HTML
function generateEmailHTML(data) {
  const isPhone = isPhoneNumber(data.contact);
  const contactLabel = isPhone ? 'WhatsApp' : 'Email';
  let contactValue = data.contact;

  if (isPhone) {
    const waNumber = formatWhatsAppNumber(data.contact);
    contactValue = `<a href="https://wa.me/${waNumber}" style="color: #0066cc; text-decoration: none;">${data.contact}</a>`;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    h2 { color: #0a192d; border-bottom: 2px solid #0066cc; padding-bottom: 10px; }
    .info-row { margin: 12px 0; display: flex; }
    .label { font-weight: bold; min-width: 150px; color: #555; }
    .value { color: #222; }
    .highlight { background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Booking Enquiry</h2>

    <div class="info-row">
      <div class="label">Name:</div>
      <div class="value">${data.name}</div>
    </div>

    <div class="info-row">
      <div class="label">${contactLabel}:</div>
      <div class="value">${contactValue}</div>
    </div>

    <div class="info-row">
      <div class="label">Country:</div>
      <div class="value">${data.country}</div>
    </div>

    <div class="highlight">
      <div class="info-row">
        <div class="label">Check-in:</div>
        <div class="value">${formatDate(data.checkIn)}</div>
      </div>

      <div class="info-row">
        <div class="label">Check-out:</div>
        <div class="value">${formatDate(data.checkOut)}</div>
      </div>

      <div class="info-row">
        <div class="label">Nights:</div>
        <div class="value">${data.nights}</div>
      </div>

      <div class="info-row">
        <div class="label">Guests:</div>
        <div class="value">${data.guests}</div>
      </div>
    </div>

    <div class="info-row">
      <div class="label">Stay Type:</div>
      <div class="value">${data.stayType}</div>
    </div>

    <div class="info-row">
      <div class="label">Price per Night:</div>
      <div class="value">USD $${data.pricePerNight}</div>
    </div>

    <div class="info-row">
      <div class="label">Estimated Total:</div>
      <div class="value"><strong>USD $${data.estimatedTotal}</strong></div>
    </div>

    <div class="footer">
      <div>Form used: ${data.formType}</div>
      <div>Submitted: ${data.submittedAt}</div>
    </div>
  </div>
</body>
</html>
  `;
}

module.exports = async (req, res) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Check honeypot field (spam protection)
    if (data.website) {
      // Honeypot filled - likely spam, return success but don't send email
      return res.status(200).json({ success: true, message: 'Enquiry received' });
    }

    // Validate required fields
    if (!data.name || !data.contact || !data.country || !data.checkIn || !data.checkOut || !data.guests) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please fill in all required fields: name, contact, country, dates, and guests'
      });
    }

    // Prepare email configuration
    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_APP_PASSWORD
      }
    });

    // Determine reply-to (only use if valid email)
    const replyTo = isValidEmail(data.contact) ? data.contact : undefined;

    // Prepare email subject
    const subject = `New enquiry – ${data.name} – ${formatDate(data.checkIn)} to ${formatDate(data.checkOut)} – ${data.stayType}`;

    // Add submission timestamp in Sri Lanka time
    const enrichedData = {
      ...data,
      submittedAt: getSriLankaTime()
    };

    // Send email
    const mailOptions = {
      from: '"TenTwo Website" <reservation@tentwo.lk>',
      to: 'reservation@tentwo.lk',
      cc: 'tentwo.residence@gmail.com',
      replyTo: replyTo,
      subject: subject,
      html: generateEmailHTML(enrichedData)
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Enquiry received and email sent'
    });

  } catch (error) {
    console.error('Error processing enquiry:', error);
    return res.status(500).json({
      error: 'Failed to process enquiry',
      message: error.message
    });
  }
};
