# Google OAuth Setup - Complete Fresh Start

## Step 1: Create New OAuth 2.0 Client ID

### 1.1 Go to Google Cloud Console
https://console.cloud.google.com/apis/credentials

### 1.2 Create New Project (Optional)
- Click "Select a project" → "New Project"
- Name: "Dev-Hub"
- Click "Create"

### 1.3 Enable Google+ API
1. Go to: https://console.cloud.google.com/apis/library
2. Search for "Google+ API"
3. Click "Enable"

### 1.4 Create OAuth Consent Screen
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Select "External" → Click "Create"
3. Fill in:
   - App name: `Dev Hub`
   - User support email: `gorantla.jagadeep@gmail.com`
   - Developer contact: `gorantla.jagadeep@gmail.com`
4. Click "Save and Continue"
5. Scopes: Skip (click "Save and Continue")
6. Test users: Add `gorantla.jagadeep@gmail.com`
7. Click "Save and Continue"

### 1.5 Create OAuth 2.0 Client ID
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "+ CREATE CREDENTIALS" → "OAuth client ID"
3. Application type: **Web application**
4. Name: `Dev Hub Web Client`

5. **Authorized JavaScript origins** - Add these:
```
http://localhost:5173
http://localhost:3000
https://dev-hub-delta-lyart.vercel.app
```

6. **Authorized redirect URIs** - Add these:
```
http://localhost:5173
http://localhost:3000
https://dev-hub-delta-lyart.vercel.app
```

7. Click "CREATE"
8. **COPY THE CLIENT ID** - You'll need this!

---

## Step 2: Update Environment Variables

### 2.1 Local Development (.env.local)
File: `client/.env.local`

```env
VITE_API_URL=http://localhost:3000
VITE_BACKEND_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
```

### 2.2 Vercel Environment Variables
1. Go to: https://vercel.com/dashboard
2. Click your project → Settings → Environment Variables
3. **Update** (or add if missing):
   - `VITE_GOOGLE_CLIENT_ID` = `YOUR_NEW_CLIENT_ID_HERE`
   - `VITE_API_URL` = `https://dev-hub-backend-latest.onrender.com`
   - `VITE_BACKEND_URL` = `https://dev-hub-backend-latest.onrender.com`
4. Select: Production, Preview, Development (all three)
5. Click "Save"

### 2.3 Render Environment Variables
1. Go to: https://dashboard.render.com
2. Click `dev-hub-backend-latest` → Environment
3. **Update**:
   - `GOOGLE_CLIENT_ID` = `YOUR_NEW_CLIENT_ID_HERE`
4. Click "Save Changes"

---

## Step 3: Update Code

### 3.1 Update Backend (server/.env)
```env
GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
```

### 3.2 Update Client (.env)
```env
VITE_GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
```

---

## Step 4: Deploy

### 4.1 Commit Changes
```bash
git add .
git commit -m "feat: Fresh Google OAuth setup with new Client ID"
git push origin main
```

### 4.2 Redeploy Vercel
1. Go to Vercel Dashboard → Deployments
2. Click "..." → "Redeploy"
3. Uncheck "Use existing Build Cache"
4. Wait for deployment

### 4.3 Redeploy Render
- Should auto-deploy from GitHub push
- Or manually: Dashboard → Manual Deploy

---

## Step 5: Test

### 5.1 Test Locally
1. Start backend: `cd server && npm run dev`
2. Start frontend: `cd client && npm run dev`
3. Open: http://localhost:5173
4. Click "Sign in with Google"
5. Should work! ✅

### 5.2 Test Production
1. Clear browser cache (Ctrl+Shift+Delete)
2. Open: https://dev-hub-delta-lyart.vercel.app
3. Click "Sign in with Google"
4. Should work! ✅

---

## Troubleshooting

### Error: "origin_mismatch"
- Check that your URL is in "Authorized JavaScript origins"
- Wait 5-10 minutes after adding URLs

### Error: "redirect_uri_mismatch"
- Check that your URL is in "Authorized redirect URIs"

### Error: "Access blocked"
- Make sure OAuth consent screen is configured
- Add yourself as a test user

### Error: CORS
- Backend CORS is already configured
- Make sure Render has deployed latest code

---

## Quick Reference

### Your URLs:
- **Local Frontend**: http://localhost:5173
- **Local Backend**: http://localhost:3000
- **Production Frontend**: https://dev-hub-delta-lyart.vercel.app
- **Production Backend**: https://dev-hub-backend-latest.onrender.com

### Environment Variables Needed:
**Frontend (Vercel + Local):**
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_API_URL`
- `VITE_BACKEND_URL`

**Backend (Render + Local):**
- `GOOGLE_CLIENT_ID`
- `MONGO_URI`
- `JWT_SECRET`

---

## After Setup Checklist

- [ ] Created new OAuth Client ID in Google Cloud Console
- [ ] Added all URLs to Authorized JavaScript origins
- [ ] Copied new Client ID
- [ ] Updated client/.env.local
- [ ] Updated server/.env
- [ ] Updated Vercel environment variables
- [ ] Updated Render environment variables
- [ ] Committed and pushed to GitHub
- [ ] Redeployed Vercel
- [ ] Waited for Render to deploy
- [ ] Tested locally - works!
- [ ] Tested on Vercel - works!

---

## Success Criteria

When everything is working:
1. ✅ No CORS errors
2. ✅ No "origin_mismatch" errors
3. ✅ Google login popup appears
4. ✅ Can select Google account
5. ✅ Successfully logs in
6. ✅ Redirected to room selection
7. ✅ User data is saved

---

## Need Help?

If still not working, check:
1. Browser console for errors (F12)
2. Network tab for failed requests
3. Render logs for backend errors
4. Vercel deployment logs
5. Google Cloud Console for API limits

Good luck! 🚀
