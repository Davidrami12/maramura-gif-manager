# 🖼️ Maramura Gif Manager 🛠️

## How to clone and configure this repository locally

### 📝 Prerequisites

- Node.js installed (v18.18.0 is highly recommended to avoid some dependencies issues)
- NPM (v6 or later) or Yarn (v1.22 or later)
- Firebase CLI

### 🛠️ Installation

1. Clone this repository:
```bash
git clone https://github.com/Davidrami12/maramura-gif-manager.git

cd maramura-gif-manager
```

2. Install NPM packages on both frontend and backend folders:
- For frontend navigate to root directory
- For backend go to `src/functions/`
```bash
npm install
```

3. Configure Environment Variables:

There is a `.env.example` file updated already to copy and create your own `.env` file. Then, fill in the necessary Firebase credentials. You can find these in your Firebase Project Settings → General → Web apps → SDK setup and configuration.
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

VITE_API_URL=
```
For VITE_API_URL you can visit Google Cloud Console then check Cloud Functions.

4. Run script to start frontend and open generated port link:
```bash
npm run dev
```

5. Set up backend (Firebase):

Login to Firebase CLI:
```bash
firebase login
```
Run Firebase functions locally:
```bash
firebase emulators:start
```
Alternatively, to deploy the backend to Firebase:
```bash
firebase deploy --only functions
```


## Technology Stack

### 📌 Frontend
- React + TypeScript
- Redux Toolkit (State management)
- Material-UI
- Vite

### 📌 Backend
- Firebase Functions (Serverless backend (Node.js))
- Cloud Firestore (database)
- Firebase Storage (Media storage for GIFs)