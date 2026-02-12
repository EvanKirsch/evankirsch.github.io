export class BodyRenderer {

  renderMainBody() {
    (<HTMLDivElement> document.getElementById("main-body")).textContent = "test"
  }

}