# Google OAuth Error: "Wrong recipient, payload audience != requiredAudience"

## Problem
You're getting the error: `Wrong recipient, payload audience != requiredAudience` when trying to authenticate with Google OAuth.

## Root Cause
This error occurs when the Google Client ID used to generate the token (frontend) doesn't match the Client ID used to verify the token (backend), OR when the authorized JavaScript origins aren't properly configured in Google Cloud Console.

## Current Configuration
- **Frontend Client ID**: `656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com`
- **Backend Client ID**: `656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com`
- **Frontend URL (dev)**: `http://localhost:5173`

## Debugging Steps Added
I've added enhanced logging to your backend (`server/src/routes/auth.ts`) that will now show:
1. Whether the GOOGLE_CLIENT_ID environment variable is loaded
2. The expected audience (Client ID)
3. The actual audience from the token
4. Whether they match

## Next Steps

### 1. Check the Server Logs
When you try to log in with Google, check the server terminal output. You should now see:
```
Google Client ID loaded: 656840032...1cou6.apps.googleusercontent.com
Attempting to verify Google token...
Expected audience (Client ID): 656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com
```

If there's a mismatch, you'll see:
```
Token payload audience (aud): <actual-value>
Expected audience: <expected-value>
Do they match? false
```

### 2. Verify Google Cloud Console Settings
Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and check your OAuth 2.0 Client ID settings:

**Authorized JavaScript origins** should include:
- `http://localhost:5173` (for local development)
- `http://localhost:3000` (if using port 3000)
- Your production domain (e.g., `https://dev-hub-delta-lyart.vercel.app`)

**Authorized redirect URIs** (if using redirect flow):
- `http://localhost:5173`
- Your production domain

### 3. Common Solutions

#### Solution A: Update Google Cloud Console
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Click on your OAuth 2.0 Client ID
3. Add `http://localhost:5173` to "Authorized JavaScript origins"
4. Save changes
5. Wait a few minutes for changes to propagate
6. Try logging in again

#### Solution B: Verify Environment Variables
Make sure your `.env` files have the correct values:

**server/.env**:
```env
GOOGLE_CLIENT_ID=656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com
```

**client/.env**:
```env
VITE_GOOGLE_CLIENT_ID=656840032038-9tcp1pmsagbvkjm233pv5qth1nm1cou6.apps.googleusercontent.com
```

#### Solution C: Restart Both Servers
After making changes to `.env` files:
1. Stop both frontend and backend servers (Ctrl+C)
2. Restart backend: `npm run dev` (in server directory)
3. Restart frontend: `npm run dev` (in client directory)

#### Solution D: Check for Multiple Client IDs
If you have multiple OAuth client IDs in Google Cloud Console, make sure you're using the same one in both frontend and backend.

## Testing
1. Try to log in with Google
2. Check the server terminal for the new debug logs
3. Share the output if the issue persists

## What Changed
I've updated `server/src/routes/auth.ts` to:
- Log the loaded Client ID on server startup
- Log detailed information when verifying tokens
- Decode the JWT token to show the actual audience value in case of errors
