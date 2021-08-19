import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import visualizer from "rollup-plugin-visualizer";
import { terser } from "rollup-plugin-terser";
const { getFiles } = require("./scripts/buildUtils");

const extensions = [".js", ".ts", ".jsx", ".tsx"];

export default {
  input: [
    "./src/index.ts",
    // ...getFiles("./src/common", extensions),
    ...getFiles("./src/components", extensions),
    // ...getFiles("./src/hooks", extensions),
    // ...getFiles("./src/utils", extensions),
  ],
  output: {
    dir: "dist",
    format: "cjs",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    postcss(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "dist",
    }),
    terser(),
    visualizer({
      filename: "bundle-analysis.html",
      open: true,
    }),
  ],
  external: ["react", "react-dom", "sass-loader"],
};
