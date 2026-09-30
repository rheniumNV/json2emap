# Changelog

## 0.2.1

### Fixed

- `resolveTypeFunc` option is now applied to every value. Previously it was ignored for nested values.
- Passing a primitive value as the root (e.g. `json2emap(5)`) no longer throws.
- `length` of sparse arrays now matches the number of emitted elements.

### Changed

- The published package now contains only the library files (tests and fixtures are no longer included).
- Improved TypeScript types for the options.
- README: updated for Resonite, fixed sample output, documented options and edge cases.

## 0.2.0

### Changed

- **Breaking:** the order of key and value in the Emap string changed (`k`, `v`, `t`). Emap strings from older versions cannot be read with the "extract directly from strings" method.
