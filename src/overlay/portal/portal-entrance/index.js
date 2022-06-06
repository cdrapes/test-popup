import { LitElement, html, css } from "lit";

function createEvent(name, detail) {
  return new CustomEvent(name, {
    composed: 1,
    detail
  });
}

class PortalEntrance extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: none;
        }
      `
    ];
  }
  static get properties() {
    return {
      destination: { type: String }
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.dispatchEvent(
      createEvent("portal-close", {
        destination: this.destination
      })
    );
  }
  projectSlot(e) {
    if (!e.target.assignedElements().length) return;
    this.dispatchEvent(
      createEvent("portal-open", {
        destination: this.destination,
        content: e.target.assignedElements()
      })
    );
  }

  render() {
    return html`<slot @slotchange=${this.projectSlot}></slot>`;
  }
}

customElements.define("portal-entrance", PortalEntrance);
