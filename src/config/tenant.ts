// Tenant configuration for multi-tenant support
export interface TenantConfig {
  tenantId: string;
  domain?: string;
}

// Default tenant configuration
const DEFAULT_TENANT_ID = 'tenant3';

// Get tenant configuration from environment variables or use default
const getTenantConfig = (): TenantConfig => {
  // In the future, this could be read from environment variables or URL
  // For now, using the hardcoded value as requested
  const tenantId = process.env.REACT_APP_TENANT_ID || DEFAULT_TENANT_ID;
  
  return {
    tenantId,
    domain: window.location.hostname
  };
};

// Export the tenant configuration
export const tenantConfig = getTenantConfig();

// Helper function to get tenant ID for API requests
export const getTenantId = (): string => {
  return tenantConfig.tenantId;
};

// Helper function to get tenant headers for API requests
export const getTenantHeaders = (): Record<string, string> => {
  return {
    'X-Tenant-ID': getTenantId()
  };
};

export default tenantConfig; 