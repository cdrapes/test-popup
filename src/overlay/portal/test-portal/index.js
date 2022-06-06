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

  toggleProjecting() {
    this.projecting = !this.projecting;
  }

  testEl() {
    return html`<div>hello</div>`;
  }

  render() {
    const { projecting, toggleProjecting } = this;
    return html`
      ${this.testEl()}
      ${projecting
        ? html`<portal-entrance destination="test"
            >${this.testEl()}</portal-entrance
          >`
        : null}
      <button @click=${toggleProjecting}>
        click me to see portal
      </button>
    `;
  }
}

if (!customElements.get("test-portal")) {
  customElements.define("test-portal", TestPortal);
}
