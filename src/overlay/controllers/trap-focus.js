export class TrapFocusController {
  host;
  contentElement;
  firstFocusableElement;
  lastFocusableElement;

  constructor(host) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    console.log("host connected to controller");
  }

  // listen for state change

  hostUpdated() {
    console.log("%chost updated", "background: green");
    if (this.host._show && !this.contentElement) {
      // is there a way to know previous state?
      console.log("setting up trap");
      this.setContentElement(this.getContentElement());
      this.trapFocus();
    } else if (!this.host._show && this.contentElement) {
      console.log("removing trap");
      this.setContentElement(null);
    }
  }

  hostDisconnected() {
    if (this.contentElement) {
      this.contentElement.removeEventListener("keydown", this.trapFocusHandler);
      console.log("host disconnected");
    }
  }

  setContentElement(el) {
    this.contentElement = el;
  }

  // move to overlay element so don't need to do this?
  getContentElement() {
    return (this.contentElement = this.host.shadowRoot
      .querySelector("slot[name=content]")
      .assignedNodes({ flatten: true })[0]);
  }

  trapFocusHandler = (e) => {
    const isTabPressed = e.key === "Tab";
    // const { activeElement } = this.host.getRootNode();
    const {
      lastFocusableElement,
      firstFocusableElement,
      contentElement
    } = this;
    const { activeElement } = contentElement.getRootNode();

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      /* shift + tab */ if (activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } /* tab */ else {
      if (activeElement === lastFocusableElement) {
        console.log("re focus");
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  };

  trapFocus() {
    const { contentElement } = this;

    const focusableElements = contentElement.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );

    this.firstFocusableElement = focusableElements[0];
    this.lastFocusableElement = focusableElements[focusableElements.length - 1];

    // const KEYCODE_TAB = 9;

    contentElement.addEventListener("keydown", this.trapFocusHandler);
  }
}
