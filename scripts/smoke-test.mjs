// Verifies the built ES module entry via the package's own "exports".
import assert from "node:assert";
import json2emap, { json2emap as named, defaultResolveType } from "json2emap";

const expected = "l$#1$#v$#k0$#a$#v0$#1$#t0$#number$#";
assert.strictEqual(json2emap({ a: 1 }), expected);
assert.strictEqual(named, json2emap);
assert.strictEqual(defaultResolveType(true), "bool");
console.log("ESM smoke test passed");
