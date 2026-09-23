import { WidgetInterface } from "./widget-interface";
import { PageManager } from "../pagination/page-manager";

export class CommunityResourceWidget implements WidgetInterface<void> {

  private resources = [
    new _Resource("clcillinois", "https://github.com/EvanKirsch/clcillinois", "Tutoring resources for tutoring at the College of Lake County."),
    new _Resource("lakeshore linux", "https://lakeshorelinux.org/", "Lakeshore Linux Users Group. Great for all kinds of computer nerds in south-east Wisconsin."),
    new _Resource("mitobyte", "https://mitobyte.com/", "I highly recommend this organization for grassroots developers in the Milwaukee area. Their Code and Brews events are social and attended by individuals across the industry. The Code and Coffee is less social and more of a coworking environment."),
    new _Resource("mke-tech", "https://www.mketech.org/", "If you are more interested in a startup/business focused space mke-tech is a great organization. They offer a \"FOR-M\" program to help startups in the Milwaukee area."),
  ];

  async renderOn(targetEltId: string): Promise<void> {
    const pageManager = PageManager.getInstance();
    const cdp = await pageManager.getElementById(targetEltId);

    const row = document.createElement("div");
    row.classList.add("row", "project-row");
    cdp.appendChild(row);

    this.resources.forEach(resource => {
      const col = document.createElement("div");
      col.classList.add("col-sm-6", "col-md-4");

      const panel = document.createElement("div");
      panel.classList.add("panel", "panel-default", "project-panel");

      const heading = document.createElement("div");
      heading.classList.add("panel-heading");
      const link = document.createElement("a");
      link.href = resource.href;
      link.innerText = resource.label;
      link.target = "_blank";
      heading.appendChild(link);

      const body = document.createElement("div");
      body.classList.add("panel-body");
      body.innerText = resource.description;

      panel.appendChild(heading);
      panel.appendChild(body);
      col.appendChild(panel);
      row.appendChild(col);
    });
  }

}

class _Resource {
  label: string;
  href: string;
  description: string;

  constructor(label: string, href: string, description: string) {
    this.label = label;
    this.href = href;
    this.description = description;
  }
}
