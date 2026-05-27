import { PageRenderer } from "../pagination/page-renderer"
import { LanguageWidget } from "../widgets/language-widget";
import { ProjectWidget } from "../widgets/project-widget";
import { HeroTaglineWidget } from "../widgets/hero-tagline-widget";
import { HomeSummaryWidget } from "../widgets/home-summary-widget";
import { SocialsWidget } from "../widgets/socials-widget";

export class NavbarRenderer {

  private socials = [
    new _Social("GitHub", "fa-brands fa-github", "https://github.com/EvanKirsch"),
    new _Social("LinkedIn", "fa-brands fa-linkedin", "https://www.linkedin.com/in/kirsch-j-evan/"),
    new _Social("Instagram", "fa-brands fa-instagram", "https://www.instagram.com/evankirsch_birds/"),
    // new _Social("Lichess", "fa-solid fa-chess-knight", "https://lichess.org/@/Evan_Kirsch"),
    // new _Social("Strava", "fa-brands fa-strava", "https://www.strava.com/athletes/138548716"),
    // new _Social("eBird", "fa-solid fa-binoculars", "https://ebird.org/profile/MjM3MDAzNw/US"),
    new _Social("Email", "fa-solid fa-envelope", "mailto:kirsch.j.evan+mailto@gmail.com")
  ];

  private pages = [
    new _Page("Home", "./assets/pages/home.html", "home", () => {
      new HeroTaglineWidget().renderOn("hero-tagline");
      new HomeSummaryWidget().renderOn("home-summary");
      new SocialsWidget().renderOn("socials");
    }),
    new _Page("Open Source Projects", "./assets/pages/osp.html", "open-source-projects", () => { new ProjectWidget().renderOn("open-source-projects");}),
    new _Page("Closed Source Projects", "./assets/pages/csp.html", "closed-source-projects"),
    new _Page("Community Development Projects", "./assets/pages/cdp.html", "community-development-projects"),
    new _Page("Notes", "./assets/pages/notes.html", "notes", () => { new LanguageWidget().renderOn("programming-languages"); })
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

    window.addEventListener("hashchange", () => this.activatePageByHash(navbarNavUl));
  }

  private buildNavbarHeader() : HTMLDivElement {
    const navbarHeader = document.createElement("div");
    navbarHeader.id = "nav-bar-header";
    navbarHeader.classList.add("navbar-header");

    const navbarBrand = document.createElement("a");
    navbarBrand.innerText = "EvanKirsch.org";
    navbarBrand.href = "#home";
    navbarBrand.classList.add("navbar-brand");
    navbarHeader.appendChild(navbarBrand);

    const socialsContainer = document.createElement("div");
    socialsContainer.id = "navbar-socials";
    this.socials.forEach(social => {
      const a = document.createElement("a");
      a.href = social.href;
      a.target = "_blank";
      a.setAttribute("aria-label", social.label);
      a.classList.add("navbar-brand-social");
      const icon = document.createElement("i");
      icon.className = social.icon;
      a.appendChild(icon);
      socialsContainer.appendChild(a);
    });
    navbarHeader.appendChild(socialsContainer);

    return navbarHeader;
  }

  private buildNavbarUl() : HTMLUListElement {
    const navbarUl = document.createElement("ul");
    navbarUl.classList.add("nav");
    navbarUl.classList.add("navbar-nav");

    for(let i = 0; i < this.pages.length; i++) {
      const curPage = this.pages[i];
      if (curPage != null) {
        navbarUl.appendChild(this.buildNavbarNavLi(curPage.label, curPage.file, curPage.slug));
      }
    }

    const initialSlug = window.location.hash.replace("#", "") || this.pages[0]?.slug;
    window.location.hash = initialSlug ?? "";
    this.activatePageByHash(navbarUl);

    return navbarUl;
  }

  private async activatePageByHash(navbarUl: HTMLUListElement) {
    const slug = window.location.hash.replace("#", "");
    let pageIndex = this.pages.findIndex(p => p.slug === slug);
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const page = this.pages[pageIndex];
    navbarUl.querySelectorAll("li").forEach(li => li.classList.remove("active"));
    navbarUl.querySelectorAll("li")[pageIndex]?.classList.add("active");
    if(page !== undefined) {
      await new PageRenderer().renderPage(page.file);
      page.hook();
    }
  }

  private buildNavbarNavLi(innerText : string, filepath : string = "", slug : string = "") : HTMLLIElement {
    const navbarNavLi = document.createElement("li");
    navbarNavLi.setAttribute("data-filepath", filepath);
    const navbarNavLiA = document.createElement("a");
    navbarNavLiA.innerText = innerText;
    navbarNavLiA.href = `#${slug}`;
    navbarNavLi.appendChild(navbarNavLiA);
    return navbarNavLi;
  }

}

class _Page {
  label : string;
  file : string;
  slug : string;
  hook : () => void;

  constructor(label : string, file: string, slug: string, hook: () => void = () => {}) {
    this.label = label;
    this.file = file;
    this.slug = slug;
    this.hook = hook;
  }
}

class _Social {
  label: string;
  icon: string;
  href: string;

  constructor(label: string, icon: string, href: string) {
    this.icon = icon;
    this.label = label;
    this.href = href;
  }
}
