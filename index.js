const { replace, isPlainObject } = require("lodash");

const isArray = (json) => Array.isArray(json);
const isMap = (json) => isPlainObject;

const resolveKey = (prefix, key) => (prefix ? `${prefix}.${key}` : key);

const resolveArrayKey = (prefix, key) =>
  prefix ? `${prefix}_${key}_` : `_${key}_`;

const resolveIterator = (func, resolveKeyFunc, json, prefix) =>
  _.flatMap(json, (value, key) => func(value, resolveKeyFunc(prefix, key)));

const resolveType = (value) =>
  _.isNumber(value)
    ? "number"
    : _.isString(value)
    ? "string"
    : _.isBoolean(value)
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

const resolveMap = (json, key = "", resolveTypeFunc) => {
  return isMap(json)
    ? resolveIterator(resolveMap, resolveKey, json, key)
    : isArray(json)
    ? [
        resolveValue(
          Object.keys(json).length,
          resolveKey(key, "length"),
          "number",
          resolveTypeFunc
        ),
        ...resolveIterator(resolveMap, resolveArrayKey, json, key),
      ]
    : resolveValue(json, key, resolveTypeFunc);
};

const escapeValue = (value) =>
  replace(replace(value, /\\/g, "\\\\"), /\$#/g, "$\\#");

module.exports = (json, { resolveTypeFunc = resolveType } = {}) => {
  const list = resolveMap(json, undefined, resolveTypeFunc);
  let result = `l$#${Object.keys(list).length}$#v$#`;
  list.forEach(({ v, k, t }, index) => {
    result += `k${index}$#${escapeValue(k)}$#v${index}$#${escapeValue(
      v
    )}$#t${index}$#${escapeValue(t)}$#`;
  });
  return result;
};
