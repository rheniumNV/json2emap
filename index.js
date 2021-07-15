const _ = require("lodash");
const { format } = require("util");

const isArray = (json) => _.isArray(json);
const isMap = (json) => _.isPlainObject(json);

const resolveKey = (prefix, key) =>
  prefix ? format("%s.%s", prefix, key) : key;

const resolveArrayKey = (prefix, key) =>
  prefix ? format("%s_%s_", prefix, key) : key;

const resolveIterator = (func, resolveKeyFunc, json, prefix) =>
  _.flatMap(json, (value, key) => func(value, resolveKeyFunc(prefix, key)));

const resolveType = (value) =>
  _.isNumber(value) ? "number" : _.isString(value) ? "string" : "any";

const resolveValue = (
  value,
  key,
  overRideType,
  resolveTypeFunc = resolveType
) => ({
  v: value,
  k: key,
  t: overRideType ? overRideType : resolveTypeFunc(value),
});

const resolveMap = (json, key = "", resolveTypeFunc) => {
  return isMap(json)
    ? resolveIterator(resolveMap, resolveKey, json, key)
    : isArray(json)
    ? [
        ...resolveIterator(resolveMap, resolveArrayKey, json, key),
        resolveValue(
          _.size(json),
          resolveKey(key, "length"),
          "number",
          resolveTypeFunc
        ),
      ]
    : resolveValue(json, key, resolveTypeFunc);
};

const escapeValue = (value) =>
  _.replace(_.replace(format(value), "\\", "\\\\"), "$#", "$#");

module.exports = (json, { resolveTypeFunc = resolveType } = {}) => {
  const list = resolveMap(json, undefined, resolveTypeFunc);
  const elist = {
    l: _.size(list),
    ..._.reduce(
      list,
      (prev, { v, k, t }, index) => ({
        ...prev,
        [resolveKey("v", index)]: v,
        [resolveKey("k", index)]: k,
        [resolveKey("t", index)]: t,
      }),
      {}
    ),
  };
  const result = _.join(
    _.map(elist, (value, key) =>
      format("%s$#%s$#", key, _.replace(escapeValue(value)))
    ),
    ""
  );
  return result;
};
