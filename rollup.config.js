import commonjs from "rollup-plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";

export default (options) => ({
  input: options.input,
  output: [
    {
      file: options.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: options.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    resolve({
      extensions: [".js", ".jsx"],
    }),
    commonjs(),
    peerDepsExternal(),
  ],
});
