// Builds dist/index.mjs, dist/index.cjs and their type declarations from src/.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcFile = path.join(root, "src", "index.ts");
const distDir = path.join(root, "dist");
const source = fs.readFileSync(srcFile, "utf8");

const baseOptions = {
  target: ts.ScriptTarget.ES2018,
  strict: true,
  removeComments: false,
};

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

// ESM + .d.mts (type-checked build)
const outputs = {};
const program = ts.createProgram([srcFile], {
  ...baseOptions,
  module: ts.ModuleKind.ES2020,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  declaration: true,
  outDir: distDir,
  lib: ["lib.es2020.d.ts"],
  types: [],
});
const result = program.emit(undefined, (fileName, text) => {
  outputs[path.basename(fileName)] = text;
});
const diagnostics = ts
  .getPreEmitDiagnostics(program)
  .concat(result.diagnostics);
if (diagnostics.length > 0) {
  console.error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (f) => f,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    })
  );
  process.exit(1);
}
fs.writeFileSync(path.join(distDir, "index.mjs"), outputs["index.js"]);
fs.writeFileSync(path.join(distDir, "index.d.mts"), outputs["index.d.ts"]);

// CJS: `require("json2emap")` returns the function itself (compatible with v0.x),
// and also exposes `json2emap`, `default` and `defaultResolveType` as properties.
const cjs = ts.transpileModule(source, {
  compilerOptions: { ...baseOptions, module: ts.ModuleKind.CommonJS },
  fileName: "index.ts",
}).outputText;
const cjsFooter = `
module.exports = Object.assign(exports.json2emap, {
  json2emap: exports.json2emap,
  default: exports.json2emap,
  defaultResolveType: exports.defaultResolveType,
});
`;
fs.writeFileSync(path.join(distDir, "index.cjs"), cjs + cjsFooter);
fs.copyFileSync(
  path.join(root, "src", "index.d.cts"),
  path.join(distDir, "index.d.cts")
);

console.log("Built:", fs.readdirSync(distDir).join(", "));
