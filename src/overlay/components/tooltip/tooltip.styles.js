import { css } from "lit";

export default [
  css`
    .container {
      /* width: 50px;
      height: 50px;
      overflow: hidden; */
    }

    #tooltip {
      font-family: sans-serif;
      display: none;
      position: absolute;
      background: #222;
      color: white;
      font-weight: bold;
      padding: 5px;
      border-radius: 4px;
      font-size: 90%;
      pointer-events: none;
    }
    #arrow {
      position: absolute;
      background: #333;
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
    }
    button {
      font-size: 20px;
    }
  `
];
