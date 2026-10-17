# Email Notification Setup Guide

## What Was Built

Email notifications are now sent automatically when guests submit booking enquiries through either:
- The desktop hero booking form
- The mobile booking form

### Features Added
- ✅ Emails sent to `reservation@tentwo.lk` with CC to `tentwo.residence@gmail.com`
- ✅ Emails sent via Zoho SMTP (secure SSL connection)
- ✅ Professional HTML-formatted emails with all booking details
- ✅ WhatsApp clickable links if guest enters phone number
- ✅ Smart reply-to (uses guest email if valid, otherwise no reply-to)
- ✅ Spam protection with hidden honeypot field
- ✅ Server-side validation of required fields
- ✅ Submission timestamp in Sri Lanka time
- ✅ Google Sheets integration still works alongside emails
- ✅ GTM/GA4 tracking still works
- ✅ Still redirects to thank-you page after submission

## Setup Steps (For Vercel)

### Step 1: Get Zoho App Password

1. Log into Zoho Mail as `reservation@tentwo.lk`
2. Go to Settings → Security → App Passwords
3. Generate a new app password specifically for "TenTwo Website"
4. Copy the generated password (you'll need it in Step 2)

### Step 2: Add Environment Variables to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your `tentwo` project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables (one at a time):

   | Name | Value |
   |------|-------|
   | `ZOHO_USER` | `reservation@tentwo.lk` |
   | `ZOHO_APP_PASSWORD` | *paste the app password from Step 1* |
   | `ZOHO_SMTP_HOST` | `smtp.zoho.com` |

5. Make sure all three are available for **Production, Preview, and Development**
6. Click **Save** for each one

### Step 3: Deploy to Vercel

1. Push your code to GitHub (if not already done):
   ```bash
   git add .
   git commit -m "Add email notifications for booking enquiries"
   git push
   ```

2. Vercel will automatically deploy your changes
3. Wait for the deployment to complete (usually 1-2 minutes)

### Step 4: Test It

**Method 1: Test on the Live Website**

1. Go to https://tentwo.lk
2. Fill out the booking form with test data:
   - Check-in: Tomorrow's date
   - Check-out: Day after tomorrow
   - Guests: 2
   - Name: "Test Booking"
   - Email/WhatsApp: Your personal email
   - Country: Select any country
3. Click **SEND ENQUIRY**
4. You should be redirected to the thank-you page
5. Check both email addresses:
   - `reservation@tentwo.lk`
   - `tentwo.residence@gmail.com`
6. You should receive an email within 1-2 minutes

**Method 2: Test with a Phone Number**

1. Repeat the test above, but use a WhatsApp number instead of email
   - Example: `+94777889880` or `0777889880`
2. The email should include a clickable WhatsApp link

## How to Check If Email Failed

If you don't receive an email within 2-3 minutes after submitting:

### Step 1: Check Vercel Logs

1. Go to https://vercel.com/dashboard
2. Select your `tentwo` project
3. Click on **Deployments** tab
4. Click on the most recent deployment (should be "Ready")
5. Click on **Functions** tab on the left
6. Click on `/api/enquiry`
7. Look for recent logs - you'll see either:
   - ✅ Success: "Email sent successfully"
   - ❌ Error: Will show what went wrong (e.g., wrong password, SMTP issue)

### Step 2: Common Issues and Fixes

**"Authentication failed"**
- The Zoho app password is incorrect
- Go back to Step 2 and regenerate/update the password

**"Connection timeout" or "SMTP error"**
- Check that `ZOHO_SMTP_HOST` is exactly `smtp.zoho.com` (no typos)
- Zoho may be temporarily down (rare)

**"Missing required fields"**
- The form data wasn't complete - check browser console for errors

**No logs appearing at all**
- The API function may not be deployed
- Redeploy from Vercel dashboard

### Step 3: Test the API Directly

You can test the email API directly using curl:

```bash
curl -X POST https://tentwo.lk/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "contact": "test@example.com",
    "country": "Sri Lanka",
    "checkIn": "2024-07-01",
    "checkOut": "2024-07-03",
    "guests": "2",
    "nights": 2,
    "stayType": "Master Suite",
    "pricePerNight": "200",
    "estimatedTotal": "400",
    "formType": "Test"
  }'
```

You should get: `{"success":true,"message":"Enquiry received and email sent"}`

## What Happens When Someone Submits

1. **Form submitted** → JavaScript captures the data
2. **Google Sheets** → Data sent to your existing Google Sheet (unchanged)
3. **Email API** → Data sent to `/api/enquiry` serverless function
4. **Spam check** → Honeypot field checked (if filled, no email sent)
5. **Validation** → Server checks all required fields are present
6. **Email sent** → Via Zoho SMTP to reservation@tentwo.lk + CC tentwo.residence@gmail.com
7. **Redirect** → User sees thank-you page (even if email fails, they still redirect)

## Email Format

Subject: `New enquiry – [Name] – [check-in] to [check-out] – [stay type]`

Body includes:
- Guest name
- Email or WhatsApp (with clickable link if phone)
- Country
- Check-in and check-out dates (formatted nicely)
- Number of nights
- Number of guests
- Stay type (Master Suite, Two-Suite Stay, or Full Residence)
- Price per night
- Estimated total (in USD)
- Which form was used (Desktop or Mobile)
- Submission time in Sri Lanka timezone

## Files Changed

- `package.json` - Added nodemailer dependency
- `api/enquiry.js` - New serverless function for sending emails
- `index.html` - Updated both forms to send email + added honeypot fields
- `.env.example` - Template for environment variables

## Security Notes

- ✅ No credentials in code (all in Vercel environment variables)
- ✅ Honeypot spam protection on both forms
- ✅ Server-side validation of all inputs
- ✅ SSL/TLS encrypted email sending (port 465)
- ✅ Reply-to only set if valid email format

## Support

If emails still aren't working after trying the above:
1. Check Vercel function logs (most detailed info)
2. Check browser console for JavaScript errors
3. Verify environment variables are set correctly in Vercel
4. Test with the curl command to isolate the issue
