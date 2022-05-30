import { html, LitElement } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import { updatePosition } from "../../../helpers/positioning";
import styles from "./tooltip.styles";

class Tooltip extends LitElement {
  buttonRef = createRef();
  tooltipRef = createRef();
  arrowRef = createRef();

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
      this.show ? this.showTooltip() : this.hideTooltip();
    }
  }

  showTooltip() {
    const {
      tooltipRef: { value }
    } = this;
    value.style.display = "block";
    const { buttonRef, tooltipRef, arrowRef } = this;
    updatePosition(buttonRef, tooltipRef, arrowRef);
  }

  hideTooltip() {
    const {
      tooltipRef: { value }
    } = this;
    value.style.display = "";
  }

  onMouseOver(e) {
    this._show = true;
  }

  onMouseLeave(e) {
    this._show = false;
  }

  render() {
    const { buttonRef, tooltipRef, arrowRef, onMouseOver, onMouseLeave } = this;
    return html`
      <button
        @mouseover=${onMouseOver}
        @mouseleave=${onMouseLeave}
        ${ref(buttonRef)}
        id="button"
        aria-describedby="tooltip"
      >
        My button
      </button>
      <div ${ref(tooltipRef)} id="tooltip" role="tooltip">
        My tooltip is super coo'
        <div ${ref(arrowRef)} id="arrow"></div>
      </div>
    `;
  }
}

if (!customElements.get("ax-tooltip")) {
  customElements.define("ax-tooltip", Tooltip);
}
