## 0.2.4
- **Fix:** Preserve `ref` attribute (fixes [`#8`](https://github.com/jedmao/react-bem/issues/8)).

## 0.2.3
- Badge fixes on README.

## 0.2.2
- Defer responsibility of merging modifiers to the HOCs.

## 0.2.1
- Merge root node's modifiers w/ modifiers prop (fixes [`#11`](https://github.com/jedmao/react-bem/issues/11)).

## 0.2.0
- Export `isNumber` helper.
- Export `BEMNode` interface.
- Export `ReactBEMElement` interface.
- Export `ReactRenderResult` interface.
- **Fix:** Ensure `resolveBEMNode` doesn't choke on nested primitive values (i.e., `false`, `null`, `foo`, `42`).
- **Breaking change:** Errors are no longer thrown when passing a `string`, `number`, `false`, `null` or `undefined` to `resolveBEMNode`. In these cases, the input value is just returned.

## 0.1.1
- Add initial documentation

## 0.1.0
- Initial release
