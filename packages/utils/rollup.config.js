import configure from "../../rollup.config";
import { main, module } from "./package.json";

export default configure({
  input: "./index.js",
  main,
  module,
});
