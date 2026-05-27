import { WidgetInterface } from "./widget-interface";
import { PageManager } from "../pagination/page-manager";

export class SocialsWidget implements WidgetInterface<void> {

  private socials: _Social[] = [
    // new _Social("My GitHub", "https://github.com/EvanKirsch" ),
    new _Social("My Dotfiles", "https://github.com/EvanKirsch/dotfiles"),
    new _Social("My Resume", "/assets/evankirsch.pdf", "EvanKirsch_Resume.pdf"),
    // new _Social("kirsch.j.evan@gmail.com", "mailto:kirsch.j.evan+mailto@gmail.com"),
  ];

  async renderOn(targetEltId: string): Promise<void> {
    const pageManager = PageManager.getInstance();
    const elt = await pageManager.getElementById(targetEltId);
    elt.appendChild(this.buildSocialList());
  }

  private buildSocialList(): HTMLUListElement {
    const ul = document.createElement("ul");

    this.socials.forEach(social => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = social.href;
      a.innerText = social.label;
      if (social.download) {
        a.download = social.download;
      }
      li.appendChild(a);
      ul.appendChild(li);
    });

    return ul;
  }


}

class _Social {
  label: string;
  href: string;
  download: string | null;

  constructor(label: string, href: string, download: string | null = null) {
    this.label = label;
    this.href = href;
    this.download = download;
  }
}
