# 🚀 CODEnest — Deploy Backend to Render & Frontend to Vercel

---

## ══════════════════════════════════════════
## PART 1 — DEPLOY BACKEND TO RENDER
## ══════════════════════════════════════════

### Step 1 — Push your code to GitHub
Make sure your project is on GitHub (both client and server folders inside the same repo).

```
git add .
git commit -m "ready for deployment"
git push origin main
```

---

### Step 2 — Create a Render Account
Go to: https://render.com
Sign up with your GitHub account.

---

### Step 3 — Create a New Web Service on Render

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repo → select **dev-hub** repository
3. Fill in these settings:

| Field              | Value                          |
|--------------------|-------------------------------|
| **Name**           | `dev-hub-backend`             |
| **Root Directory** | `server`                      |
| **Runtime**        | `Node`                        |
| **Build Command**  | `npm install && npm run build`|
| **Start Command**  | `node dist/server.js`         |
| **Branch**         | `main`                        |
| **Plan**           | Free                          |

---

### Step 4 — Add Environment Variables on Render

In the Render dashboard → your service → **"Environment"** tab → Add these:

| Key               | Value                                                                                 |
|-------------------|---------------------------------------------------------------------------------------|
| `PORT`            | `4000`                                                                                |
| `MONGODB_URI`     | *(your full MongoDB Atlas connection string from server/.env)*                        |
| `JWT_SECRET`      | `codenest_super_secret_jwt_key_2024`                                                  |
| `GOOGLE_CLIENT_ID`| `656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com`           |

---

### Step 5 — Deploy

Click **"Create Web Service"**.
Render will build and deploy automatically.

After deploy, your backend URL will be:
```
https://dev-hub-backend.onrender.com
```
(copy this — you need it for Step below)

---

### Step 6 — Add your Vercel frontend URL to server CORS

Once your frontend is deployed (Part 2), come back to Render → Environment → add:

| Key              | Value                                      |
|------------------|--------------------------------------------|
| `FRONTEND_URL`   | `https://your-app-name.vercel.app`         |

Then update your server CORS `allowedOrigins` array in `server/src/server.ts` to also include:
```
process.env.FRONTEND_URL
```

---

## ══════════════════════════════════════════
## PART 2 — DEPLOY FRONTEND TO VERCEL
## ══════════════════════════════════════════

### Step 1 — Create a Vercel Account
Go to: https://vercel.com
Sign up with your GitHub account.

---

### Step 2 — Import your project

1. Click **"Add New..."** → **"Project"**
2. Import your **dev-hub** GitHub repository
3. Fill in these settings:

| Field                | Value           |
|----------------------|-----------------|
| **Framework Preset** | `Vite`          |
| **Root Directory**   | `client`        |
| **Build Command**    | `npm run build` |
| **Output Directory** | `dist`          |

---

### Step 3 — Add Environment Variables on Vercel

In the Vercel project → **"Settings"** → **"Environment Variables"** → Add:

| Key                   | Value                                                                       | 
|-----------------------|-----------------------------------------------------------------------------|
| `VITE_BACKEND_URL`    | `https://dev-hub-backend-4c2p.onrender.com`  ← your Render backend URL           |
| `VITE_GOOGLE_CLIENT_ID` | `656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com` |

---

### Step 4 — Update vercel.json (already done ✅)

Your `client/vercel.json` already has the correct rewrites:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://dev-hub-backend-latest.onrender.com/api/$1" },
    { "source": "/socket.io/(.*)", "destination": "https://dev-hub-backend-latest.onrender.com/socket.io/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

⚠️  Make sure the destination URL matches your actual Render backend URL exactly.

---

### Step 5 — Deploy

Click **"Deploy"**. Vercel will build and deploy your frontend.

Your live frontend URL will be:
```
https://your-app-name.vercel.app
```

---

## ══════════════════════════════════════════
## PART 3 — FINAL CHECKLIST AFTER DEPLOY
## ══════════════════════════════════════════

- [ ] Render backend is live → test: https://dev-hub-backend.onrender.com
- [ ] Vercel frontend is live → test: https://your-app-name.vercel.app
- [ ] VITE_BACKEND_URL on Vercel matches your Render URL
- [ ] vercel.json destination URLs match your Render URL
- [ ] MongoDB Atlas IP Whitelist → set to 0.0.0.0/0 (allow all) for Render access
- [ ] Google OAuth Authorized Origins includes your Vercel URL
- [ ] Google OAuth Authorized Redirect URIs includes your Vercel URL

---

## ══════════════════════════════════════════
## PART 4 — GOOGLE OAUTH SETUP (Important!)
## ══════════════════════════════════════════

Go to: https://console.cloud.google.com
→ APIs & Services → Credentials → your OAuth 2.0 Client

Add to **Authorized JavaScript origins**:
```
https://your-app-name.vercel.app
```

Add to **Authorized redirect URIs**:
```
https://your-app-name.vercel.app
https://your-app-name.vercel.app/auth/callback
```

Save → wait 5 minutes for Google to propagate changes.

---

## ══════════════════════════════════════════
## PART 5 — MONGODB ATLAS IP WHITELIST
## ══════════════════════════════════════════

Go to: https://cloud.mongodb.com
→ Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

This allows Render's dynamic IPs to connect to MongoDB.

---

> ✅ Done! Your full stack is now live.
> Backend: Render | Frontend: Vercel | Database: MongoDB Atlas
