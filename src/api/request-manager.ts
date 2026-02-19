export class RequestManager {

  private static manager: RequestManager;
  private cache: Map<String, any>;

  private constructor() {
    this.cache = new Map<String, any>();
  }

  public static getInstance() {
    if (!!RequestManager.manager) {
      return RequestManager.manager;
    }

    RequestManager.manager = new RequestManager();
    return RequestManager.manager;
  }

  public async request(url: string, requstFunc: Function, funcObj: any): Promise<any> {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    const result = await requstFunc.call(funcObj, url);
    this.cache.set(url, result);
    return result;
  }

}