export declare abstract class BaseAutotaskClient {
  private arn;
  private lambda;
  private invocationRateLimit;
  constructor(credentials: string, arn: string);
  protected execute<T>(request: object): Promise<T>;
}
//# sourceMappingURL=index.d.ts.map
