export class PageRenderer {

  async renderPage(filepath : string) {
    const fs = new FileReader();
    const response = await fetch(filepath);
    const fileContent = await response.text();

    const openPage = document.getElementById("open-page");
    if (openPage != null) {
      openPage.innerHTML = fileContent;
    }
  }

}