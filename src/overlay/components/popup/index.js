import { html, LitElement } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import { updatePosition } from "../../../helpers/positioning";
import styles from "./popup.styles";

class Popup extends LitElement {
  buttonRef = createRef();
  overlayRef = createRef();
  arrowRef = createRef();

  // CONTROLLERS!!!!

  // add state for display/hide tooltip
  static properties = {
    _show: { state: true }
  };

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this._show = false;
    this.boundEventHandler = this.toggleShow.bind(this);
    this.boundKeyHandler = this.keyHandler.bind(this);
  }

  get show() {
    return this._show;
  }

  updated(changedProps) {
    if (changedProps.has("_show")) {
      this.show ? this.showTooltip() : this.hideTooltip();
    }
  }

  toggleShow(e) {
    console.log("toggle show");
    if (!this._show) {
      this._show = true;
      e.stopPropagation();
      return;
    } else {
      this._show = false;
      return;
    }
  }

  showTooltip(e) {
    const { buttonRef, overlayRef, arrowRef } = this;
    overlayRef.value.style.display = "block";
    overlayRef.haspopup = true;
    updatePosition(buttonRef, overlayRef, arrowRef);
    // attach close event listeners - click + ESC
    this.attachEventListeners();
  }

  hideTooltip() {
    const { overlayRef } = this;
    overlayRef.haspopup = false;
    overlayRef.value.style.display = "";
    this.disposeEventListeners();
  }

  keyHandler(e) {
    if (e.code === "Escape") {
      this.toggleShow(e);
      return;
    }
  }

  onPopupClick(event) {
    // don't bubble up to close the event listener
    event.stopPropagation();
  }

  attachEventListeners() {
    document.addEventListener("click", this.boundEventHandler, {});
    document.addEventListener("keydown", this.boundKeyHandler, {});
  }

  disposeEventListeners() {
    document.removeEventListener("click", this.boundEventHandler, {});
    document.removeEventListener("keydown", this.boundKeyHandler, {});
  }

  render() {
    const { buttonRef, overlayRef, arrowRef, toggleShow, onPopupClick } = this;
    return html`
      <button @click=${toggleShow} ${ref(buttonRef)} id="button">
        My button
      </button>
      <div @click=${onPopupClick} ${ref(overlayRef)} id="popup">
        <div class="content">
          <div>Header</div>
          <div>Body</div>
          <div @click=${() => console.log("footer clicked")}>Footer</div>
        </div>
        <div ${ref(arrowRef)} id="arrow"></div>
      </div>
    `;
  }
}

if (!customElements.get("ax-popup")) {
  customElements.define("ax-popup", Popup);
}
