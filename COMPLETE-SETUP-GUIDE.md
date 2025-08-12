# Complete Setup Guide - Subscription Manager

## Step 1: Backend Setup
```bash
cd backend
npm install
node server.js
```

## Step 2: Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Step 3: Test the Application

### Backend Tests (http://localhost:3000):
- GET `/` - API status
- GET `/api/health` - Health check
- POST `/api/auth/login` - Login (email: test@test.com, password: password123)
- GET `/api/subscriptions` - View subscriptions (requires auth token)

### Frontend Tests (http://localhost:4200):
1. Login with: test@test.com / password123
2. View subscriptions list
3. Add new subscription
4. Edit/Delete subscriptions
5. Filter by status/plan name

## Step 4: Run Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests  
cd frontend && npm test
```

## Step 5: Production Build
```bash
# Frontend build
cd frontend && npm run build

# Backend production
cd backend && npm start
```

## Login Credentials:
- Email: test@test.com
- Password: password123

## Database Schema Created:
- users (id, email, password, phone, created_at)
- subscriptions (id, user_id, plan_name, status, price, start_date, end_date, created_at)

## Features Working:
✅ JWT Authentication
✅ CRUD Operations  
✅ Form Validation
✅ Error Handling
✅ Filtering
✅ Unit Tests