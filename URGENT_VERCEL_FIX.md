# URGENT FIX: Google Login Failed on Vercel

## Problem
"Google login failed. Please try again." error on Vercel deployment.

## Root Causes (Multiple Issues to Fix)

### Issue 1: Vercel Environment Variables Not Set
**Vercel does NOT automatically read `.env` files from your repository!**

You must set environment variables in Vercel Dashboard.

### Issue 2: Google Cloud Console Authorization
Your Vercel URL must be added to Google OAuth allowed origins.

---

## SOLUTION 1: Set Vercel Environment Variables (CRITICAL!)

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on your project: **dev-hub**

### Step 2: Go to Settings
1. Click **"Settings"** tab
2. Click **"Environment Variables"** in the left sidebar

### Step 3: Add These Variables
Click **"Add New"** for each variable:

**Variable 1:**
```
Name: VITE_API_URL
Value: https://dev-hub-backend-latest.onrender.com
Environment: Production, Preview, Development (select all)
```

**Variable 2:**
```
Name: VITE_BACKEND_URL
Value: https://dev-hub-backend-latest.onrender.com
Environment: Production, Preview, Development (select all)
```

**Variable 3:**
```
Name: VITE_GOOGLE_CLIENT_ID
Value: 656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com
Environment: Production, Preview, Development (select all)
```

### Step 4: Redeploy
After adding all variables:
1. Go to **"Deployments"** tab
2. Click the **three dots (...)** on the latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"** (optional, faster)
5. Click **"Redeploy"**

---

## SOLUTION 2: Add Vercel URL to Google Cloud Console

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/apis/credentials

### Step 2: Edit OAuth Client
1. Find Client ID: `656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6`
2. Click on it to edit

### Step 3: Add Authorized JavaScript Origins
Add these URLs (click "+ ADD URI" for each):

```
https://dev-hub-delta-lyart.vercel.app
```

If you have preview deployments, also add:
```
https://dev-hub-delta-lyart-git-main-jagadeep18.vercel.app
```

Or use wildcard (may not work):
```
https://*.vercel.app
```

### Step 4: Save
1. Click **"SAVE"** at the bottom
2. Wait **5-10 minutes** for propagation

---

## SOLUTION 3: Check Google Login Component

The error might also be from the frontend trying to connect to the wrong backend URL.

### Verify in Browser Console
1. Open your Vercel site: https://dev-hub-delta-lyart.vercel.app
2. Press **F12** to open Developer Tools
3. Go to **"Console"** tab
4. Try to log in with Google
5. Look for error messages

**Common errors:**
- `VITE_GOOGLE_CLIENT_ID is undefined` → Environment variables not set in Vercel
- `Failed to fetch` → Backend URL is wrong or backend is down
- `origin_mismatch` → Vercel URL not in Google Cloud Console

---

## Quick Diagnostic Checklist

### Check 1: Vercel Environment Variables
```bash
# In Vercel Dashboard → Settings → Environment Variables
# You should see:
✅ VITE_API_URL = https://dev-hub-backend-latest.onrender.com
✅ VITE_BACKEND_URL = https://dev-hub-backend-latest.onrender.com
✅ VITE_GOOGLE_CLIENT_ID = 656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com
```

### Check 2: Google Cloud Console
```bash
# In Google Cloud Console → Credentials → OAuth 2.0 Client ID
# Authorized JavaScript origins should include:
✅ http://localhost:5173
✅ http://localhost:3000
✅ https://dev-hub-delta-lyart.vercel.app
```

### Check 3: Backend is Running
Visit: https://dev-hub-backend-latest.onrender.com

Should respond (even if it's just "Cannot GET /")

### Check 4: Vercel Build Logs
1. Go to Vercel Dashboard → Deployments
2. Click on latest deployment
3. Check build logs for errors

---

## Step-by-Step Fix (Do This Now!)

### 1. Set Vercel Environment Variables (5 minutes)
- [ ] Go to https://vercel.com/dashboard
- [ ] Select your project
- [ ] Settings → Environment Variables
- [ ] Add VITE_API_URL
- [ ] Add VITE_BACKEND_URL
- [ ] Add VITE_GOOGLE_CLIENT_ID
- [ ] Save all variables

### 2. Redeploy Vercel (2 minutes)
- [ ] Go to Deployments tab
- [ ] Click "..." on latest deployment
- [ ] Click "Redeploy"
- [ ] Wait for deployment to complete

### 3. Add Vercel URL to Google Cloud (5 minutes)
- [ ] Go to https://console.cloud.google.com/apis/credentials
- [ ] Click your OAuth Client ID
- [ ] Add https://dev-hub-delta-lyart.vercel.app to Authorized JavaScript origins
- [ ] Save
- [ ] Wait 5-10 minutes

### 4. Test (1 minute)
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Visit https://dev-hub-delta-lyart.vercel.app
- [ ] Try Google login
- [ ] Check browser console for errors

---

## If Still Not Working

### Debug in Browser Console
1. Open https://dev-hub-delta-lyart.vercel.app
2. Press F12 → Console tab
3. Type this and press Enter:
```javascript
console.log('VITE_GOOGLE_CLIENT_ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID)
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL)
console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL)
```

**Expected output:**
```
VITE_GOOGLE_CLIENT_ID: 656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com
VITE_API_URL: https://dev-hub-backend-latest.onrender.com
VITE_BACKEND_URL: https://dev-hub-backend-latest.onrender.com
```

**If you see `undefined`:**
→ Environment variables are NOT set in Vercel! Go back to Step 1.

---

## Common Mistakes

### ❌ Mistake 1: Only Setting Variables in `.env` File
`.env` files in your repository are **NOT used by Vercel**!
You MUST set them in Vercel Dashboard.

### ❌ Mistake 2: Not Redeploying After Adding Variables
Environment variables only take effect after redeployment.

### ❌ Mistake 3: Not Waiting for Google OAuth Propagation
Google Cloud Console changes take 5-10 minutes to propagate.

### ❌ Mistake 4: Wrong Environment Selected
Make sure to select **Production, Preview, AND Development** when adding variables.

---

## Visual Guide

### Vercel Environment Variables Should Look Like This:

```
┌─────────────────────────────────────────────────────────────────┐
│ Environment Variables                                            │
├─────────────────────────────────────────────────────────────────┤
│ VITE_API_URL                                                     │
│ https://dev-hub-backend-latest.onrender.com                      │
│ Production, Preview, Development                                 │
├─────────────────────────────────────────────────────────────────┤
│ VITE_BACKEND_URL                                                 │
│ https://dev-hub-backend-latest.onrender.com                      │
│ Production, Preview, Development                                 │
├─────────────────────────────────────────────────────────────────┤
│ VITE_GOOGLE_CLIENT_ID                                            │
│ 656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.google...    │
│ Production, Preview, Development                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Priority Actions (Do These First!)

### 🔴 CRITICAL - Do This First:
1. **Set Vercel Environment Variables** (most likely cause)
2. **Redeploy Vercel**
3. **Test**

### 🟡 IMPORTANT - Do This Second:
1. **Add Vercel URL to Google Cloud Console**
2. **Wait 5-10 minutes**
3. **Test again**

---

## Need More Help?

If still not working after following all steps:

1. **Share browser console errors** (F12 → Console tab)
2. **Share Vercel deployment logs**
3. **Confirm environment variables are set in Vercel**
4. **Confirm Vercel URL is in Google Cloud Console**

---

## Summary

**Most Likely Issue:** Environment variables not set in Vercel Dashboard

**Fix:**
1. ✅ Add environment variables in Vercel Dashboard
2. ✅ Redeploy
3. ✅ Add Vercel URL to Google Cloud Console
4. ✅ Wait and test

**Do NOT rely on `.env` files for Vercel deployment!**
