import { Octokit } from "@octokit/core";
import { RequestManager } from "./request-manager";
import { OctokitResponse } from "@octokit/types";

export class GithubRepoApis {

  private static urlBlacklist = [
	  "https://api.github.com/repos/EvanKirsch/dmenu",
    "https://api.github.com/repos/EvanKirsch/st"
  ]

  private requestManager = RequestManager.getInstance();
  private octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN });

  public async getPersonalLanguages() {
    const repoEndpoints = await this.getMyRepoEndpoints();
    const languageBytes = new Map<String, number>();

    for (let i in repoEndpoints) {
      const langStats = await this.getRepoLanguages(repoEndpoints[i]);
      const langNames = Object.getOwnPropertyNames(langStats);

      langNames.forEach((elt) => {
        let size = +langStats[elt as keyof typeof langStats];
        if (languageBytes.has(elt)) {
          size += (languageBytes.get(elt) ?? 0);
        }
        languageBytes.set(elt, size);

      });
    }

    return languageBytes;
  }

  public async preloadLaugaugeApis() {
    const repoEndpoints = await this.getMyRepoEndpoints();
    for (let i in repoEndpoints) {
      this.getRepoLanguages(repoEndpoints[i]);

    }
  }

  private async getMyRepoEndpoints() : Promise<Array<String>> {
    const response = <OctokitResponse<any, number>> await this.requestManager
      .request("GET https://api.github.com/users/evankirsch/repos", this.octokit.request, this.octokit);
    const myEndpoints = new Array<String>();
    response.data.forEach((elt : any) => {
      if (GithubRepoApis.urlBlacklist.includes(elt.url) == false) {
        myEndpoints.push(elt.url);
      }
    });

    return myEndpoints;
  }

  public async getRepoMetadata(repoName: string): Promise<{ stars: number, language: string | null, license: string | null }> {
    const response = await this.requestManager.request(
      `GET https://api.github.com/repos/EvanKirsch/${repoName}`,
      this.octokit.request, this.octokit
    );
    return {
      stars: response.data.stargazers_count,
      language: response.data.language,
      license: response.data.license?.spdx_id ?? null,
    };
  }

  public async getLatestRelease(repoName: string): Promise<{ tag: string, url: string } | null> {
    try {
      const response = await this.requestManager.request(
        `GET https://api.github.com/repos/EvanKirsch/${repoName}/releases/latest`,
        this.octokit.request, this.octokit
      );
      return { tag: response.data.tag_name, url: response.data.html_url };
    } catch {
      return null;
    }
  }

  private async getRepoLanguages(repo : String | undefined) : Promise<Object> {
    const response = await this.requestManager
       .request("GET " + repo + "/languages", this.octokit.request, this.octokit);

    return response.data

  }

}
