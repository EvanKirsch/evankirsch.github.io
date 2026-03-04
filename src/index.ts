import { NavbarRenderer } from "./navbar/navbar-renderer"
import { GithubRepoApis } from "./api/github-repo-apis"

const navbarRenderer = new NavbarRenderer();
navbarRenderer.renderNavbar();

// pre-loading api calls into request manager cache
const githubRepoApis = new GithubRepoApis();
githubRepoApis.preloadLaugaugeApis();