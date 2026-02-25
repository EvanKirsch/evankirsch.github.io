export class PageManager {

  private static manager: PageManager;

  private constructor() {
  }

  public static getInstance() {
    if (!!PageManager.manager) {
      return PageManager.manager;
    }

    PageManager.manager = new PageManager();
    return PageManager.manager;
  }

  public async getElementById(id : string) : Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const elt = document.getElementById(id);
        if (!!elt) {
          resolve(elt);
        } else {
          reject("Failed to find element: " + id);
        }
      }, 100);
    });
  }

}