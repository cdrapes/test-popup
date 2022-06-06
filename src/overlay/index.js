import { html, LitElement } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import { updatePosition } from "../helpers/positioning";
import { TrapFocusController } from "./controllers/trap-focus";
import styles from "./overlay.styles";

class Overlay extends LitElement {
  buttonRef = createRef();
  overlayRef = createRef();
  arrowRef = createRef();

  // Controllers
  trapFocusController = new TrapFocusController(this);

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
  }

  get show() {
    return this._show;
  }

  updated(changedProps) {
    if (changedProps.has("_show")) {
      this.show ? this.showOverlay() : this.hideOverlay();
    }
  }

  toggleShow = (e) => {
    // TODO manage closing other dialogs if open
    if (!this._show) {
      // close all other popups

      this._show = true;
      e.stopPropagation();
      return;
    } else {
      this._show = false;
      return;
    }
  };

  showOverlay(e) {
    const { buttonRef, overlayRef, arrowRef } = this;
    // TODO more stuff for accessibility
    overlayRef.value.style.display = "block";
    overlayRef.haspopup = true;
    // console.log(e);
    updatePosition(buttonRef, overlayRef, arrowRef, true);
    // attach close event listeners - click + ESC
    this.attachEventListeners();
  }

  hideOverlay() {
    const { overlayRef } = this;
    overlayRef.haspopup = false;
    overlayRef.value.style.display = "";
    this.disposeEventListeners();
  }

  // EVENT HANDLERS

  keyHandler = (e) => {
    if (e.code === "Escape") {
      this.toggleShow(e);
      return;
    }
  };

  invokerHandler = (e) => this.toggleShow(e);

  // move logic to click handler?
  onPopupClick(event) {
    // don't bubble up to close the event listener
    event.stopPropagation();
  }

  // ATTACH / DISPOSE HANDLERS

  // move to controller?
  attachEventListeners() {
    document.addEventListener("click", this.invokerHandler, {});
    document.addEventListener("keydown", this.keyHandler, {});
  }

  disposeEventListeners() {
    document.removeEventListener("click", this.invokerHandler, {});
    document.removeEventListener("keydown", this.keyHandler, {});
  }

  render() {
    const {
      buttonRef,
      overlayRef,
      arrowRef,
      invokerHandler,
      onPopupClick
    } = this;
    return html`
      <!-- temp solution until work out how to send slot to floating ui -->
      <div ${ref(buttonRef)} style="width: fit-content">
        <slot name="invoker" @click=${invokerHandler} id="button">
          My button
        </slot>
      </div>
      <div id="popup" ${ref(overlayRef)} @click=${onPopupClick}>
        <slot name="content"></slot>
        <div ${ref(arrowRef)} id="arrow"></div>
      </div>
    `;
  }
}

if (!customElements.get("ax-overlay")) {
  customElements.define("ax-overlay", Overlay);
}
