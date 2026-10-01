// Verifies the built CommonJS entry via the package's own "exports".
const assert = require("node:assert");
const json2emap = require("json2emap");

const expected = "l$#1$#v$#k0$#a$#v0$#1$#t0$#number$#";
assert.strictEqual(typeof json2emap, "function");
assert.strictEqual(json2emap({ a: 1 }), expected);
assert.strictEqual(json2emap.json2emap({ a: 1 }), expected);
assert.strictEqual(json2emap.default({ a: 1 }), expected);
assert.strictEqual(json2emap.defaultResolveType(true), "bool");
console.log("CJS smoke test passed");
