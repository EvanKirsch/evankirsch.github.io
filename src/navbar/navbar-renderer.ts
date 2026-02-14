import { NavbarFunctions } from "./navbar-functions"
import { PageRenderer } from "../pages/page-renderer"

export class NavbarRenderer {

  renderNavbar() {
    const navbarNav = document.createElement("nav");
    navbarNav.id = "nav-bar";
    navbarNav.classList.add("navbar");
    navbarNav.classList.add("navbar-default");
    const navbarDiv = document.createElement("div")
    navbarDiv.classList.add("container-fluid")

    const navbarHeader = this.#buildNavbarHeader();
    const navbarNavUl = this.#buildNavbarUl();
    navbarNav.appendChild(navbarDiv);
    navbarDiv.appendChild(navbarHeader)
    navbarNav.appendChild(navbarNavUl);
    (<HTMLDivElement> document.getElementById("main-body")).appendChild(navbarNav);
  }

  #buildNavbarHeader() : HTMLDivElement {
    const navbarHeader = document.createElement("div");
    navbarHeader.id = "nav-bar-header";
    navbarHeader.classList.add("navbar-header");
    const navbarBrand = document.createElement("a");
    navbarBrand.innerText = "Evan Kirsch";
    navbarBrand.href = "https://github.com/EvanKirsch";
    navbarBrand.classList.add("navbar-brand")
    navbarHeader.appendChild(navbarBrand);
    return navbarHeader;
  }

  #buildNavbarUl() : HTMLUListElement {
    const navbarUl = document.createElement("ul");
    navbarUl.classList.add("nav");
    navbarUl.classList.add("navbar-nav");

    const home = this.#buildNavbarNavLi("Home", "./assets/pages/home.html");
    home.classList.add("active");
    (new PageRenderer()).renderPage("./assets/pages/home.html")
    navbarUl.appendChild(home);
    navbarUl.appendChild(this.#buildNavbarNavLi("Open Source Projects", "./assets/pages/osp.html"));
    navbarUl.appendChild(this.#buildNavbarNavLi("Closed Source Projects", "./assets/pages/csp.html"));
    navbarUl.appendChild(this.#buildNavbarNavLi("Community Development Projects", "./assets/pages/cdp.html"));
    navbarUl.appendChild(this.#buildNavbarNavLi("Notes", "./assets/pages/notes.html"));

    return navbarUl;
  }

  #buildNavbarNavLi(innerText : string, filepath : string = "", href : string = "#") : HTMLLIElement {
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