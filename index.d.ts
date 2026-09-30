declare namespace json2emap {
  /** Returns the Emap type name (e.g. "number", "string", "bool") for a leaf value. */
  type ResolveTypeFunc = (value: unknown) => string;

  interface IOption {
    /** Custom type resolver applied to every leaf value. Array `length` entries are always "number". */
    resolveTypeFunc?: ResolveTypeFunc;
  }
}

/**
 * Convert a JSON value into an Emap string.
 */
declare function json2emap(json: unknown, option?: json2emap.IOption): string;

export = json2emap;
