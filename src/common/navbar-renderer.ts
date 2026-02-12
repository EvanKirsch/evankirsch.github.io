export class NavbarRenderer {

  renderNavbar() {
    const navbarNav = document.createElement("nav");
    navbarNav.id = "nav-bar";
    navbarNav.classList.add("navbar");
    navbarNav.classList.add("navbar-default");

    const navbarHeader = this.#buildNavbarHeader();
    const navbarNavUl = this.#buildNavbarNav();
    navbarNav.appendChild(navbarHeader);
    navbarNav.appendChild(navbarNavUl);
    (<HTMLDivElement> document.getElementById("main-body")).appendChild(navbarNav);
  }

  #buildNavbarHeader() : HTMLDivElement {
    const navbarHeader = document.createElement("div");
    navbarHeader.id = "nav-bar-header";
    navbarHeader.classList.add("navbar-header");
    const navbarBrand = document.createElement("a");
    navbarBrand.innerText = "Evan Kirsch";
    navbarBrand.href = "#";
    navbarHeader.appendChild(navbarBrand);
    return navbarHeader;
  }

  #buildNavbarNav() : HTMLUListElement {
    const navbarNav = document.createElement("ul");

    const home = this.#buildNavbarNavLi("Home");
    home.classList.add("active")
    navbarNav.appendChild(home);
    navbarNav.appendChild(this.#buildNavbarNavLi("Open Source Projects"));
    navbarNav.appendChild(this.#buildNavbarNavLi("Closed Source Projects"));
    navbarNav.appendChild(this.#buildNavbarNavLi("Community Development Projects"));
    navbarNav.appendChild(this.#buildNavbarNavLi("Notes"));

    return navbarNav;
  }

  #buildNavbarNavLi(innerText : string, href : string = "#") : HTMLLIElement {
    const navbarNavLi = document.createElement("li");
    const navbarNavLiA = document.createElement("a")
    navbarNavLiA.innerText = innerText;
    navbarNavLiA.href = href;

    navbarNavLi.appendChild(navbarNavLiA);
    return navbarNavLi; 
  }

}