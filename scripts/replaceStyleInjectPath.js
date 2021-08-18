// A temp workaround for Rollup Postcss plugin
// Related issue: https://github.com/egoist/rollup-plugin-postcss/issues/381

const fs = require("fs");
const fsExtra = require("fs-extra");
const utils = require("./buildUtils");

function main() {
  const allScssJsFiles = utils.getFiles("dist", [".scss.js"]);

  allScssJsFiles.forEach((file) => {
    let content = fs.readFileSync(file, "utf8");
    if (content.includes("node_modules/style-inject")) {
      console.log(`Replacing style-inject path: ${file}`);

      const endIndex = content.indexOf("node_modules/style-inject");
      const startIndex = content.lastIndexOf('"', endIndex);

      const result =  `${content.substring(0, startIndex + 1)}${content.substring(
        endIndex + "node_modules/".length
      )}`;

      fs.writeFileSync(
        file,
        `${content.substring(0, startIndex + 1)}${content.substring(
          endIndex + "node_modules/".length
        )}`
      );
    }
  });
}

main();
