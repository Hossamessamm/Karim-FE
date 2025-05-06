# E-Learning Application

This is a modern e-learning platform built with React, TypeScript, and Tailwind CSS. 

## API Configuration

This application communicates with the API at `https://platform-test.runasp.net`. The registration endpoint is:

```
https://platform-test.runasp.net/api/Auth/register
```

### API Integration

The application has been configured to connect to the API with the following features:

1. **Direct API Connection**: The app connects directly to `https://platform-test.runasp.net`
2. **Development Proxy**: During development, you can use the proxy configuration in `setupProxy.js`
3. **CORS Handling**: CORS issues are handled through proper configuration and fallback solutions

For detailed information about handling CORS issues, see [CORS_SOLUTIONS.md](./CORS_SOLUTIONS.md).

## API Endpoints

- **Registration**: `POST /api/Auth/register`
  ```json
  {
    "academicYear": "<string>",
    "email": "<string>",
    "password": "<string>",
    "phoneNumber": "<string>",
    "userName": "<string>"
  }
  ```

- **Login**: `POST /api/Auth/login`
  ```json
  {
    "email": "<string>",
    "password": "<string>"
  }
  ```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Build for production:
   ```
   npm run build
   ```

## CORS Issues

If you encounter CORS issues when connecting to the API:

1. Try using the development proxy (enabled by default when running `npm start`)
2. Install a CORS browser extension for development
3. See [CORS_SOLUTIONS.md](./CORS_SOLUTIONS.md) for more detailed solutions

## Features

- User authentication (login/register)
- Course browsing and enrollment
- Video lessons and interactive quizzes
- Responsive design for all devices

## Technologies

- React
- TypeScript
- Tailwind CSS
- React Router
- Axios for API requests
