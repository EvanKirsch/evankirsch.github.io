export class NavbarFunctions {

  static onLiClick (event : PointerEvent) {
    if (event.target instanceof HTMLElement) {
      const elt = event.target.parentElement;
      if (elt != null) {
        const listNodes = elt.parentElement?.childNodes
        listNodes?.forEach((elt : ChildNode) => {
          if (elt instanceof HTMLElement && elt.classList.contains("active")) {
            elt.classList.remove("active")
          }
        })
        elt.classList.add("active")
      }
    }
  }

}