import { WidgetInterface } from "./widget-interface";
import { PageManager } from "../pagination/page-manager";

export class ClosedSourceProjectWidget implements WidgetInterface<void> {

  private projects = [
    new _Project("FMS", "J2EE payment processing system"),
    new _Project("PolicyCenter", "Ubiquitous policy admin system for P&C insurance from Guidewire"),
    new _Project("Authenticaion", "Homegrown J2EE authentication system for policy admin systems "),
    new _Project("DocGen", "Spring-Boot document generation service for P&C insurance documents"),
    new _Project("wotd", "Static personal home webpage"),
  ];

  async renderOn(targetEltId: string): Promise<void> {
    const pageManager = PageManager.getInstance();
    const csp = await pageManager.getElementById(targetEltId);

    const row = document.createElement("div");
    row.classList.add("row", "project-row");
    csp.appendChild(row);

    this.projects.forEach(project => {
      const col = document.createElement("div");
      col.classList.add("col-sm-6", "col-md-4");

      const panel = document.createElement("div");
      panel.classList.add("panel", "panel-default", "project-panel");

      const heading = document.createElement("div");
      heading.classList.add("panel-heading");
      heading.innerText = project.label;

      const body = document.createElement("div");
      body.classList.add("panel-body");
      body.innerText = project.description;

      const footer = document.createElement("div");
      footer.classList.add("panel-footer");
      const badge = document.createElement("span");
      badge.classList.add("label", "label-default");
      badge.innerText = "Closed Source";
      footer.appendChild(badge);

      panel.appendChild(heading);
      panel.appendChild(body);
      panel.appendChild(footer);
      col.appendChild(panel);
      row.appendChild(col);
    });
  }

}

class _Project {
  label: string;
  description: string;

  constructor(label: string, description: string) {
    this.label = label;
    this.description = description;
  }
}
