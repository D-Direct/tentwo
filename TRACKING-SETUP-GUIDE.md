# TenTwo Tracking Setup Guide

This guide explains how to complete the tracking implementation for the TenTwo website.

---

## 📋 Overview

The website has been prepared with:
- ✅ Google Tag Manager (GTM) container code
- ✅ Event tracking data layers for key user actions
- ✅ Cookie consent banner (GDPR compliant)
- ✅ Privacy Policy page

**What you need to do:**
1. Create a Google Tag Manager account
2. Configure GA4 and Meta Pixel through GTM
3. Set up UTM campaign tracking

---

## 🔧 Step 1: Google Tag Manager Setup

### 1.1 Create GTM Account
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click **"Create Account"**
3. Enter:
   - **Account Name:** TenTwo
   - **Country:** Sri Lanka
   - **Container Name:** tentwo.lk
   - **Target Platform:** Web
4. Click **"Create"** and accept the Terms of Service

### 1.2 Get Your GTM Container ID
1. After creating the account, you'll see your **Container ID** (format: `GTM-XXXXXXX`)
2. **IMPORTANT:** Replace `GTM-XXXXXXX` in the following files:
   - In `index.html` line 48 (in the `<head>` section)
   - In `index.html` line 2175 (in the `<body>` section - noscript)

**Find and replace:**
```html
<!-- Line 48 -->
})(window,document,'script','dataLayer','GTM-XXXXXXX');

<!-- Line 2175 -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
```

Replace both instances of `GTM-XXXXXXX` with your actual Container ID.

---

## 📊 Step 2: Google Analytics 4 (GA4) Setup

### 2.1 Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (bottom left)
3. Click **"Create Property"**
4. Enter:
   - **Property Name:** TenTwo
   - **Reporting Time Zone:** Sri Lanka
   - **Currency:** USD
5. Fill in business details and click **"Create"**
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2.2 Add GA4 Tag in GTM
1. Go back to **Google Tag Manager**
2. Click **"Tags"** → **"New"**
3. Click **Tag Configuration** → **Google Analytics: GA4 Configuration**
4. Enter your **Measurement ID** (`G-XXXXXXXXXX`)
5. Under **Triggering**, select **"All Pages"**
6. Name the tag: **"GA4 - Configuration"**
7. Click **"Save"**

### 2.3 Create GA4 Event Tags

Create these event tags to track user actions:

#### Event 1: Availability Form Submit
- **Tag Type:** GA4 Event
- **Configuration Tag:** Select your GA4 Configuration tag
- **Event Name:** `availability_form_submit`
- **Event Parameters:**
  - `form_type`: `{{DLV - form_type}}`
  - `configuration`: `{{DLV - configuration}}`
  - `guests`: `{{DLV - guests}}`
  - `country`: `{{DLV - country}}`
- **Trigger:** Custom Event = `availability_form_submit`

#### Event 2: Check Availability Click
- **Tag Type:** GA4 Event
- **Configuration Tag:** Select your GA4 Configuration tag
- **Event Name:** `check_availability_click`
- **Event Parameters:**
  - `tier_type`: `{{DLV - tier_type}}`
  - `max_guests`: `{{DLV - max_guests}}`
- **Trigger:** Custom Event = `check_availability_click`

#### Event 3: WhatsApp Click
- **Tag Type:** GA4 Event
- **Configuration Tag:** Select your GA4 Configuration tag
- **Event Name:** `whatsapp_click`
- **Event Parameters:**
  - `link_location`: `{{DLV - link_location}}`
- **Trigger:** Custom Event = `whatsapp_click`

#### Event 4: Email Click
- **Tag Type:** GA4 Event
- **Configuration Tag:** Select your GA4 Configuration tag
- **Event Name:** `email_click`
- **Event Parameters:**
  - `link_location`: `{{DLV - link_location}}`
- **Trigger:** Custom Event = `email_click`

#### Event 5: Cookie Consent
- **Tag Type:** GA4 Event
- **Configuration Tag:** Select your GA4 Configuration tag
- **Event Name:** `cookie_consent`
- **Event Parameters:**
  - `consent_type`: `{{DLV - consent_type}}`
- **Trigger:** Custom Event = `cookie_consent`

### 2.4 Create Data Layer Variables
For each event parameter above, create a Data Layer Variable:
1. Click **Variables** → **User-Defined Variables** → **New**
2. Choose **Data Layer Variable**
3. Enter the variable name (e.g., `form_type`)
4. Name it: `DLV - form_type`
5. Repeat for all parameters

---

## 📱 Step 3: Meta Pixel (Facebook/Instagram) Setup

### 3.1 Create Meta Pixel
1. Go to [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Click **"Connect Data Sources"** → **"Web"** → **"Meta Pixel"**
3. Name your pixel: **"TenTwo"**
4. Enter website URL: `https://tentwo.lk`
5. Copy your **Pixel ID** (format: numbers only, e.g., `123456789012345`)

### 3.2 Add Meta Pixel Tag in GTM

#### Base Pixel Tag
1. In GTM, click **"Tags"** → **"New"**
2. Click **Tag Configuration** → **Custom HTML**
3. Paste this code (replace `YOUR_PIXEL_ID`):

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

4. **Trigger:** All Pages
5. **Name:** Meta Pixel - Base Code
6. **Advanced Settings** → **Tag firing options:** Select "Once per page"

#### Meta Pixel Events
Create these event tags:

**Form Submit Event:**
- **Tag Type:** Custom HTML
- **Code:**
```html
<script>
  fbq('track', 'Contact', {
    content_category: 'availability_inquiry'
  });
</script>
```
- **Trigger:** Custom Event = `availability_form_submit`

**Check Availability Event:**
- **Tag Type:** Custom HTML
- **Code:**
```html
<script>
  fbq('track', 'ViewContent', {
    content_type: 'tier_selection'
  });
</script>
```
- **Trigger:** Custom Event = `check_availability_click`

---

## 🎯 Step 4: UTM Campaign Tracking

### 4.1 Understanding UTM Parameters
Use these parameters in your marketing links:

- `utm_source`: Where the traffic comes from (e.g., instagram, facebook, google)
- `utm_medium`: Marketing medium (e.g., social, email, cpc)
- `utm_campaign`: Campaign name (e.g., sg_launch, dec_promo)
- `utm_content`: Ad variation (optional)

### 4.2 Example Campaign Links

**Instagram Post:**
```
https://tentwo.lk/?utm_source=instagram&utm_medium=social&utm_campaign=sg_launch
```

**Facebook Ad:**
```
https://tentwo.lk/?utm_source=facebook&utm_medium=cpc&utm_campaign=sg_launch&utm_content=video_ad
```

**Email Newsletter:**
```
https://tentwo.lk/?utm_source=newsletter&utm_medium=email&utm_campaign=dec_promo
```

**Instagram Story:**
```
https://tentwo.lk/?utm_source=instagram&utm_medium=story&utm_campaign=jun_offer
```

### 4.3 Create UTM Links
Use [Google's Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/)

---

## 🔒 Step 5: Cookie Consent Configuration

### 5.1 Configure Consent Mode in GTM

1. Go to **Admin** → **Container Settings** → **Enable Consent Overview**
2. For each tag (GA4 and Meta Pixel):
   - Click the tag
   - Go to **Advanced Settings** → **Consent Settings**
   - Add consent requirements:
     - **Analytics Storage:** Required (for GA4)
     - **Ad Storage:** Required (for Meta Pixel)

### 5.2 Test Cookie Consent
1. Clear your browser cache and cookies
2. Visit your website
3. You should see the cookie consent banner after 1 second
4. Click **"Decline"** - tracking should not fire
5. Refresh and click **"Accept"** - tracking should fire

---

## ✅ Step 6: Testing & Publishing

### 6.1 Test in GTM Preview Mode
1. In GTM, click **"Preview"**
2. Enter your website URL
3. GTM will connect to your site in debug mode
4. Test each interaction:
   - Click on a tier card → Check `check_availability_click` event
   - Fill and submit the form → Check `availability_form_submit` event
   - Click WhatsApp link → Check `whatsapp_click` event
   - Click Email link → Check `email_click` event

### 6.2 Verify Events in GA4
1. Go to Google Analytics → **Reports** → **Realtime**
2. Perform actions on your website
3. Verify events appear in real-time

### 6.3 Verify Meta Pixel
1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) Chrome extension
2. Visit your website
3. Click the extension icon - it should show your pixel is active
4. Test events by clicking tier cards and submitting the form

### 6.4 Publish GTM Container
1. Click **"Submit"** (top right in GTM)
2. Add a **Version Name**: "Initial tracking setup with GA4 and Meta Pixel"
3. Add a **Description**: "Added GA4, Meta Pixel, event tracking, and cookie consent"
4. Click **"Publish"**

---

## 📈 Step 7: Monitoring & Insights

### 7.1 Key Metrics to Track
- **Form submissions** (most important!)
- **WhatsApp clicks**
- **Email clicks**
- **Check Availability clicks** per tier
- **Traffic by country** (from form data)
- **Traffic source** (from UTM parameters)

### 7.2 Set Up GA4 Conversions
1. Go to GA4 → **Admin** → **Events**
2. Mark `availability_form_submit` as a **Conversion**
3. This will track it as a key goal

### 7.3 Create GA4 Reports
Create custom reports to see:
- Which countries generate most inquiries
- Which tier configurations are most popular
- Which marketing channels drive most conversions

---

## 🚀 Quick Reference: Events Tracked

| Event Name | When It Fires | Data Collected |
|------------|---------------|----------------|
| `availability_form_submit` | Form submitted | Configuration, guests, country |
| `check_availability_click` | Tier card clicked | Tier type, max guests |
| `whatsapp_click` | WhatsApp link clicked | Link location |
| `email_click` | Email link clicked | Link location |
| `cookie_consent` | Cookie banner interaction | Accepted/rejected |

---

## 📞 Need Help?

If you encounter issues during setup:
1. Check GTM Preview mode for errors
2. Verify your Pixel ID and Measurement ID are correct
3. Ensure the GTM container is published
4. Check browser console for JavaScript errors

---

## 📝 Checklist

- [ ] Created GTM account and got Container ID
- [ ] Replaced GTM-XXXXXXX in index.html (2 places)
- [ ] Created GA4 property and got Measurement ID
- [ ] Added GA4 Configuration tag in GTM
- [ ] Created all 5 GA4 event tags
- [ ] Created Data Layer Variables
- [ ] Created Meta Pixel and got Pixel ID
- [ ] Added Meta Pixel base code in GTM
- [ ] Added Meta Pixel event tags
- [ ] Tested all events in Preview mode
- [ ] Verified events in GA4 Realtime
- [ ] Verified Meta Pixel with Pixel Helper
- [ ] Published GTM container
- [ ] Set up UTM parameters for campaigns
- [ ] Marked form submission as conversion in GA4

---

**Last Updated:** 2024
**Website:** https://tentwo.lk
**Support:** reservation@tentwo.lk
