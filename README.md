# Backend Environment Variables

This document describes the environment variables used by the CAPTCHA backend.

## Configuration

### NODE_ENV
- **Type**: String
- **Default**: `development`
- **Required**: No
- **Description**: Sets the Node.js environment mode
- **Values**: `development`, `production`, `test`

### PORT
- **Type**: Number
- **Default**: `3000`
- **Required**: No
- **Description**: Port on which the server will listen
- **Production**: Render automatically sets this to `10000`

### ALLOWED_ORIGINS
- **Type**: String (comma-separated)
- **Default**: `http://localhost:5173,http://localhost:3000`
- **Required**: Yes (for production)
- **Description**: Comma-separated list of allowed CORS origins
- **Example**: `https://your-app.vercel.app,https://your-custom-domain.com`

## Development Setup

For local development, you can create a `.env` file in the `backend` directory:

```env
NODE_ENV=development
PORT=3000
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## Production Setup (Render)

Set these environment variables in the Render dashboard:

1. Go to your web service
2. Navigate to "Environment" tab
3. Add the following variables:

```
NODE_ENV=production
PORT=10000
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

> **Important**: Update `ALLOWED_ORIGINS` with your actual Vercel frontend URL after deployment.

## Security Notes

- Never commit `.env` files to version control
- Keep `ALLOWED_ORIGINS` as restrictive as possible
- Only add trusted domains to `ALLOWED_ORIGINS`
- In production, avoid using wildcards (`*`) for CORS origins
