CODENEST — Complete Setup \& Run Commands



\## ─────────────────────────────────────────────

\## STEP 1 — Install Node.js (if not installed)

\## ─────────────────────────────────────────────



\# Check if Node.js is installed (must be v18 or above)

node -v



\# If not installed, download and install from:

\# https://nodejs.org/en/download  (choose LTS version)



\# After installing, verify:

node -v

npm -v

















\## ─────────────────────────────────────────────

\## STEP 2 — Install SERVER dependencies

\## ─────────────────────────────────────────────



cd d:\\CodeNest\\DevHub\\dev-hub\\server



npm install



npm run dev -- --host



\# Server will start on:

\# http://localhost:4000















### 

### **IN ANOTHER TERMINAL:**



\## ─────────────────────────────────────────────

\## STEP 3 — Install CLIENT dependencies

\## ─────────────────────────────────────────────



cd d:\\CodeNest\\DevHub\\dev-hub\\client

npm install

npm run dev -- --host



\# Client will start on:

\#   Local:   http://localhost:5173

\#   Network: http://192.168.x.x:5173   ← share this on same Wi-Fi



























\## ─────────────────────────────────────────────

\## NOTES

\## ─────────────────────────────────────────────



\# - Run SERVER first, then CLIENT

\# - Both terminals must stay open while using the app

\# - To stop either, press Ctrl + C in its terminal

\# - MongoDB connects automatically (Atlas cloud)

\# - No extra setup needed for database



