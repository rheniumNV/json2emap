const toTag = (value) => Object.prototype.toString.call(value);

const isArray = (json) => Array.isArray(json);

const isMap = (json) => {
  if (
    json === null ||
    typeof json !== "object" ||
    toTag(json) !== "[object Object]"
  ) {
    return false;
  }
  const proto = Object.getPrototypeOf(json);
  // Accept objects from other realms (e.g. vm contexts) as well.
  return proto === null || Object.getPrototypeOf(proto) === null;
};

const isNumber = (value) =>
  typeof value === "number" ||
  (typeof value === "object" &&
    value !== null &&
    toTag(value) === "[object Number]");

const isString = (value) =>
  typeof value === "string" ||
  (typeof value === "object" &&
    value !== null &&
    toTag(value) === "[object String]");

const isBoolean = (value) =>
  value === true ||
  value === false ||
  (typeof value === "object" &&
    value !== null &&
    toTag(value) === "[object Boolean]");

const toString = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (Object.is(value, -0)) return "-0";
  return String(value);
};

const resolveKey = (prefix, key) => (prefix ? `${prefix}.${key}` : `${key}`);

const resolveArrayKey = (prefix, key) =>
  prefix ? `${prefix}_${key}_` : `_${key}_`;

const resolveIterator = (
  func,
  resolveKeyFunc,
  json,
  prefix,
  resolveTypeFunc
) => {
  const result = [];
  const append = (value, key) => {
    const entries = func(value, resolveKeyFunc(prefix, key), resolveTypeFunc);
    for (let i = 0; i < entries.length; i++) result.push(entries[i]);
  };
  if (isArray(json)) {
    // Index loop so that holes in sparse arrays are visited as undefined.
    for (let i = 0; i < json.length; i++) append(json[i], i);
  } else {
    for (const key of Object.keys(json)) append(json[key], key);
  }
  return result;
};

const resolveType = (value) =>
  isNumber(value)
    ? "number"
    : isString(value)
    ? "string"
    : isBoolean(value)
    ? "bool"
    : "any";

const resolveValue = (
  value,
  key,
  overRideType,
  resolveTypeFunc = resolveType
) => ({
  v: value === null ? "null" : value,
  k: key,
  t: overRideType ? overRideType : resolveTypeFunc(value),
});

const resolveMap = (json, key = "", resolveTypeFunc = resolveType) => {
  return isMap(json)
    ? resolveIterator(resolveMap, resolveKey, json, key, resolveTypeFunc)
    : isArray(json)
    ? [
        resolveValue(
          json.length,
          resolveKey(key, "length"),
          "number",
          resolveTypeFunc
        ),
        ...resolveIterator(
          resolveMap,
          resolveArrayKey,
          json,
          key,
          resolveTypeFunc
        ),
      ]
    : [resolveValue(json, key, undefined, resolveTypeFunc)];
};

const escapeValue = (value) =>
  toString(value).replace(/\\/g, "\\\\").replace(/\$#/g, "$\\#");

module.exports = (json, { resolveTypeFunc = resolveType } = {}) => {
  const list = resolveMap(json, undefined, resolveTypeFunc);
  let result = `l$#${list.length}$#v$#`;
  list.forEach(({ v, k, t }, index) => {
    result += `k${index}$#${escapeValue(k)}$#v${index}$#${escapeValue(
      v
    )}$#t${index}$#${escapeValue(t)}$#`;
  });
  return result;
};
