import { GithubRepoApis } from "../api/github-repo-apis"

export class LanguageWidget {

  public async renderLanguages() {
    const gApi = new GithubRepoApis();
    const myLanguages = await gApi.getPersonalLanguages();

    const langElt = await this._getElementById("programming-languages");
    if (langElt != null) {
      langElt.appendChild(this.buildLanguageWidget(myLanguages));
    }
  }

  private buildLanguageWidget(myLanguages : Map<String, number>) : HTMLElement {
    const sortedLanguages = new Map([...myLanguages.entries()].sort((a, b) => b[1] - a[1])); // sort high to low
    let totalSize = 0; 
    myLanguages.values().forEach(elt => totalSize = totalSize + elt);
    let widget = document.createElement("ol");
    widget.classList.add("list-group");
    widget.classList.add("list-group-flush")

    sortedLanguages.forEach((v, k) => {
      let langEntry = document.createElement("li");
      langEntry.classList.add("list-group-item")
      langEntry.innerText = k + ": " + (100 * (v/totalSize)).toFixed(2).toString() + "%";
      widget.appendChild(langEntry);
    });
    return widget;
  }

  async _getElementById(id : string) : Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const elt = document.getElementById("programming-languages");
        if (!!elt) {
          resolve(elt);
        } else {
          reject("Failed to find element: " + id);
        }
      }, 100);
    });
  }

}