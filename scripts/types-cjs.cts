import json2emap = require("json2emap");

const a: string = json2emap({ a: 1 });
const b: string = json2emap.json2emap(
  { a: 1 },
  { resolveTypeFunc: (v) => typeof v }
);
const c: string = json2emap.default([1]);
const opt: json2emap.Options = {
  resolveTypeFunc: json2emap.defaultResolveType,
};
const legacy: json2emap.IOption = opt;
// @ts-expect-error resolveTypeFunc must be a function
json2emap({}, { resolveTypeFunc: 1 });
export { a, b, c, legacy };
