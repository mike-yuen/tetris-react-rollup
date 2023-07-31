import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import scss from "rollup-plugin-scss";
import { terser } from "rollup-plugin-terser";
import visualizer from "rollup-plugin-visualizer";

export default {
  input: ["./src/index.ts"],
  output: {
    dir: "dist",
    format: "cjs",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
    globals: {
      react: "react",
      "react-dom/client": "react-dom/client",
    },
  },
  plugins: [
    external(),
    resolve(),
    scss({ insert: true, fileName: "bundle.css", outputStyle: "compressed" }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "dist",
    }),
    terser(),
    // visualizer({
    //   filename: "bundle-analysis.html",
    //   open: true,
    // }),
  ],
  external: ["react", "react-dom/client", "sass-loader"],
};
