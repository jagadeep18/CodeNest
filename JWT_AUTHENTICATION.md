# 🔐 Google Authentication with JWT - How It Works

## ✅ You're Already Using JWT!

Your application **already uses JWT (JSON Web Tokens)** for Google authentication. Here's how it works:

---

## 🔄 Authentication Flow

### Step 1: User Clicks "Sign in with Google"
```
Frontend → Google OAuth Popup Opens
```

### Step 2: Google Authenticates User
```
User selects Google account
Google verifies credentials
Google returns ID Token to frontend
```

### Step 3: Frontend Sends Token to Backend
```javascript
// Frontend sends Google's ID token to your backend
POST /api/auth/google-login
Body: { tokenId: "google_id_token_here" }
```

### Step 4: Backend Verifies Google Token
```typescript
// backend/src/routes/auth.ts (lines 20-23)
const ticket = await googleClient.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
})
```

### Step 5: Backend Creates/Updates User
```typescript
// backend/src/routes/auth.ts (lines 32-47)
let user = await User.findOne({ email })
if (!user) {
    user = await User.create({
        googleId: sub,
        email,
        username: name,
        profilePicture: picture,
    })
}
```

### Step 6: Backend Generates JWT Token ✅
```typescript
// backend/src/routes/auth.ts (line 49)
const token = generateToken(user._id.toString())

// backend/src/middleware/auth.ts (lines 26-29)
export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",  // Token valid for 7 days
    })
}
```

### Step 7: Backend Returns JWT to Frontend
```typescript
// backend/src/routes/auth.ts (lines 51-60)
res.json({
    success: true,
    token,  // ← This is YOUR JWT token!
    user: {
        id: user._id,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture,
    },
})
```

### Step 8: Frontend Stores JWT
```
Frontend receives JWT token
Stores it in localStorage/sessionStorage
Uses it for all subsequent API requests
```

### Step 9: Protected API Requests
```typescript
// All protected routes use JWT authentication
// backend/src/middleware/auth.ts (lines 8-24)

Authorization: Bearer <your_jwt_token>
```

---

## 🎯 Key Points

### What Happens:
1. **Google ID Token** is used ONLY for initial authentication
2. **Your JWT Token** is used for all subsequent requests
3. **JWT is signed with your secret** (`JWT_SECRET` in .env)
4. **JWT expires in 7 days** (configurable)

### Why This is Good:
- ✅ **Secure**: Google verifies the user, you control the session
- ✅ **Stateless**: No need to store sessions on the server
- ✅ **Scalable**: JWT can be verified without database lookups
- ✅ **Flexible**: Works with any authentication method (Google, email/password, etc.)

---

## 🔍 Current JWT Configuration

### JWT Secret (in server/.env):
```env
JWT_SECRET=41764863136003446d4ce70628de950784146fc33af8e44aeef5eb62fcfcb4cd
```

### JWT Expiration:
```typescript
expiresIn: "7d"  // 7 days
```

### JWT Payload:
```typescript
{
    userId: "user_mongodb_id",
    iat: 1234567890,  // Issued at timestamp
    exp: 1234567890   // Expiration timestamp
}
```

---

## 🛡️ How JWT is Verified

When a user makes a protected API request:

```typescript
// 1. Frontend sends request with JWT
GET /api/projects/list
Headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// 2. Backend middleware extracts and verifies JWT
const token = req.headers.authorization?.split(" ")[1]
const decoded = jwt.verify(token, process.env.JWT_SECRET)

// 3. If valid, request proceeds with userId
req.userId = decoded.userId
next()

// 4. If invalid/expired, returns 401 Unauthorized
```

---

## 📊 Authentication Methods Comparison

| Method | Initial Auth | Session Management | Your App |
|--------|--------------|-------------------|----------|
| **Google OAuth + JWT** | Google ID Token | Your JWT | ✅ **Current** |
| Google OAuth Only | Google ID Token | Google Session | ❌ Not used |
| Email/Password + JWT | Email/Password | Your JWT | ✅ **Supported** |

---

## 🔧 Customizing JWT (Optional)

### Change Token Expiration

**File:** `server/src/middleware/auth.ts` (line 28)

```typescript
// Current: 7 days
expiresIn: "7d"

// Options:
expiresIn: "1h"    // 1 hour
expiresIn: "24h"   // 24 hours
expiresIn: "30d"   // 30 days
expiresIn: "365d"  // 1 year
```

### Add More Claims to JWT

```typescript
export const generateToken = (userId: string, email?: string) => {
    return jwt.sign(
        { 
            userId, 
            email,           // Add email
            role: "user"     // Add role
        }, 
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
    )
}
```

### Refresh Token Implementation (Advanced)

If you want to implement refresh tokens:

```typescript
// Generate access token (short-lived)
const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" })

// Generate refresh token (long-lived)
const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "30d" })

// Return both
res.json({ accessToken, refreshToken })
```

---

## 🧪 Testing JWT

### Decode Your JWT (for debugging)

Visit: https://jwt.io/

Paste your JWT token to see the decoded payload:
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "iat": 1706025600,
  "exp": 1706630400
}
```

### Test Protected Endpoint

```bash
# Get your JWT token from login response
TOKEN="your_jwt_token_here"

# Make authenticated request
curl -H "Authorization: Bearer $TOKEN" \
     https://dev-hub-backend-latest.onrender.com/api/auth/me
```

---

## 📋 Summary

### Your Current Setup:
1. ✅ **Google OAuth** for initial authentication
2. ✅ **JWT** for session management
3. ✅ **7-day expiration** for tokens
4. ✅ **Secure secret** for signing tokens
5. ✅ **Works with both Google and email/password** authentication

### No Changes Needed!
Your implementation is already using industry best practices:
- Google OAuth for secure user verification
- JWT for stateless session management
- Proper token verification on protected routes

---

## 🎉 Conclusion

**You don't need to change anything!** Your application already uses JWT for Google authentication. The flow is:

1. User signs in with Google → Google verifies identity
2. Backend creates/finds user → Generates **YOUR JWT token**
3. Frontend stores JWT → Uses it for all API requests
4. Backend verifies JWT → Grants access to protected resources

This is the **recommended approach** for modern web applications! 🚀

---

## 🔗 Related Files

- **JWT Middleware**: `server/src/middleware/auth.ts`
- **Google Auth Route**: `server/src/routes/auth.ts`
- **JWT Secret**: `server/.env` (JWT_SECRET)
- **Token Expiration**: 7 days (configurable)

If you want to customize the JWT behavior (expiration time, additional claims, refresh tokens), let me know and I can help you implement those changes!
