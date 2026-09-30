import json2emap, {
  json2emap as named,
  defaultResolveType,
  type Options,
} from "json2emap";

interface User {
  id: number;
}
const user: User = { id: 1 };
const a: string = json2emap(user);
const b: string = named([1], { resolveTypeFunc: (v) => defaultResolveType(v) });
const opt: Options = {};
// @ts-expect-error resolveTypeFunc must be a function
json2emap({}, { resolveTypeFunc: 1 });
export { a, b, opt };
