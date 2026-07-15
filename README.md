# Society Maintenance Tracker

A comprehensive platform for apartment societies where residents can raise and track complaints, and admins can manage the workflows efficiently. 

## Setup Guide

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account (or local MongoDB)
- Cloudinary Account (for image uploads)
- Gmail account (with App Password enabled for sending emails)

### 1. Clone & Install Dependencies

Open a terminal in the root project folder:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory and add the following keys (see `server/.env.example`):

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=1d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

Create a `.env` file in the `client` directory to connect the React app to your hosted API (see `client/.env.example`):
```
VITE_API_URL=https://your-backend-domain.com/api/v1
```

### 3. Start the Application

Start Backend:
```bash
cd server
npm run dev
```
Start Frontend:
```bash
cd client
npm run dev
```

---

## Database Schema

### 1. User
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required)
- `role` (String, enum: `["resident", "admin"]`)
- `flatNo` (String, optional, only for residents)
- `refreshToken` (String)

### 2. Complaint
- `title` (String, required)
- `description` (String, required)
- `userId` (ObjectId, ref: `User`)
- `category` (String, enum: `["water", "electricity", "sanitation", "security", "parking", "lift", "other"]`)
- `photo` (Array of Strings - Cloudinary URLs)
- `priority` (String, enum: `["low", "medium", "high"]`, default: `low`)
- `status` (String, enum: `["open", "in-progress", "resolved"]`, default: `open`)
- `isOverdue` (Boolean, default: `false`)
- `flatNo` (String, required)
- `timestamps` (createdAt, updatedAt)

### 3. ComplaintHistory
- `complaintId` (ObjectId, ref: `Complaint`)
- `changedBy` (ObjectId, ref: `User`)
- `status` (String, required)
- `isOverdue` (Boolean, default: `false`)
- `remark` (String)
- `resolvedAt` (Date, default: `null`)
- `timestamps` (createdAt, updatedAt)

### 4. Notice
- `title` (String, required)
- `description` (String, required)
- `isImportant` (Boolean, default: `false`)
- `createdBy` (ObjectId, ref: `User`)
- `photo` (String - Cloudinary URL)
- `status` (String, enum: `["active", "inactive"]`, default: `active`)
- `timestamps` (createdAt, updatedAt)

---

## API Documentation

### Auth Routes (`/api/v1/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login to account
- `POST /logout` - Logout user
- `POST /refresh-token` - Refresh authentication token
- `GET /me` - Get current logged-in user profile

### User Routes (`/api/v1/users`)
- `GET /` - (Admin only) Get list of users

### Complaint Routes (`/api/v1/complaints`)
- `POST /` - (Resident only) Create a new complaint (multipart/form-data for image)
- `GET /` - (Resident only) Get all complaints created by the logged-in user
- `GET /:id` - Get a specific complaint by ID (with its history)

### Admin Routes (`/api/v1/admin`)
- `GET /complaints` - Get all complaints with filters (`status`, `category`, `priority`, `isOverdue`, `startDate`, `endDate`). Sorts overdue complaints at the top.
- `PATCH /complaints/:id/status` - Update complaint status, priority, or add a remark. Creates a history record and sends an email.
- `GET /dashboard-stats` - Get counts for total complaints, overdue, grouped by category and status.

### Notice Routes (`/api/v1/notices`)
- `POST /` - (Admin only) Create a notice (multipart/form-data). Sends email broadcast to residents if `isImportant=true`.
- `GET /` - Fetch all active notices, sorting important ones to the top.
