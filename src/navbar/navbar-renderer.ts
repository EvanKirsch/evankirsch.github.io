import { NavbarFunctions } from "./navbar-functions"
import { PageRenderer } from "../pages/page-renderer"
import { LanguageWidget } from "../pages/language-widget";

export class NavbarRenderer {

  private pages = [
    new _Page("Home", "./assets/pages/home.html"),
    new _Page("Open Source Projects", "./assets/pages/osp.html"),
    new _Page("Closed Source Projects", "./assets/pages/csp.html"),
    new _Page("Community Development Projects", "./assets/pages/cdp.html"),
    new _Page("Notes", "./assets/pages/notes.html", (e: PointerEvent) => { new LanguageWidget().renderLanguages(); })
  ];

  public renderNavbar() {
    const navbarNav = document.createElement("nav");
    navbarNav.id = "nav-bar";
    navbarNav.classList.add("navbar");
    navbarNav.classList.add("navbar-default");
    const navbarDiv = document.createElement("div")
    navbarDiv.classList.add("container-fluid")

    const navbarHeader = this.buildNavbarHeader();
    const navbarNavUl = this.buildNavbarUl();
    navbarNav.appendChild(navbarDiv);
    navbarDiv.appendChild(navbarHeader)
    navbarNav.appendChild(navbarNavUl);
    (<HTMLDivElement> document.getElementById("main-body")).appendChild(navbarNav);
  }

  private buildNavbarHeader() : HTMLDivElement {
    const navbarHeader = document.createElement("div");
    navbarHeader.id = "nav-bar-header";
    navbarHeader.classList.add("navbar-header");
    const navbarBrand = document.createElement("a");
    navbarBrand.innerText = "EvanKirsch.org";
    navbarBrand.href = "https://github.com/EvanKirsch";
    navbarBrand.classList.add("navbar-brand")
    navbarHeader.appendChild(navbarBrand);
    return navbarHeader;
  }

  private buildNavbarUl() : HTMLUListElement {
    const navbarUl = document.createElement("ul");
    navbarUl.classList.add("nav");
    navbarUl.classList.add("navbar-nav");

    let curPage;
    for(let i = 0; i < this.pages.length; i++) {
      curPage = this.pages[i]

      if (curPage != null) {
        let elt = navbarUl.appendChild(this.buildNavbarNavLi(curPage.label, curPage.file))
        elt.addEventListener('click', curPage.hook);

        // activate and render 0th page
        if (i == 0) {
          elt.classList.add("active");
          (new PageRenderer()).renderPage(curPage.file);
        }
      }
    }

    return navbarUl;
  }

  private buildNavbarNavLi(innerText : string, filepath : string = "", href : string = "#") : HTMLLIElement {
    const navbarNavLi = document.createElement("li");
    navbarNavLi.setAttribute("data-filepath", filepath)
    navbarNavLi.addEventListener('click', (event : PointerEvent) => {
      NavbarFunctions.onLiClick(event);
    });
    const navbarNavLiA = document.createElement("a")
    navbarNavLiA.innerText = innerText;
    navbarNavLiA.href = href;

    navbarNavLi.appendChild(navbarNavLiA);
    return navbarNavLi; 
  }

}

class _Page {
  label : string;
  file : string;
  hook : any;

  constructor(label : string, file: string, hook: any = (e : PointerEvent) => {}) {
    this.label = label;
    this.file = file;
    this.hook = hook;
  }
}