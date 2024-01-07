'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BaseAutotaskClient = void 0;
const lambda_1 = __importDefault(require('aws-sdk/clients/lambda'));
const rate_limit_1 = require('../utils/rate-limit');
const time_1 = require('../utils/time');
// do our best to get .errorMessage, but return object by default
function cleanError(payload) {
  if (!payload) {
    return 'Error occurred, but error payload was not defined';
  }
  try {
    const errMsg = JSON.parse(payload.toString()).errorMessage;
    if (errMsg) {
      return errMsg;
    }
  } catch (e) {}
  return payload;
}
class BaseAutotaskClient {
  constructor(credentials, arn) {
    this.arn = arn;
    const creds = credentials ? JSON.parse(credentials) : undefined;
    this.invocationRateLimit = rate_limit_1.rateLimitModule.createCounterFor(arn, 300);
    this.lambda = new lambda_1.default(
      creds
        ? {
            credentials: {
              accessKeyId: creds.AccessKeyId,
              secretAccessKey: creds.SecretAccessKey,
              sessionToken: creds.SessionToken,
            },
          }
        : undefined,
    );
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async execute(request) {
    const invocationTimeStamp = (0, time_1.getTimestampInSeconds)();
    this.invocationRateLimit.checkRateFor(invocationTimeStamp);
    this.invocationRateLimit.incrementRateFor(invocationTimeStamp);
    const invocationRequestResult = await this.lambda
      .invoke({
        FunctionName: this.arn,
        Payload: JSON.stringify(request),
        InvocationType: 'RequestResponse',
      })
      .promise();
    if (invocationRequestResult.FunctionError) {
      throw new Error(`Error while attempting request: ${cleanError(invocationRequestResult.Payload)}`);
    }
    return JSON.parse(invocationRequestResult.Payload);
  }
}
exports.BaseAutotaskClient = BaseAutotaskClient;
