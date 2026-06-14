import { WidgetInterface } from "./widget-interface";
import { PageManager } from "../pagination/page-manager";
import { GithubRepoApis } from "../api/github-repo-apis";

export class OpenSourceProjectWidget implements WidgetInterface<void> {

  private projects = [
    new _Project("coffee-ride", "Optimizes bike rides for maximum coffee stops using spring-boot for server services and nodejs, npm and vite for static site compilation"),
    new _Project("dmenu", "Personal fork of suckless's demenu with added patches."),
    new _Project("dotj", "Java Package for identifying cycles in graph files. Used by FMS project (closed source) to modularize monolith"),
    new _Project("evankirsch.github.io", "This website! Its compiled TS using nodejs, npm and vite"),
    new _Project("fs25-bank-account-interest", "FS25 bank account interest mod"),
    new _Project("fs25-nwt", "FS25 mod that adds a balance sheet and net worth tracker"),
    new _Project("fs25-stats-extended", "FS25 stats extended mod"),
    new _Project("github-langs-widget", "Language widget that calculates lanaguage by percent in public projects on GitHub"),
    new _Project("resume", "Full resume in laTeX to be compiled into smaller pdfs"),
    new _Project("sbsim", "Simple python sports book simulator"),
    new _Project("st", "Personal fork of suckless's st with added patches so it looks prettier"),
    new _Project("stamps", "Python script that uses easyocr to read first day cover catalogs"),
  ];

  async renderOn(targetEltId: string): Promise<void> {
    const pageManager = PageManager.getInstance();
    const osp = await pageManager.getElementById(targetEltId);

    const row = document.createElement("div");
    row.classList.add("row", "project-row");
    osp.appendChild(row);

    const api = new GithubRepoApis();
    await Promise.all(this.projects.map(async project => {
      const col = await this.buildProjectElement(project, api);
      row.appendChild(col);
    }));
  }

  private async buildProjectElement(project: _Project, api: GithubRepoApis): Promise<HTMLElement> {
    const col = document.createElement("div");
    col.classList.add("col-sm-6", "col-md-4");

    const panel = document.createElement("div");
    panel.classList.add("panel", "panel-default", "project-panel");

    // heading
    const heading = document.createElement("div");
    heading.classList.add("panel-heading");
    const link = document.createElement("a");
    link.href = "https://github.com/EvanKirsch/" + project.label;
    link.innerText = project.label;
    link.target = "_blank";
    heading.appendChild(link);

    // body
    const body = document.createElement("div");
    body.classList.add("panel-body");
    body.innerText = project.description;

    // footer with live GitHub data
    const footer = document.createElement("div");
    footer.classList.add("panel-footer");
    try {
      const { stars, language, license } = await api.getRepoMetadata(project.label);
      const starsSpan = document.createElement("span");
      starsSpan.innerText = `★ ${stars}`;
      footer.appendChild(starsSpan);
      if (language) {
        footer.append("  ·  ");
        const langBadge = document.createElement("span");
        langBadge.classList.add("label", "label-info");
        langBadge.innerText = language;
        footer.appendChild(langBadge);
      }
      if (license) {
        footer.append("  ·  ");
        const licenseBadge = document.createElement("span");
        licenseBadge.classList.add("label", "label-default");
        licenseBadge.innerText = license;
        footer.appendChild(licenseBadge);
      }
    } catch (e) {
      console.error(`Failed to load metadata for ${project.label}:`, e);
      footer.innerText = "";
    }

    panel.appendChild(heading);
    panel.appendChild(body);
    panel.appendChild(footer);
    col.appendChild(panel);
    return col;
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
