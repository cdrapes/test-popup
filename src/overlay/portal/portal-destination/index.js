import { LitElement, html, css } from "lit";

class PortalDestination extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      projected: { type: Array }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("portal-open", this.updatePortalContent, true);
    document.addEventListener("portal-close", this.updatePortalContent, true);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("portal-open", this.updatePortalContent, true);
    document.removeEventListener(
      "portal-close",
      this.updatePortalContent,
      true
    );
  }
  confirmDestination(e) {
    if (!this.name) console.warn("This destination has not been named.");
    if (e.detail.destination !== this.name) return false;
    e.stopPropagation();
    return true;
  }
  updatePortalContent = (e) => {
    if (!this.confirmDestination(e)) return;
    this.projected = e.detail.content || [];
  };
  static get styles() {
    return [
      css`
        :host {
          outline: 1px solid green;
        }
      `
    ];
  }
  render() {
    return html` ${this.projected} `;
  }
}

customElements.define("portal-destination", PortalDestination);
