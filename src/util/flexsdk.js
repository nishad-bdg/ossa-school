import * as flexIntegrationSdk from 'sharetribe-flex-integration-sdk';

export const integrationSdk = flexIntegrationSdk.createInstance({
  clientId: process.env.REACT_APP_INTEGRATION_SDK_CLIENT_ID, 
  clientSecret: process.env.REACT_APP_INTEGRATION_SDK_CLIENT_SECRET,
  baseUrl: process.env.REACT_APP_FLEX_INTEGRATION_BASE_URL || 'https://flex-api.sharetribe.com'
});