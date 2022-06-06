import { LitElement, html, css } from "lit";

class TestPortal extends LitElement {
  static get properties() {
    return {
      name: {
        type: String,
        hasChanged() {
          return false;
        }
      },
      projecting: { type: Boolean }
    };
  }
  static get styles() {
    return [
      css`
        div {
          width: 200px;
          height: 200px;
          border: 1px solid blue;
        }
      `
    ];
  }

  render() {
    const { projecting, toggleProjecting } = this;
    return projecting
      ? html` <portal-entrance destination="test">
          <div>practice</div>
        </portal-entrance>`
      : html`<button @click=${toggleProjecting}>
          click me to see portal
        </button>`;
  }
}

if (!customElements.get("test-portal")) {
  customElements.define("test-portal", TestPortal);
}
