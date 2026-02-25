import { GithubRepoApis } from "../api/github-repo-apis"
import { WidgetInterface } from "./widget-interface";
import { PageManager } from "../pages/page-manager";

export class LanguageWidget implements WidgetInterface<void> {

  public async renderOn(targetEltId : string) {
    const gApi = new GithubRepoApis();
    const pageManager = PageManager.getInstance();
    const langElt = await pageManager.getElementById(targetEltId);

    langElt.innerText = "..."
    const myLanguages = await gApi.getPersonalLanguages();
    langElt.innerText = ""

    if (langElt != null) {
      langElt.appendChild(this.buildLanguageWidget(myLanguages));
    }
  }

  private buildLanguageWidget(myLanguages : Map<String, number>) : HTMLElement {
    const sortedLanguages = new Map([...myLanguages.entries()].sort((a, b) => b[1] - a[1])); // sort high to low
    let totalSize = 0; 
    myLanguages.values().forEach(elt => totalSize = totalSize + elt);
    let widget = document.createElement("table");
    widget.classList.add("table")
    let body = document.createElement("tbody");

    widget.appendChild(this.buildHeaders());
    widget.appendChild(body)

    let c = 1; // counter for rank
    sortedLanguages.forEach((v, k) => {
      let langEntry = document.createElement("tr");

      let th = document.createElement("th");
      let tdLang = document.createElement("td");
      let tdPerc = document.createElement("td");

      th.scope = "row";
      tdPerc.classList.add("text-right")

      th.innerText = c.toString();
      c++;
      tdLang.innerText = k.toString();
      tdPerc.innerText = (100 * (v/totalSize)).toFixed(2).toString() + "%";

      langEntry.appendChild(th);
      langEntry.appendChild(tdLang);
      langEntry.appendChild(tdPerc);

      body.appendChild(langEntry);
    });

    return widget;
  }

  private buildHeaders() : HTMLElement {
    const thead = document.createElement("thead"); 
    const tr = document.createElement("tr")

    const rank = document.createElement("th");
    const lang =  document.createElement("th");
    const percent = document.createElement("th");

    rank.scope = "col";
    lang.scope = "col";
    percent.scope = "col";

    rank.innerText = "#";
    lang.innerText = "Language";
    percent.innerText = "Percent";

    percent.classList.add("text-right")

    tr.appendChild(rank);
    tr.appendChild(lang);
    tr.appendChild(percent);

    thead.appendChild(tr);

    return thead;
  }

}