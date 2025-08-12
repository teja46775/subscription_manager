# Subscription Manager

A full-stack application for managing user subscriptions with Angular frontend and Node.js backend.

## Tech Stack

- **Frontend**: Angular with Reactive Forms
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: JWT-based
- **Testing**: Jest (Backend), Jasmine/Karma (Frontend)

## Features

- JWT-based authentication (Login/Logout)
- CRUD operations for subscriptions
- Filterable subscription tables
- Form validation for email and phone
- Error handling and logging
- Unit tests

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database:
   - Create a database named `subscription_manager`
   - Update database credentials in `config/database.js` if needed

4. Start the server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:4200`

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Subscriptions
- `GET /api/subscriptions` - Get all subscriptions (with filtering)
- `POST /api/subscriptions` - Create subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Delete subscription

## Usage

1. Register a new user or login with existing credentials
2. View all subscriptions in the dashboard
3. Filter subscriptions by status or plan name
4. Add new subscriptions using the form
5. Edit or delete existing subscriptions

## Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- phone
- created_at

### Subscriptions Table
- id (Primary Key)
- user_id (Foreign Key)
- plan_name
- status (active/inactive/cancelled)
- price
- start_date
- end_date
- created_at