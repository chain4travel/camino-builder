/// <reference types="node" />
import { AxiosInstance } from 'axios';
import https from 'https';
export type ApiVersion = 'v1' | 'v2';
export declare abstract class BaseApiClient {
  private api;
  private version;
  private apiKey;
  private session;
  private apiSecret;
  private httpsAgent?;
  protected abstract getPoolId(): string;
  protected abstract getPoolClientId(): string;
  protected abstract getApiUrl(v: ApiVersion): string;
  constructor(params: { apiKey: string; apiSecret: string; httpsAgent?: https.Agent });
  protected init(v?: ApiVersion): Promise<AxiosInstance>;
  protected refresh(v?: ApiVersion): Promise<AxiosInstance>;
  protected apiCall<T>(fn: (api: AxiosInstance) => Promise<T>, v?: ApiVersion): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map
