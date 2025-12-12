# Quick Setup Guide

## Prerequisites

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose one:
   - Local MongoDB: [Download](https://www.mongodb.com/try/download/community)
   - MongoDB Atlas (Cloud): [Sign up](https://www.mongodb.com/cloud/atlas)

## Step-by-Step Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure MongoDB

**Option A: Local MongoDB**
1. Start MongoDB service:
   ```bash
   # Windows (if installed as service, it should auto-start)
   # Or run: mongod
   
   # macOS (if installed via Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. Use connection string: `mongodb://localhost:27017/smartlead`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/smartlead`)
4. Whitelist your IP address (or use 0.0.0.0/0 for development)

### 3. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartlead
NODE_ENV=development
```

**For MongoDB Atlas**, replace `MONGODB_URI` with your Atlas connection string.

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

You should see:
```
MongoDB connected successfully
Server is running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The browser should automatically open to `http://localhost:3000` (Vite dev server)

### 5. Test the Application

1. Enter names: `Peter, Aditi, Ravi, Satoshi`
2. Click "Process Leads"
3. View results in the table
4. Check backend console for sync logs (every 5 minutes)

## Troubleshooting

### MongoDB Connection Issues

**Error: "MongoDB connection error"**
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings
- Verify network connectivity

**Error: "Authentication failed"**
- Check username/password in connection string
- Ensure IP is whitelisted (Atlas)

### Port Already in Use

**Backend port 5000 in use:**
- Change `PORT` in `.env` file
- Update frontend `API_URL` in `frontend/src/App.js`

**Frontend port 3000 in use:**
- Vite will automatically use the next available port
- Or configure port in `frontend/vite.config.js`

### CORS Errors

- Ensure backend is running before frontend
- Check that `API_URL` in frontend matches backend URL
- Verify CORS is enabled in `backend/server.js`

## Production Deployment

### Backend (Heroku/Railway/Render)

1. Set environment variables in platform dashboard
2. Ensure MongoDB Atlas connection string is set
3. Deploy backend code

### Frontend (Vercel/Netlify)

1. Build: `cd frontend && npm run build`
2. Set environment variable: `VITE_API_URL=https://your-backend-url.com` (create `.env.production` file)
3. Deploy `dist` folder (Vite's output directory)

## Need Help?

- Check the main [README.md](./README.md) for detailed architecture explanation
- Verify all dependencies are installed: `npm list`
- Check MongoDB connection: `mongosh` or MongoDB Compass

