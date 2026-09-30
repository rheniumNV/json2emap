/** Returns the Emap type name (e.g. "number", "string", "bool") for a leaf value. */
export type ResolveTypeFunc = (value: unknown) => string;

export interface Options {
  /**
   * Custom type resolver applied to every leaf value.
   * Array `length` entries are always "number".
   */
  resolveTypeFunc?: ResolveTypeFunc;
}

/** @deprecated Use `Options` instead. */
export type IOption = Options;

type Entry = { k: string; v: string; t: string };

const toTag = (value: unknown): string => Object.prototype.toString.call(value);

const isBoxed = (value: unknown, tag: string): boolean =>
  typeof value === "object" && value !== null && toTag(value) === tag;

/** The default type resolver: number -> "number", string -> "string", boolean -> "bool", others -> "any". */
export const defaultResolveType: ResolveTypeFunc = (value) =>
  typeof value === "number" || isBoxed(value, "[object Number]")
    ? "number"
    : typeof value === "string" || isBoxed(value, "[object String]")
    ? "string"
    : typeof value === "boolean" || isBoxed(value, "[object Boolean]")
    ? "bool"
    : "any";

const objectTag = "[object Object]";

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (
    value === null ||
    typeof value !== "object" ||
    toTag(value) !== objectTag
  ) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  // Accept objects from other realms (e.g. vm contexts) as well.
  return proto === null || Object.getPrototypeOf(proto) === null;
};

const stringifyValue = (value: unknown): string => {
  if (value === null) return "null";
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  if (Object.is(value, -0)) return "-0";
  return String(value);
};

const escapeValue = (value: string): string =>
  value.replace(/\\/g, "\\\\").replace(/\$#/g, "$\\#");

const objectKey = (prefix: string, key: string): string =>
  prefix ? `${prefix}.${key}` : key;

const arrayKey = (prefix: string, index: number): string =>
  prefix ? `${prefix}_${index}_` : `_${index}_`;

const collect = (
  value: unknown,
  key: string,
  resolveTypeFunc: ResolveTypeFunc,
  out: Entry[]
): void => {
  if (Array.isArray(value)) {
    out.push({
      k: objectKey(key, "length"),
      v: String(value.length),
      t: "number",
    });
    for (let i = 0; i < value.length; i++) {
      collect(value[i], arrayKey(key, i), resolveTypeFunc, out);
    }
  } else if (isPlainObject(value)) {
    for (const childKey of Object.keys(value)) {
      collect(value[childKey], objectKey(key, childKey), resolveTypeFunc, out);
    }
  } else {
    out.push({
      k: key,
      v: stringifyValue(value),
      t: resolveTypeFunc(value),
    });
  }
};

/**
 * Convert a JSON value into an Emap string.
 */
export function json2emap(json: unknown, option?: Options): string {
  const resolveTypeFunc = option?.resolveTypeFunc ?? defaultResolveType;
  const entries: Entry[] = [];
  collect(json, "", resolveTypeFunc, entries);

  const parts: string[] = [`l$#${entries.length}$#v$#`];
  for (let i = 0; i < entries.length; i++) {
    const { k, v, t } = entries[i];
    parts.push(
      `k${i}$#${escapeValue(k)}$#v${i}$#${escapeValue(v)}$#t${i}$#${escapeValue(
        t == null ? "" : String(t)
      )}$#`
    );
  }
  return parts.join("");
}

export default json2emap;
