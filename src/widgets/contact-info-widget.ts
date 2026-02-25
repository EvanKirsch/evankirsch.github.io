import { PageManager } from "../pagination/page-manager";
import { WidgetInterface } from "./widget-interface";

export class ContactInfoWidget implements WidgetInterface<void> {

  async renderOn(targetEltId : string) {
    const pageManager = PageManager.getInstance();
    const elt = await pageManager.getElementById(targetEltId);
    elt.appendChild(this.buildContactInfo())
  }

  private buildContactInfo() : HTMLElement {
    const p = document.createElement("p");
    p.innerText = "mailto: ";

    const a = document.createElement("a");
    a.innerText = "kirsch.j.evan@gmail.com";
    a.href = "mailto:kirsch.j.evan+mailto@gmail.com";

    p.appendChild(a);

    return p;
  }

}