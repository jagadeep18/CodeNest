# IMMEDIATE FIX - Vercel Environment Variables

## The Problem
CORS error means either:
1. Vercel environment variables are NOT set (most likely)
2. Vercel is using old deployment without env vars

## SOLUTION - Set Vercel Environment Variables NOW

### Step 1: Go to Vercel Dashboard
https://vercel.com/dashboard

### Step 2: Find Your Project
Click on: **dev-hub**

### Step 3: Go to Settings
Click: **Settings** → **Environment Variables**

### Step 4: Add These 3 Variables

**IMPORTANT**: For EACH variable, select ALL THREE environments:
- ✅ Production
- ✅ Preview  
- ✅ Development

#### Variable 1:
```
Name: VITE_API_URL
Value: https://dev-hub-backend-latest.onrender.com
Environments: Production, Preview, Development (SELECT ALL)
```

#### Variable 2:
```
Name: VITE_BACKEND_URL
Value: https://dev-hub-backend-latest.onrender.com
Environments: Production, Preview, Development (SELECT ALL)
```

#### Variable 3:
```
Name: VITE_GOOGLE_CLIENT_ID
Value: 656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com
Environments: Production, Preview, Development (SELECT ALL)
```

### Step 5: REDEPLOY (CRITICAL!)
After adding variables:
1. Go to **Deployments** tab
2. Click **"..."** (three dots) on the latest deployment
3. Click **"Redeploy"**
4. **UNCHECK** "Use existing Build Cache"
5. Click **"Redeploy"**
6. Wait 2-3 minutes

### Step 6: Test
1. Clear browser cache (Ctrl+Shift+Delete)
2. Visit: https://dev-hub-delta-lyart.vercel.app
3. Open Console (F12)
4. Try Google login
5. Check for errors

---

## Verification Checklist

Before testing, verify:
- [ ] All 3 environment variables added in Vercel
- [ ] Each variable has Production, Preview, AND Development selected
- [ ] Redeployed Vercel (not just saved variables)
- [ ] Waited for deployment to complete
- [ ] Cleared browser cache
- [ ] Google Cloud Console has https://dev-hub-delta-lyart.vercel.app in authorized origins
- [ ] Render backend is deployed and running

---

## If Still Not Working

Take a screenshot of:
1. Vercel → Settings → Environment Variables (show all 3 variables)
2. Browser Console error when clicking Google login
3. Render logs showing the service is running

This will help diagnose the exact issue!
