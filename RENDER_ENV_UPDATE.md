# 🔧 URGENT: Update Render Environment Variable

## 🚨 Critical Issue Found

Your backend on Render is using the **OLD Google Client ID**, but your frontend is using the **NEW Client ID**. This mismatch is causing the "Google login failed" error.

---

## ✅ Solution: Update Render Environment Variable

### Step 1: Go to Render Dashboard

1. Visit: https://dashboard.render.com/
2. Sign in to your account

### Step 2: Select Your Backend Service

1. Click on your service: **dev-hub-backend-latest**
2. Go to the **Environment** tab (left sidebar)

### Step 3: Update GOOGLE_CLIENT_ID

1. Find the environment variable: `GOOGLE_CLIENT_ID`
2. Click **Edit** (pencil icon)
3. **Change the value from:**
   ```
   208639535162-eqmptcuar53i9oh39uqmhs35vlkobhe0.apps.googleusercontent.com
   ```
   **To:**
   ```
   656840032038-e570hfn9l5dm8cl4lakbpf60ig4t6h5a.apps.googleusercontent.com
   ```
4. Click **Save Changes**

### Step 4: Redeploy (Automatic)

- Render will automatically redeploy your service when you update environment variables
- Wait for the deployment to complete (usually 2-3 minutes)
- Check the **Logs** tab to ensure the service starts successfully

---

## 📋 Quick Checklist

- [ ] Go to Render Dashboard
- [ ] Select **dev-hub-backend-latest** service
- [ ] Click **Environment** tab
- [ ] Update `GOOGLE_CLIENT_ID` to: `656840032038-e570hfn9l5dm8cl4lakbpf60ig4t6h5a.apps.googleusercontent.com`
- [ ] Save changes
- [ ] Wait for automatic redeployment (2-3 minutes)
- [ ] Test Google login on Vercel: https://dev-hub-delta-lyart.vercel.app/

---

## 🎯 What Was Fixed Locally

I've already updated your local `.env` file with the correct Client ID:

**File:** `server/.env`
```env
GOOGLE_CLIENT_ID=656840032038-e570hfn9l5dm8cl4lakbpf60ig4t6h5a.apps.googleusercontent.com
```

---

## 🔍 Why This Happened

**The Problem:**
- **Frontend** (Vercel) is using Client ID: `656840032038-...`
- **Backend** (Render) was using Client ID: `208639535162-...`
- When Google sends a token from the frontend, the backend tries to verify it with the wrong Client ID
- Verification fails → "Google login failed"

**The Fix:**
- Both frontend and backend must use the **SAME** Google Client ID
- Now both are using: `656840032038-e570hfn9l5dm8cl4lakbpf60ig4t6h5a.apps.googleusercontent.com`

---

## 🧪 Testing After Fix

Once Render finishes redeploying:

1. **Clear browser cache** (or use incognito mode)
2. Go to: https://dev-hub-delta-lyart.vercel.app/
3. Click **Sign in with Google**
4. Select your Google account
5. Should successfully log in! ✅

---

## 📸 Visual Guide for Render

```
┌─────────────────────────────────────────────────────────────┐
│ Render Dashboard → dev-hub-backend-latest                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌─ Navigation ────────────────────────────────────────┐    │
│ │ • Overview                                          │    │
│ │ • Events                                            │    │
│ │ • Logs                                              │    │
│ │ ► Environment  ← Click here                         │    │
│ │ • Settings                                          │    │
│ └─────────────────────────────────────────────────────┘    │
│                                                              │
│ Environment Variables                                       │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ Key: GOOGLE_CLIENT_ID                               │    │
│ │ Value: 656840032038-e570hfn9l5dm8cl4lakbpf60...     │ ✏️ │
│ └─────────────────────────────────────────────────────┘    │
│                                                              │
│                                    [Save Changes]           │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚠️ Important Notes

1. **Don't delete the variable** - just edit it
2. **Copy the entire Client ID** - don't miss any characters
3. **Wait for redeployment** - Render will automatically redeploy
4. **Check logs** - Make sure the service starts without errors

---

## 🔗 Important Links

- **Render Dashboard**: https://dashboard.render.com/
- **Your Backend**: https://dev-hub-backend-latest.onrender.com
- **Your Frontend**: https://dev-hub-delta-lyart.vercel.app/
- **Google Cloud Console**: https://console.cloud.google.com/apis/credentials

---

## 🆘 Still Having Issues?

If Google login still fails after updating Render:

1. **Check Render Logs**:
   - Go to Render Dashboard → Your Service → Logs
   - Look for any errors related to Google authentication

2. **Verify the Client ID**:
   - Make sure you copied the entire Client ID correctly
   - No extra spaces or missing characters

3. **Check Google Cloud Console**:
   - Verify that `https://dev-hub-delta-lyart.vercel.app` is in Authorized JavaScript origins
   - Verify that `https://dev-hub-backend-latest.onrender.com` is NOT needed (only frontend origins)

4. **Test the API directly**:
   - Use Postman or curl to test the `/api/auth/google-login` endpoint
   - Check the response for specific error messages

---

## ✅ Expected Result

After updating Render and waiting for redeployment:
- ✅ Google OAuth popup opens
- ✅ You can select your Google account
- ✅ Backend successfully verifies the token
- ✅ You're logged in and redirected to the app
- ✅ No more "Google login failed" errors

This is the final piece! Once you update the Render environment variable, everything should work perfectly! 🎉
