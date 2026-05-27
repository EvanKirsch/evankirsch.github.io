import { WidgetInterface } from "./widget-interface";
import { PageManager } from "../pagination/page-manager";

export class HeroTaglineWidget implements WidgetInterface<void> {

  private taglines = [
    "Open Source Tinkerer",
    "Financial Services Developer",
    "Desktop Linux Evangelist",
  ];

  async renderOn(targetEltId: string): Promise<void> {
    const pageManager = PageManager.getInstance();
    const elt = await pageManager.getElementById(targetEltId);
    elt.appendChild(this.buildTagline());
  }

  private buildTagline(): HTMLElement {
    const p = document.createElement("p");
    p.classList.add("hero-tagline");

    this.taglines.forEach((text, i) => {
      const span = document.createElement("span");
      span.innerText = text;
      p.appendChild(span);

      if (i < this.taglines.length - 1) {
        const seperator = document.createElement("span");
        seperator.classList.add("hero-tagline-seperator");
        seperator.innerText = "·";
        p.appendChild(seperator);
      }
    });

    return p;
  }

}
