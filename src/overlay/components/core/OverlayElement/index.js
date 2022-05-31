import { html, LitElement } from "lit";

class OverlayElement extends LitElement {
  render() {
    return html``;
  }
}

if (!customElements.get("ax-overlay-element")) {
  customElements.define("ax-overlay-element", OverlayElement);
}
