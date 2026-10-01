declare function json2emap(json: unknown, option?: json2emap.Options): string;

declare namespace json2emap {
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

  /** The default type resolver: number -> "number", string -> "string", boolean -> "bool", others -> "any". */
  export const defaultResolveType: ResolveTypeFunc;

  export { json2emap, json2emap as default };
}

export = json2emap;
