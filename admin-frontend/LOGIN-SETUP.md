# Admin Login Setup Guide

## Current Login Credentials

Based on your backend `.env` file, use these credentials:

```
Email: a@aa.co
Password: 123412
```

## How It Works

1. **Backend Authentication** (`backend/src/controllers/authController.js`)
   - Compares email and password directly with environment variables
   - No password hashing (simple comparison)
   - Generates JWT token on successful login

2. **Frontend Authentication** (`admin-frontend/app/contexts/AuthContext.tsx`)
   - Sends credentials to `/api/admin/login`
   - Stores JWT token in localStorage as `chakra_admin_token`
   - Uses token for all subsequent API requests

## Troubleshooting

### "Invalid credentials" Error

**Possible causes:**
1. Wrong email or password
2. Backend `.env` not loaded properly
3. Typo in credentials

**Solution:**
- Check backend `.env` file:
  ```
  ADMIN_EMAIL=a@aa.co
  ADMIN_PASSWORD=123412
  ```
- Restart backend server after changing `.env`
- Use exact credentials (case-sensitive)

### Backend Not Running

**Error:** Network error or connection refused

**Solution:**
```bash
cd backend
npm run dev
```

Backend should show:
```
Server running in development mode on port 5000
MongoDB Connected: ...
```

### CORS Error

**Error:** CORS policy blocked

**Solution:** Check backend `.env`:
```
ADMIN_FRONTEND_URL=http://localhost:3001
```

## Testing Login

### Method 1: Use the Login Page

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd admin-frontend && npm run dev`
3. Go to: http://localhost:3001/login
4. Enter credentials:
   - Email: `a@aa.co`
   - Password: `123412`

### Method 2: Test with curl

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"a@aa.co","password":"123412"}'
```

Should return:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

## Changing Admin Credentials

To change the admin credentials:

1. Edit `backend/.env`:
   ```
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=your-secure-password
   ```

2. Restart backend server:
   ```bash
   cd backend
   npm run dev
   ```

3. Use new credentials to login

## Security Notes

⚠️ **Important for Production:**

1. **Use Strong Password:** Change from `123412` to a strong password
2. **Secure JWT_SECRET:** Use a long random string (32+ characters)
3. **Enable HTTPS:** Use SSL/TLS in production
4. **Add Password Hashing:** Consider using bcrypt for password storage
5. **Add Rate Limiting:** Prevent brute force attacks
6. **Use Environment Variables:** Never commit `.env` to git

## Current Setup Status

✅ Backend API running on port 5000
✅ Frontend running on port 3001
✅ MongoDB connected
✅ JWT authentication configured
✅ CORS configured

## Quick Reference

| Item | Value |
|------|-------|
| Backend URL | http://localhost:5000 |
| Admin Frontend URL | http://localhost:3001 |
| Login Endpoint | POST /api/admin/login |
| Verify Endpoint | GET /api/admin/verify |
| Admin Email | a@aa.co |
| Admin Password | 123412 |
| Token Storage | localStorage (chakra_admin_token) |
| Token Expiry | 30 days |
