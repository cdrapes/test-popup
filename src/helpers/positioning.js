import { arrow, computePosition, flip, offset, shift } from "@floating-ui/dom";

export const updatePosition = (buttonRef, tooltipRef, arrowRef, global) => {
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
  computePosition(buttonRef.value, tooltipRef.value, options).then(
    ({ x, y, placement, middlewareData }) => {
      Object.assign(tooltipRef.value.style, {
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

      // if global, project content onto root node
      // if (global) {
      //   const portal = document.getElementById("portal");
      //   portal.appendChild(tooltipRef.value);
      // }
    }
  );
};
