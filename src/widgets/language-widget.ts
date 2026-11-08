import { GithubRepoApis } from "../api/github-repo-apis"
import { WidgetInterface } from "./widget-interface";
import { PageManager } from "../pagination/page-manager";
import { getLanguageColor } from "./language-colors";

export class LanguageWidget implements WidgetInterface<void> {

  public async renderOn(targetEltId : string) {
    const gApi = new GithubRepoApis();
    const pageManager = PageManager.getInstance();
    const langElt = await pageManager.getElementById(targetEltId);

    try {
      const myLanguages = await gApi.getPersonalLanguages();
      langElt.innerText = "";
      langElt.appendChild(this.buildLanguageWidget(myLanguages));
    } catch (e) {
      console.error("Failed to load language data:", e);
      langElt.previousElementSibling?.setAttribute("style", "display: none");
      langElt.setAttribute("style", "display: none");
    }
  }

  private buildLanguageWidget(myLanguages : Map<String, number>) : HTMLElement {
    const sortedLanguages = new Map([...myLanguages.entries()].sort((a, b) => b[1] - a[1])); // sort high to low
    let totalSize = 0;
    myLanguages.values().forEach(elt => totalSize = totalSize + elt);

    const widget = document.createElement("div");
    widget.classList.add("lang-widget");

    const list = document.createElement("ul");
    list.classList.add("lang-list");

    let c = 0;
    sortedLanguages.forEach((v, k) => {
      const name = k.toString();
      const percent = (100 * (v/totalSize)).toFixed(2).toString() + "%";
      const color = getLanguageColor(name, c);
      c++;

      list.appendChild(this.buildLanguageRow(c, name, percent, color));
    });

    widget.appendChild(list);

    return widget;
  }

  private buildLanguageRow(rank : number, name : string, percent : string, color : string) : HTMLElement {
    const row = document.createElement("li");
    row.classList.add("lang-row");

    const rankElt = document.createElement("span");
    rankElt.classList.add("lang-rank");
    rankElt.innerText = rank.toString();

    const dot = document.createElement("span");
    dot.classList.add("lang-dot");
    dot.style.backgroundColor = color;

    const nameElt = document.createElement("span");
    nameElt.classList.add("lang-name");
    nameElt.innerText = name;

    const track = document.createElement("span");
    track.classList.add("lang-track");
    const fill = document.createElement("span");
    fill.classList.add("lang-fill");
    fill.style.width = percent;
    fill.style.backgroundColor = color;
    track.appendChild(fill);

    const percentElt = document.createElement("span");
    percentElt.classList.add("lang-percent");
    percentElt.innerText = percent;

    row.appendChild(rankElt);
    row.appendChild(dot);
    row.appendChild(nameElt);
    row.appendChild(track);
    row.appendChild(percentElt);

    return row;
  }

}
