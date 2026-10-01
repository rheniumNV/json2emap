# Changelog

All notable changes to this project are documented in this file.

## [1.0.0] - 2026-10-02

### Breaking changes

- The package now defines `"exports"`. Only the package root (`json2emap`) can be imported; deep imports such as `json2emap/index.js` are no longer available.
- Node.js 14 or later is required.

### Added

- ES Modules support (`import json2emap from "json2emap"` / `import { json2emap } from "json2emap"`).
- `defaultResolveType` is exported.
- `Options` / `ResolveTypeFunc` types (`IOption` is kept as a deprecated alias).

### Changed

- Rewritten in TypeScript.
- Conversion runs in linear time.
- The output is identical to 0.2.1.

## [0.2.1] - 2026-10-01

### Fixed

- `resolveTypeFunc` option is now applied to every value. Previously it was ignored for nested values.
- Passing a primitive value as the root (e.g. `json2emap(5)`) no longer throws.
- `length` of sparse arrays now matches the number of emitted elements.
- An object with a numeric `length` property (e.g. `{ length: 2, b: 1 }`) was treated as array-like and its other keys were dropped. It is now treated as a normal object.

### Changed

- Removed the `lodash` dependency. The package now has no runtime dependencies.
- The published package now contains only the library files (tests and fixtures are no longer included).
- Improved TypeScript types for the options.
- README: updated for Resonite, fixed sample output, documented options and edge cases, and added a note on the use of generative AI.

## [0.2.0] - 2022-02-24

### Changed

- **Breaking:** the order of the entries in the Emap string changed from `v`, `k`, `t` to `k`, `v`, `t`, so that a value can be extracted directly from the string by its key.
  Emap strings from older versions cannot be read with the "extract directly from strings" method.
- `v$#` is now inserted after the length (`l$#<n>$#v$#`) to keep compatibility with logic that parses older Emap strings.

## [0.1.2] - 2022-02-18

### Added

- TypeScript type definitions (`index.d.ts`).
- English README.
- Test coverage report on GitHub Actions.

## [0.1.1] - 2022-02-15

### Changed

- README update only (`package.json` version was left at 0.1.0).

## [0.1.0] - 2022-02-15

### Fixed

- Escaping: every `\` and `$#` in keys and values is now escaped (`\` -> `\\`, `$#` -> `$\#`). Previously only the first `\` was escaped and `$#` was not escaped at all.

### Changed

- Faster conversion.
- License changed from ISC to MIT.
- Added package metadata (description, repository, keywords) and tests.

## [0.0.2] - 2021-08-20

### Fixed

- Keys of the entries were `v.0`, `k.0`, `t.0` instead of `v0`, `k0`, `t0`.
- Keys of elements of a root array are now `_0_`, `_1_`, ... (previously `0`, `1`, ...).

### Changed

- The `length` entry of an array is now placed before its elements.
- Booleans are now typed as `bool` (previously `any`).

## [0.0.1] - 2021-07-15

- Initial release.

[1.0.0]: https://github.com/rheniumNV/json2emap/compare/v0.2.1...v1.0.0
[0.2.1]: https://github.com/rheniumNV/json2emap/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/rheniumNV/json2emap/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/rheniumNV/json2emap/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/rheniumNV/json2emap/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/rheniumNV/json2emap/releases/tag/v0.1.0
