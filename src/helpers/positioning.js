import { arrow, computePosition, flip, offset, shift } from "@floating-ui/dom";

export const updatePosition = (buttonRef, overlayRef, arrowRef, global) => {
  // console.log(buttonRef, tooltipRef, arrowRef);
  // pass config in?
  const options = {
    placement: "top",
    middleware: [
      offset(16),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowRef.value })
    ]
  };
  computePosition(buttonRef.value, overlayRef.value, options).then(
    ({ x, y, placement, middlewareData }) => {
      Object.assign(overlayRef.value.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      // Accessing the data
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[placement.split("-")[0]];

      Object.assign(arrowRef.value.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-4px"
      });
    }
  );

  if (global) {
    const globalOverlay = document.getElementById("global-overlay");
    const slotContent = getSlotContent(overlayRef.value);
    console.log(slotContent);
    // globalOverlay.appendChild(slotContent);
  }
};

export const getSlotContent = (lightDomEl) => {
  if (lightDomEl) {
    return lightDomEl
      .getRootNode()
      .querySelector("slot[name=content]")
      .assignedNodes({ flatten: true })[0];
  } else {
    throw new Error(`light dom el doesn't exist`);
  }
};
