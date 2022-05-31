import { css } from "lit";

export default [
  css`
    #popup {
      width: 200px;
      height: 200px;
      display: none;
      position: absolute;
      z-index: 1;
      border: black 1px solid;
    }
    #arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      z-index: -1;
      outline: black solid 1px;
      background-color: white;
      transform: rotate(45deg);
    }
  `
];
