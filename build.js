// build.js
const exe = require("@angablue/exe");

const build = exe({
  entry: "./dist/obfos.js",
  out: "./build/Roham.1.0.0.exe",
  skipBundle: false,
  version: "{package:version}",
  icon: "./public/favicon-32x32.ico", // Application icons must be in .ico format
  executionLevel: "asInvoker",
  properties: {
    FileDescription: "{package:description}",
    ProductName: "Roham App",
    LegalCopyright: "Copyright {package:author.name}",
    OriginalFilename: "{package:name}",
  },
});

build.then(() => console.log("Build completed!"));