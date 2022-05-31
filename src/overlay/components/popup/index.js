import { LitElement, html } from "lit";

import styles from "./popup.styles";

class Popup extends LitElement {
  static get styles() {
    return [styles];
  }
  render() {
    return html`
    
      <ax-overlay id="popup">
      <button slot="invoker">
        My popup
      </button>
        <div slot="content">
          <button>btn 1</button>
          <button>btn 2</button>
          <button>btn 3</button>
          <div>
            <input type="text">
          </div>
        </div>
      </div>
      </ax-overlay>
    `;
  }
}

if (!customElements.get("ax-popup")) {
  customElements.define("ax-popup", Popup);
}
