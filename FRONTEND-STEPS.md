# Frontend Testing Steps

## Method 1: HTML Test Page (Immediate Testing)

1. **Start Backend Server:**
   ```bash
   cd backend
   node server.js
   ```

2. **Open Test Page:**
   - Open `frontend/test.html` in browser
   - Test login with: test@test.com / password123
   - Test API endpoints directly

## Method 2: Angular Setup (Full Application)

1. **Install Dependencies:**
   ```bash
   cd frontend
   npm install @angular/core @angular/common @angular/forms @angular/router @angular/platform-browser @angular/platform-browser-dynamic @angular/compiler rxjs zone.js typescript
   ```

2. **Start Angular Dev Server:**
   ```bash
   ng serve --port 4200
   ```

3. **Access Application:**
   - Visit: http://localhost:4200
   - Login: test@test.com / password123

## Method 3: Simple HTTP Testing

Use browser console or Postman:

```javascript
// Login
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email: 'test@test.com', password: 'password123'})
})

// Get Subscriptions (use token from login)
fetch('http://localhost:3000/api/subscriptions', {
  headers: {'Authorization': 'Bearer YOUR_TOKEN_HERE'}
})
```

## Quick Test Commands:

```bash
# Test backend health
curl http://localhost:3000/api/health

# Test login
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"password123\"}"
```