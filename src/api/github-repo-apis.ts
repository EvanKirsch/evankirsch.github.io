import { Octokit } from "@octokit/core";
import { RequestManager } from "./request-manager";
import { OctokitResponse } from "@octokit/types";

export class GithubRepoApis {

  private static urlBlacklist = [
	  "https://api.github.com/repos/EvanKirsch/dmenu",
    "https://api.github.com/repos/EvanKirsch/st"
  ]

  private requestManager = RequestManager.getInstance();
  private octokit = new Octokit({});

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

  private async getRepoLanguages(repo : String | undefined) : Promise<Object> {
    const response = await this.requestManager
       .request("GET " + repo + "/languages", this.octokit.request, this.octokit);

    return response.data
    
  }

}