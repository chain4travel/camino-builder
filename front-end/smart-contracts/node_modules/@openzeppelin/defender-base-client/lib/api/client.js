'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BaseApiClient = void 0;
const api_1 = require('./api');
const auth_1 = require('./auth');
class BaseApiClient {
  constructor(params) {
    if (!params.apiKey) throw new Error(`API key is required`);
    if (!params.apiSecret) throw new Error(`API secret is required`);
    this.apiKey = params.apiKey;
    this.apiSecret = params.apiSecret;
    this.httpsAgent = params.httpsAgent;
  }
  async init(v = 'v1') {
    if (!this.api || this.version !== v) {
      const userPass = { Username: this.apiKey, Password: this.apiSecret };
      const poolData = { UserPoolId: this.getPoolId(), ClientId: this.getPoolClientId() };
      this.session = await (0, auth_1.authenticate)(userPass, poolData);
      this.api = (0, api_1.createAuthenticatedApi)(userPass.Username, this.session, this.getApiUrl(v), this.httpsAgent);
      this.version = v;
    }
    return this.api;
  }
  async refresh(v = 'v1') {
    if (!this.session) {
      return this.init(v);
    }
    try {
      const userPass = { Username: this.apiKey, Password: this.apiSecret };
      const poolData = { UserPoolId: this.getPoolId(), ClientId: this.getPoolClientId() };
      this.session = await (0, auth_1.refreshSession)(userPass, poolData, this.session);
      this.api = (0, api_1.createAuthenticatedApi)(userPass.Username, this.session, this.getApiUrl(v), this.httpsAgent);
      return this.api;
    } catch (e) {
      return this.init(v);
    }
  }
  async apiCall(fn, v = 'v1') {
    const api = await this.init(v);
    try {
      return await fn(api);
    } catch (error) {
      // this means ID token has expired so we'll recreate session and try again
      if (error.response && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
        this.api = undefined;
        const api = await this.refresh(v);
        return await fn(api);
      }
      throw error;
    }
  }
}
exports.BaseApiClient = BaseApiClient;
