# 🔐 Google OAuth Configuration Fix

## 🚨 Error: origin_mismatch

**Error Message:**
```
Access blocked: Authorization error
Error 400: origin_mismatch
You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy.
```

**Cause:** Your Vercel domain (`https://dev-hub-delta-lyart.vercel.app`) is not registered as an authorized JavaScript origin in Google Cloud Console.

---

## ✅ Solution: Add Vercel Domain to Google Cloud Console

### Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account: `gorantla.jagadeep@gmail.com`

### Step 2: Select Your Project

1. Click on the project dropdown at the top
2. Select the project that contains your OAuth credentials
   - Look for the project associated with Client ID: `208639535162-eqmptcuar53i9oh39uqmhs35vlkobhe0.apps.googleusercontent.com`

### Step 3: Navigate to OAuth Consent Screen

1. In the left sidebar, click **APIs & Services**
2. Click **Credentials**

### Step 4: Edit OAuth 2.0 Client ID

1. Find your OAuth 2.0 Client ID in the list
   - Client ID: `656840032038-e570hfn9l5dm8cl4lakbpf60ig4t6h5a.apps.googleusercontent.com`
2. Click on the **pencil icon (Edit)** next to it

### Step 5: Add Authorized JavaScript Origins

In the **Authorized JavaScript origins** section, add these URIs:

```
http://localhost:5173
http://localhost:3000
https://dev-hub-delta-lyart.vercel.app
```

**Important Notes:**
- ✅ Use `https://` for Vercel (production)
- ✅ Use `http://` for localhost (development)
- ✅ Do NOT include trailing slashes
- ✅ Do NOT include paths (like `/callback`)

### Step 6: Add Authorized Redirect URIs

In the **Authorized redirect URIs** section, add these URIs:

```
http://localhost:5173
http://localhost:3000
https://dev-hub-delta-lyart.vercel.app
```

### Step 7: Save Changes

1. Click **SAVE** at the bottom
2. Wait a few minutes for changes to propagate (usually instant, but can take up to 5 minutes)

---

## 🎯 Quick Reference

### Current Configuration Needed:

**Your Google Client ID:**
```
656840032038-e570hfn9l5dm8cl4lakbpf60ig4t6h5a.apps.googleusercontent.com
```

**Authorized JavaScript Origins:**
```
http://localhost:5173
http://localhost:3000
https://dev-hub-delta-lyart.vercel.app
```

**Authorized Redirect URIs:**
```
http://localhost:5173
http://localhost:3000
https://dev-hub-delta-lyart.vercel.app
```

---

## 📸 Visual Guide

### What the Google Cloud Console Should Look Like:

```
┌─────────────────────────────────────────────────────────────┐
│ Edit OAuth 2.0 Client ID                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Name: Web client 1                                          │
│                                                              │
│ Authorized JavaScript origins                               │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ http://localhost:5173                               │    │
│ │ http://localhost:3000                               │    │
│ │ https://dev-hub-delta-lyart.vercel.app              │    │
│ └─────────────────────────────────────────────────────┘    │
│ + ADD URI                                                   │
│                                                              │
│ Authorized redirect URIs                                    │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ http://localhost:5173                               │    │
│ │ http://localhost:3000                               │    │
│ │ https://dev-hub-delta-lyart.vercel.app              │    │
│ └─────────────────────────────────────────────────────┘    │
│ + ADD URI                                                   │
│                                                              │
│                                    [CANCEL]  [SAVE]         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing After Configuration

### Test on Vercel (Production)
1. Go to: https://dev-hub-delta-lyart.vercel.app/
2. Click **Sign in with Google**
3. Should work without errors ✅

### Test on Localhost (Development)
1. Run your dev server: `npm run dev`
2. Go to: http://localhost:5173
3. Click **Sign in with Google**
4. Should work without errors ✅

---

## 🔍 Troubleshooting

### Still Getting origin_mismatch Error?

1. **Check the exact URL in the error message**
   - Make sure it matches what you added in Google Cloud Console
   - Check for typos in the domain name

2. **Wait a few minutes**
   - Google OAuth changes can take up to 5 minutes to propagate

3. **Clear browser cache**
   - Press `Ctrl + Shift + Delete`
   - Clear cookies and cached data
   - Try again in an incognito window

4. **Verify the Client ID**
   - Make sure you're editing the correct OAuth client
   - The Client ID should match: `656840032038-e570hfn9l5dm8cl4lakbpf60ig4t6h5a.apps.googleusercontent.com`

5. **Check for multiple domains**
   - If you have multiple Vercel deployments, add all of them
   - Example: `https://dev-hub-delta-lyart-git-main.vercel.app`

### Common Mistakes to Avoid

❌ **Wrong:**
```
https://dev-hub-delta-lyart.vercel.app/
https://dev-hub-delta-lyart.vercel.app/auth/callback
http://dev-hub-delta-lyart.vercel.app  (should be https)
```

✅ **Correct:**
```
https://dev-hub-delta-lyart.vercel.app
http://localhost:5173
http://localhost:3000
```

---

## 📋 Step-by-Step Checklist

- [ ] Go to Google Cloud Console
- [ ] Navigate to APIs & Services → Credentials
- [ ] Find and edit your OAuth 2.0 Client ID
- [ ] Add `https://dev-hub-delta-lyart.vercel.app` to Authorized JavaScript origins
- [ ] Add `https://dev-hub-delta-lyart.vercel.app` to Authorized redirect URIs
- [ ] Add localhost URLs for development
- [ ] Click SAVE
- [ ] Wait 2-5 minutes for changes to propagate
- [ ] Clear browser cache
- [ ] Test Google Sign-In on Vercel
- [ ] Test Google Sign-In on localhost

---

## 🔗 Important Links

- **Google Cloud Console**: https://console.cloud.google.com/
- **OAuth Credentials**: https://console.cloud.google.com/apis/credentials
- **Your Frontend**: https://dev-hub-delta-lyart.vercel.app/
- **Google OAuth Documentation**: https://developers.google.com/identity/protocols/oauth2

---

## 🎉 Expected Result

After completing these steps:
- ✅ Backend connection working (CORS fixed)
- ✅ Google Sign-In working on Vercel
- ✅ Google Sign-In working on localhost
- ✅ No more `origin_mismatch` errors

---

## 💡 Pro Tip: Wildcard Domains

If you want to allow all Vercel preview deployments, you can add:
```
https://*.vercel.app
```

However, this is less secure. It's better to explicitly list your domains.

---

## 🆘 Need More Help?

If you're still having issues:

1. **Check the exact error message** in the browser console
2. **Verify the redirect URL** that Google is trying to use
3. **Make sure you're editing the correct OAuth client**
4. **Try in an incognito window** to rule out caching issues

The most common issue is simply waiting for Google's changes to propagate. Give it 5 minutes and try again!
