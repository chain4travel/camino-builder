/// <reference types="node" />
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { AxiosError, AxiosInstance } from 'axios';
import https from 'https';
export declare function rejectWithDefenderApiError(axiosError: AxiosError): Promise<never>;
export declare function createApi(key: string, token: string, apiUrl: string, httpsAgent?: https.Agent): AxiosInstance;
export declare function createAuthenticatedApi(
  username: string,
  session: CognitoUserSession,
  apiUrl: string,
  httpsAgent?: https.Agent,
): AxiosInstance;
//# sourceMappingURL=api.d.ts.map
