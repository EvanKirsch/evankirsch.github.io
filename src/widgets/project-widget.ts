import { WidgetInterface } from "./widget-interface";
import { PageManager } from "../pagination/page-manager";

export class ProjectWidget implements WidgetInterface<void> {

  private projects = [
    new _Project("coffee-ride", "Optimizes bike rides for maximum coffee stops using spring-boot for server services and nodejs, npm and vite for static site compilation"),
    new _Project("dmenu", "Personal fork of suckless's demenu with added patches."),
    new _Project("dotj", "Java Package for identifying cycles in graph files. Used by FMS project (closed source) to modularize monolith"),
    new _Project("evankirsch.github.io", "This website! Its compiled TS using nodejs, npm and vite"),
    new _Project("fs25-bank-account-interest", "FS25 bank account interest mod"),
    new _Project("fs25-nwt", "FS25 mod that adds a balance sheet and net worth tracker"),
    new _Project("fs25-stats-extended", "FS25 stats exteneded mod"),
    new _Project("sbsim", "Simple python sports book simulator"),
    new _Project("st", "Personal fork of suckless's st with added patches so it looks prettier"),
    new _Project("stamps", "Python script that uses easyocr to read first day cover catalogs"),
  ];

  async renderOn(targetEltId : string): Promise<void> {
    const pageManager = PageManager.getInstance();
    const osp = await pageManager.getElementById(targetEltId);

    this.projects.forEach(elt => {
      osp.appendChild(this.buildProjectElement(elt))
    })
  
  }

  private buildProjectElement(project : _Project) : HTMLElement {

    const a = document.createElement("a");
    a.href = "https://github.com/EvanKirsch/" + project.label;
    a.innerText = project.label;

    const p = document.createElement("p");
    p.appendChild(a);
    p.append(" - ");
    p.append(project.description);

    return p;
  }

}

class _Project {
  label : string;
  description: string;

  constructor(label : string, description: string) {
    this.label = label;
    this.description = description;
  }

}