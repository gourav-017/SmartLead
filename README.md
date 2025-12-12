# Smart Lead Automation System

A full-stack MERN application that simulates a lead enrichment automation system. The system ingests names, enriches them with nationality predictions using the Nationalize.io API, applies business logic to determine verification status, and automatically syncs verified leads to a CRM.

## 🚀 Features

- **Batch Processing**: Process multiple names simultaneously with efficient concurrent API calls
- **Lead Enrichment**: Automatically fetch nationality predictions from Nationalize.io API
- **Business Logic**: Automatically classify leads as "Verified" (≥60% confidence) or "To Check" (<60%)
- **Real-time Dashboard**: View processed leads with filtering capabilities
- **Background Automation**: Scheduled job runs every 5 minutes to sync verified leads to CRM
- **Idempotency**: Ensures leads are never synced more than once

## 📋 Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Background Jobs**: node-cron
- **HTTP Client**: Axios

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vr
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smartlead
   NODE_ENV=development
   ```

   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartlead
   ```

5. **Start MongoDB**

   If using local MongoDB:
   ```bash
   mongod
   ```

   Or ensure your MongoDB Atlas connection string is correct.

6. **Start Backend Server**
   ```bash
   cd backend
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

7. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will run on `http://localhost:3000` (Vite dev server)

## 📖 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter comma-separated names in the input field (e.g., "Peter, Aditi, Ravi, Satoshi")
3. Click "Process Leads" to submit the batch
4. View the results in the table below
5. Use the filter buttons to view leads by status (All, Verified, To Check)
6. The background job will automatically sync verified leads every 5 minutes (check backend console)

## 🏗️ Architecture

### Backend Architecture

#### 1. **Batch API Processing Strategy**

The system handles batch API requests efficiently using **concurrent processing**:

- **Location**: `backend/services/nationalizeService.js`
- **Strategy**: Uses `Promise.all()` to execute all Nationalize.io API calls concurrently
- **Benefits**:
  - Significantly faster than sequential processing
  - Handles multiple requests without blocking
  - Includes timeout protection (10 seconds per request)
  - Graceful error handling for individual failures

```javascript
// All API calls execute in parallel
const promises = names.map(name => getNationality(name.trim()));
const results = await Promise.all(promises);
```

#### 2. **Idempotency Strategy for CRM Sync**

The background sync process ensures leads are never synced twice:

- **Location**: `backend/services/syncService.js`
- **Strategy**: 
  - Uses a `syncedToCRM` boolean flag in the database schema
  - Queries only for `status: 'Verified' AND syncedToCRM: false`
  - Immediately marks leads as synced before processing
  - Database index on `{ status: 1, syncedToCRM: 1 }` for efficient queries

**Database Schema**:
```javascript
{
  syncedToCRM: Boolean (default: false),
  syncedAt: Date (default: null)
}
```

**Process Flow**:
1. Background job runs every 5 minutes (using node-cron)
2. Query finds only unsynced verified leads
3. For each lead: log sync message → mark as synced → save to DB
4. Even if the job runs multiple times, already-synced leads are excluded

#### 3. **Business Logic**

- **Location**: `backend/routes/leadRoutes.js`
- **Rule**: Confidence score ≥ 0.6 (60%) → "Verified", else → "To Check"
- Applied during lead creation/update

### Frontend Architecture

- **Component Structure**: Single-page application with real-time updates
- **State Management**: React hooks (useState, useEffect)
- **Auto-refresh**: Fetches leads every 10 seconds
- **Filtering**: Client-side filtering by status

### API Endpoints

- `POST /api/leads/process` - Process a batch of names
- `GET /api/leads` - Get all leads (optional `?status=Verified` query param)
- `GET /api/leads/stats` - Get statistics about leads
- `GET /api/health` - Health check endpoint

## 📊 Database Schema

```javascript
{
  name: String (required),
  predictedCountry: String (required),
  confidenceScore: Number (0-1, required),
  status: String (enum: ['Verified', 'To Check'], required),
  syncedToCRM: Boolean (default: false),
  syncedAt: Date (default: null),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔍 Testing the System

1. **Process Names**: Submit names like "Peter, Aditi, Ravi, Satoshi"
2. **Check Results**: Verify leads appear in the table with correct status
3. **Filter**: Test filtering by "Verified" and "To Check"
4. **Background Sync**: Wait 5 minutes and check backend console for sync logs
5. **Idempotency**: Verify that synced leads don't get synced again on subsequent runs

## 📸 Database Screenshot

To capture a database screenshot:

1. Use MongoDB Compass or any MongoDB GUI tool
2. Connect to your database (`smartlead`)
3. Navigate to the `leads` collection
4. Take a screenshot showing the documents

Alternatively, you can use the frontend stats dashboard which displays real-time statistics.

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Set environment variables:
   - `MONGODB_URI`
   - `PORT` (usually auto-set by platform)
   - `NODE_ENV=production`

2. Update frontend `API_URL` in `frontend/src/App.js` to point to deployed backend

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder (Vite's output directory)

3. Set environment variable `VITE_API_URL` to your backend URL (create `.env.production` file)

## 📝 Notes

- The CRM sync is simulated by logging to the console. In production, this would be replaced with actual CRM API calls.
- The system handles API failures gracefully - failed requests return "Error" as country with 0 probability.
- Duplicate names update existing leads rather than creating duplicates.

## 👨‍💻 Development

- Backend uses nodemon for auto-reload in development mode
- Frontend uses Create React App with hot reload
- CORS is enabled for development (configure appropriately for production)

## 📄 License

ISC

