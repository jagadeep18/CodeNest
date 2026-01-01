# Quick Reference Guide

## 🚀 Quick Start (5 minutes)

### 1. Get Google OAuth Credentials
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create OAuth 2.0 credentials (Web application)
- Copy your Client ID

### 2. Create Environment Files

**Server (`server/.env`)**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/code-sync
GOOGLE_CLIENT_ID=your-client-id
JWT_SECRET=generate-random-string
```

**Client (`client/.env.local`)**
```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your-client-id
```

### 3. Install & Run

```bash
# Terminal 1: MongoDB
mongod

# Terminal 2: Server
cd server && npm install && npm run dev

# Terminal 3: Client
cd client && npm install && npm run dev
```

Visit `http://localhost:5173` 🎉

---

## 📁 New Files Added

### Server
```
server/src/
├── db/db.ts                    # MongoDB connection
├── models/
│   ├── User.ts                 # User schema
│   └── Project.ts              # Project schema
├── middleware/auth.ts          # JWT authentication
└── routes/
    ├── auth.ts                 # Authentication endpoints
    └── projects.ts             # Project endpoints
```

### Client
```
client/src/
├── api/projectAPI.ts           # Project API calls
└── components/
    ├── auth/GoogleLoginComponent.tsx
    ├── common/UserProfile.tsx
    └── projects/ProjectManager.tsx
```

---

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/google-login` | Google OAuth login |
| POST | `/api/auth/register` | Email/password signup |
| POST | `/api/auth/login` | Email/password login |
| GET | `/api/auth/me` | Get current user |

### Projects
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/projects/save` | Save/update project |
| GET | `/api/projects/list` | Get all projects |
| GET | `/api/projects/:id` | Get specific project |
| GET | `/api/projects/room/:roomId` | Get by room ID |
| DELETE | `/api/projects/:id` | Delete project |
| PATCH | `/api/projects/:id/drawing` | Update drawing |

---

## 🔐 Authentication Flow

```
User → Google Login Button → Google OAuth
       ↓
Google Returns Token → Server Verifies Token
       ↓
Server Creates/Finds User → Generates JWT
       ↓
Client Stores JWT in localStorage
       ↓
All API Calls Include: Authorization: Bearer {JWT}
```

---

## 💾 Project Save/Load Flow

```
User Saves Project
       ↓
ProjectManager Component Collects:
- fileStructure (from FileContext)
- files (from FileContext)
- drawingData (optional)
       ↓
API Call with JWT Token
       ↓
Server Saves/Updates in MongoDB
       ↓
User Sees Toast Notification
```

---

## 📦 Project Download Structure

```
project-name-timestamp.zip
├── files/
│   ├── file1.js
│   ├── file2.tsx
│   └── folder/
│       └── file3.ts
├── file-structure.json
└── drawing-data.json
```

---

## 🐛 Troubleshooting Checklist

| Issue | Solution |
|-------|----------|
| Google login not working | Check Client ID in both `.env` files |
| MongoDB connection failed | Ensure `mongod` is running |
| "Port already in use" | Change PORT in server `.env` |
| CORS errors | Check `VITE_API_URL` matches server URL |
| 401 Unauthorized | Token expired, logout and login again |
| Projects not saving | Check auth token in browser DevTools |

---

## 🎯 Testing Checklist

- [ ] Google login works
- [ ] User profile shows correctly
- [ ] Can save projects with unique names
- [ ] Can view saved projects in list
- [ ] Can download projects as ZIP
- [ ] Can delete projects
- [ ] Drawing data persists
- [ ] File structure preserved in download
- [ ] Logout clears localStorage
- [ ] Re-login restores session

---

## 🔍 Debug Commands

**Check Auth Token**
```javascript
localStorage.getItem('authToken')
localStorage.getItem('currentUser')
```

**Test API Endpoint**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/projects/list
```

**MongoDB Check**
```bash
mongo
use code-sync
db.users.find()
db.projects.find()
```

---

## 📚 Key Technologies

| Stack | Tools |
|-------|-------|
| Frontend | React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB, Mongoose |
| Auth | Google OAuth 2.0, JWT |
| Real-time | Socket.io (existing) |
| File Download | JSZip, FileSaver |

---

## 🚨 Important Notes

1. **JWT Secret**: Generate a long random string for production
2. **Google Client ID**: Get from Google Cloud Console
3. **MongoDB URI**: Change for production (use MongoDB Atlas)
4. **CORS**: Configured for localhost, update for production domain
5. **Token Expiry**: Default 7 days, adjustable in auth middleware

---

## 📞 Common Issues & Fixes

### Issue: "Cannot find module 'mongoose'"
**Fix**: 
```bash
cd server
npm install mongoose jsonwebtoken google-auth-library bcryptjs axios
```

### Issue: "VITE_API_URL not defined"
**Fix**: Ensure `.env.local` exists with `VITE_API_URL=http://localhost:3000`

### Issue: Google login button not showing
**Fix**: Check `VITE_GOOGLE_CLIENT_ID` is set in `.env.local`

### Issue: Projects not saving
**Fix**: 
1. Check user is authenticated (login first)
2. Verify MongoDB is running
3. Check network tab in DevTools for API errors

---

## 🎓 Learning Resources

- [JWT Explained](https://jwt.io/introduction)
- [Google OAuth Flow](https://developers.google.com/identity/protocols/oauth2)
- [MongoDB Guide](https://docs.mongodb.com/)
- [Socket.io Docs](https://socket.io/docs/)
- [React Context API](https://react.dev/reference/react/useContext)

---

**Last Updated**: December 2024
**Version**: 1.0
