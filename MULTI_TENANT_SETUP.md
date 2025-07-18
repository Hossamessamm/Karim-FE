# Multi-Tenant Setup Documentation

This application has been configured to support multi-tenant architecture by automatically adding the `X-Tenant-ID` header to all API requests.

## Configuration

### Default Tenant ID
The default tenant ID is set to `tenant3` as requested. This is configured in `src/config/tenant.ts`.

### Environment Variable Override
You can override the tenant ID by setting the `REACT_APP_TENANT_ID` environment variable:

```bash
# In .env file
REACT_APP_TENANT_ID=your_tenant_id
```

```bash
# Or when building
REACT_APP_TENANT_ID=production_tenant npm run build
```

## Implementation Details

### Files Modified

1. **`src/config/tenant.ts`** - New centralized tenant configuration
   - Provides `getTenantId()` and `getTenantHeaders()` functions
   - Supports environment variable override
   - Default tenant ID: `tenant3`

2. **`src/services/api.ts`** - Main API service
   - Added tenant headers to request interceptor
   - Updated refresh token calls to include tenant header

3. **`src/hooks/useCourseApi.ts`** - Course API hook
   - Added tenant headers to axios interceptor
   - Updated direct axios calls

4. **`src/services/courseService.ts`** - Course service
   - Added tenant headers to direct axios calls

5. **`src/services/enrollmentService.ts`** - Enrollment service
   - Added tenant headers to enrollment check calls

### How It Works

All API requests now automatically include the `X-Tenant-ID` header with the value `tenant3` (or your configured tenant ID).

#### Automatic Header Injection
The tenant header is automatically added through:
- **Axios Request Interceptors**: For services using the main `api` instance
- **Direct Header Addition**: For services making direct axios calls

#### Examples of Requests
```http
GET /api/Course/active
X-Tenant-ID: tenant3
Authorization: Bearer <token>
```

```http
POST /api/Auth/login
X-Tenant-ID: tenant3
Content-Type: application/json
```

## Testing

### Test Component
A test component has been created at `src/components/test/TenantHeaderTest.tsx` to verify the implementation.

### How to Test
1. Navigate to the refresh token test page (usually `/test` or access through development)
2. Open browser Developer Tools (F12)
3. Go to Network tab
4. Click the test buttons in the "Tenant Header Test" section
5. Check the request headers for `X-Tenant-ID: tenant3`

### What to Verify
- All API requests should include the `X-Tenant-ID` header
- The header value should be `tenant3` (or your configured value)
- Login, course fetching, and other API calls should all include the header

## Changing Tenant ID

### For Development
Update the `DEFAULT_TENANT_ID` constant in `src/config/tenant.ts`:

```typescript
const DEFAULT_TENANT_ID = 'your_new_tenant_id';
```

### For Production
Set the environment variable when building:

```bash
REACT_APP_TENANT_ID=production_tenant npm run build
```

### For Different Environments
Create environment-specific `.env` files:

```bash
# .env.development
REACT_APP_TENANT_ID=dev_tenant

# .env.production
REACT_APP_TENANT_ID=prod_tenant

# .env.staging
REACT_APP_TENANT_ID=staging_tenant
```

## API Backend Requirements

Your backend API should be configured to:
1. Accept and process the `X-Tenant-ID` header
2. Route requests to the appropriate tenant database/schema
3. Validate tenant access permissions
4. Handle tenant-specific business logic

## Troubleshooting

### Header Not Appearing
1. Check that the tenant configuration is properly imported
2. Verify the axios interceptor is set up correctly
3. Ensure the service is using the correct axios instance

### Wrong Tenant ID
1. Check environment variables
2. Verify the `src/config/tenant.ts` configuration
3. Clear browser cache and rebuild

### CORS Issues
If you encounter CORS issues after adding the header:
1. Ensure your backend allows the `X-Tenant-ID` header
2. Update CORS configuration to include custom headers
3. Check the backend's `Access-Control-Allow-Headers` setting

## Best Practices

1. **Centralized Configuration**: All tenant configuration is in one place
2. **Environment Flexibility**: Easy to change tenant ID per environment
3. **Automatic Application**: Headers added automatically, no manual intervention needed
4. **Consistent Implementation**: All API calls use the same header injection method
5. **Testing Support**: Built-in test component for verification 