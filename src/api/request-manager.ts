export class RequestManager {

  private static readonly STORAGE_PREFIX = "request-cache:";
  private static readonly TTL_MS = 60 * 60 * 1000; // 1 hour

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

    const stored = this.readStored(url);
    if (stored !== undefined) {
      this.cache.set(url, stored);
      return stored;
    }

    const result = await requstFunc.call(funcObj, url);
    this.cache.set(url, result);
    this.writeStored(url, result);
    return result;
  }

  private readStored(url: string): any | undefined {
    const key = RequestManager.STORAGE_PREFIX + url;
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        return undefined;
      }

      const entry = JSON.parse(raw);
      if (typeof entry?.storedAt !== "number" || Date.now() - entry.storedAt > RequestManager.TTL_MS) {
        localStorage.removeItem(key);
        return undefined;
      }

      return entry.value;
    } catch {
      return undefined;
    }
  }

  private writeStored(url: string, value: any): void {
    try {
      localStorage.setItem(
        RequestManager.STORAGE_PREFIX + url,
        JSON.stringify({ storedAt: Date.now(), value: { data: value?.data } })
      );
    } catch {
      // storage unavailable or full; the in-memory cache still applies
    }
  }

}
