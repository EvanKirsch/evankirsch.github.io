import { WidgetInterface } from "./widget-interface";
import { PageManager } from "../pagination/page-manager";

export class HomeSummaryWidget implements WidgetInterface<void> {

  async renderOn(targetEltId: string): Promise<void> {
    const pageManager = PageManager.getInstance();
    const elt = await pageManager.getElementById(targetEltId);
    elt.appendChild(this.buildSummary());
  }

  private buildSummary(): HTMLParagraphElement {
    const p = document.createElement("p");
    p.classList.add("home-summary");

    const coffeeRideLink = document.createElement("a");
    coffeeRideLink.href = "https://coffeeride.io";
    coffeeRideLink.innerText = "coffeeride.io";

    p.append(
      "Working in SE Wisconsin and attending grad school at UWM. " +
      "My current passion project is ",
      coffeeRideLink,
      ". Looking to continue working on whimsical projects and " +
      "get involved in grassroots software in order to give back to SE Wisconsin."
    );

    return p;
  }

}
