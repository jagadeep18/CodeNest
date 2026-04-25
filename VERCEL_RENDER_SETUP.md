# ✅ CODEnest — Final Deployment Configuration

Frontend: https://codenest-bice.vercel.app
Backend:  https://dev-hub-backend-4c2p.onrender.com

---

## ══════════════════════════════════════════
## STEP 1 — Set Environment Variables on RENDER
## ══════════════════════════════════════════

Go to: https://dashboard.render.com
→ Select your backend service (dev-hub-backend-4c2p)
→ Environment → Add / Update these:

| Name              | Value                                                                                                           |
|-------------------|-----------------------------------------------------------------------------------------------------------------|
| PORT              | 4000                                                                                                            |
| JWT_SECRET        | codenest_super_secret_jwt_key_2024                                                                              |
| GOOGLE_CLIENT_ID  | 656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com                                       |
| MONGODB_URI       | mongodb://admin:admin@ac-hm80yam-shard-00-00.rfhorcq.mongodb.net:27017,...(paste full string from server/.env) |
| FRONTEND_URL      | https://codenest-bice.vercel.app                                                                                |

→ Click "Save Changes" → Render restarts automatically.

---

## ══════════════════════════════════════════
## STEP 2 — Set Environment Variables on VERCEL
## ══════════════════════════════════════════

Go to: https://vercel.com/dashboard
→ codenest-bice project → Settings → Environment Variables

| Name                    | Value                                                                        |
|-------------------------|------------------------------------------------------------------------------|
| VITE_BACKEND_URL        | https://dev-hub-backend-4c2p.onrender.com                                    |
| VITE_GOOGLE_CLIENT_ID   | 656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com     |

→ After adding, go to Deployments → click the 3 dots → "Redeploy"

---

## ══════════════════════════════════════════
## STEP 3 — Push code to GitHub
## ══════════════════════════════════════════

Run in PowerShell from d:\CodeNest\DevHub\dev-hub:

    git add .
    git commit -m "fix: update backend URL to dev-hub-backend-4c2p.onrender.com"
    git push origin main

Render and Vercel will auto-redeploy.

---

## ══════════════════════════════════════════
## STEP 4 — MongoDB Atlas: Allow Render IPs
## ══════════════════════════════════════════

Go to: https://cloud.mongodb.com
→ Network Access → Add IP Address
→ Allow Access from Anywhere: 0.0.0.0/0
→ Confirm

---

## ══════════════════════════════════════════
## STEP 5 — Google OAuth Console
## ══════════════════════════════════════════

Go to: https://console.cloud.google.com
→ APIs & Services → Credentials → your OAuth Client ID

Authorized JavaScript origins — add:
    https://codenest-bice.vercel.app

Authorized redirect URIs — add:
    https://codenest-bice.vercel.app

→ Save → Wait 5 minutes.

---

## ══════════════════════════════════════════
## SUMMARY — All Live URLs
## ══════════════════════════════════════════

| What        | URL                                              |
|-------------|--------------------------------------------------|
| Frontend    | https://codenest-bice.vercel.app                 |
| Backend     | https://dev-hub-backend-4c2p.onrender.com        |
| MongoDB     | cloud.mongodb.com (Atlas)                        |

---

## ══════════════════════════════════════════
## vercel.json (already updated ✅)
## ══════════════════════════════════════════

client/vercel.json now points to:
    /api/*        → https://dev-hub-backend-4c2p.onrender.com/api/*
    /socket.io/*  → https://dev-hub-backend-4c2p.onrender.com/socket.io/*
