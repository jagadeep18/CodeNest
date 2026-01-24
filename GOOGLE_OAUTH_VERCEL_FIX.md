# Google OAuth Origin Mismatch Fix - Vercel Deployment

## Error
```
Access blocked: Authorization error
Error 400: origin_mismatch

You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy.
If you're the app developer, register the JavaScript origin in the Google Cloud Console.
```

## Root Cause
Your Vercel deployment URL (`https://dev-hub-delta-lyart.vercel.app`) is **NOT registered** in Google Cloud Console as an authorized JavaScript origin for your OAuth Client ID.

Google OAuth only allows login from pre-registered domains for security reasons.

---

## Solution: Add Vercel URL to Google Cloud Console

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/apis/credentials
2. Sign in with your Google account (gorantla.jagadeep@gmail.com)

### Step 2: Select Your Project
1. Click the project dropdown at the top
2. Select the project that contains your OAuth Client ID
   - Look for the project with Client ID: `656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6`

### Step 3: Find Your OAuth 2.0 Client ID
1. In the "Credentials" page, look under **"OAuth 2.0 Client IDs"**
2. Click on your Client ID (it should show the ID starting with `656840032038...`)

### Step 4: Add Authorized JavaScript Origins
In the OAuth client configuration:

1. Scroll to **"Authorized JavaScript origins"** section
2. Click **"+ ADD URI"**
3. Add the following URLs (one at a time):

```
https://dev-hub-delta-lyart.vercel.app
```

**If you have multiple Vercel deployments, also add:**
```
https://dev-hub-delta-lyart.vercel.app
https://*.vercel.app
```

**Current authorized origins should include:**
- `http://localhost:5173` (for local development)
- `http://localhost:3000` (for local development)
- `https://dev-hub-delta-lyart.vercel.app` (for production) ← **ADD THIS**

### Step 5: Add Authorized Redirect URIs (Optional but Recommended)
1. Scroll to **"Authorized redirect URIs"** section
2. Click **"+ ADD URI"**
3. Add:
```
https://dev-hub-delta-lyart.vercel.app
https://dev-hub-delta-lyart.vercel.app/
```

### Step 6: Save Changes
1. Click **"SAVE"** at the bottom of the page
2. Wait 5-10 minutes for changes to propagate through Google's servers

---

## Visual Guide

### What You Should See:

**Authorized JavaScript origins:**
```
✅ http://localhost:5173
✅ http://localhost:3000
✅ https://dev-hub-delta-lyart.vercel.app  ← ADD THIS
```

**Authorized redirect URIs:**
```
✅ https://dev-hub-delta-lyart.vercel.app
✅ https://dev-hub-delta-lyart.vercel.app/
```

---

## After Adding the URLs

### 1. Wait for Propagation
- Google's OAuth changes can take **5-10 minutes** to propagate
- Be patient and don't test immediately

### 2. Clear Browser Cache
```
1. Open your browser
2. Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
3. Select "Cookies and other site data"
4. Select "Cached images and files"
5. Click "Clear data"
```

### 3. Test Again
1. Visit: https://dev-hub-delta-lyart.vercel.app
2. Try to log in with Google
3. It should now work! ✅

---

## Common Issues

### Issue 1: Still Getting Error After 10 Minutes
**Solution:**
- Double-check the URL is **exactly** correct (no typos)
- Ensure you saved the changes in Google Cloud Console
- Try in an incognito/private browser window

### Issue 2: Multiple Vercel Deployments
If you have preview deployments (like `dev-hub-delta-lyart-git-main-username.vercel.app`):

**Option A:** Add each preview URL individually
**Option B:** Use wildcard (may not work for all cases):
```
https://*.vercel.app
```

### Issue 3: Wrong Project Selected
Make sure you're editing the OAuth client in the **correct Google Cloud project**:
- Check the Client ID matches: `656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6`

---

## Quick Checklist

Before testing:
- [ ] Logged into Google Cloud Console
- [ ] Selected correct project
- [ ] Found OAuth 2.0 Client ID
- [ ] Added `https://dev-hub-delta-lyart.vercel.app` to Authorized JavaScript origins
- [ ] Clicked "SAVE"
- [ ] Waited 5-10 minutes
- [ ] Cleared browser cache
- [ ] Tested in incognito mode

---

## Alternative: Create New OAuth Client for Production

If you want separate credentials for development and production:

### 1. Create New OAuth Client ID
1. In Google Cloud Console → Credentials
2. Click "+ CREATE CREDENTIALS" → "OAuth client ID"
3. Application type: "Web application"
4. Name: "Dev-Hub Production"
5. Authorized JavaScript origins:
   - `https://dev-hub-delta-lyart.vercel.app`
6. Click "CREATE"

### 2. Update Vercel Environment Variables
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Update `VITE_GOOGLE_CLIENT_ID` with the new Client ID
5. Redeploy

### 3. Update Backend
1. Update `GOOGLE_CLIENT_ID` in Render environment variables
2. Redeploy backend

**Note:** This approach is more complex and requires backend changes, so **Option 1 (adding the URL) is recommended**.

---

## Summary

**The Fix (No Code Changes Needed):**
1. ✅ Go to Google Cloud Console
2. ✅ Add `https://dev-hub-delta-lyart.vercel.app` to Authorized JavaScript origins
3. ✅ Save and wait 5-10 minutes
4. ✅ Clear browser cache and test

**No backend changes required!** This is purely a Google OAuth configuration issue.

---

## Direct Link

**Go directly to Google Cloud Console Credentials:**
https://console.cloud.google.com/apis/credentials

**Then:**
1. Click your OAuth 2.0 Client ID
2. Add the Vercel URL to "Authorized JavaScript origins"
3. Save
4. Wait and test

Good luck! 🚀
