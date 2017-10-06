# react-bem

[![NPM version](http://img.shields.io/npm/v/@jedmao/react-bem.svg?style=flat)](https://www.npmjs.org/package/@jedmao/react-bem)
[![npm license](http://img.shields.io/npm/l/@jedmao/react-bem.svg?style=flat-square)](https://www.npmjs.org/package/@jedmao/react-bem)
[![Travis Build Status](https://img.shields.io/travis/jedmao/react-bem.svg)](https://travis-ci.org/jedmao/react-bem)
[![Dependency Status](https://gemnasium.com/badges/github.com/jedmao/react-bem.svg)](https://gemnasium.com/github.com/jedmao/react-bem)

[![npm](https://nodei.co/npm/@jedmao/react-bem.svg?downloads=true)](https://nodei.co/npm/@jedmao/react-bem/)

[BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) helper functions and [HOCs](https://reactjs.org/docs/higher-order-components.html) for React.

## Introduction

This library allows you to write BEM block and element components in such a way that the block saves its name in context, later to be accessed by any number of BEM element components. A block component might look something like this:

```tsx
// Foo.tsx
import { createBEMBlock } from '@jedmao/react-bem'
import Bar from './Bar'

class Foo {
  static defaultProps = {
    block: 'foo'
  }
  render() {
    return (
      <div modifiers="mod1 mod2">
        <Bar />
        <div element="baz" modifiers={['mod3', { mod4: true }]}>
          qux
        </div>
      </div>
    )
  }
}

export default createBEMBlock(Foo)
```

The `Bar` component here is an BEM element component and looks like this:

```tsx
// Bar.tsx
import { createBEMElement } from '@jedmao/react-bem'

class Bar {
  static defaultProps = {
    element: 'bar'
  }
  render() {
    return (
      <div>
        <div element="corge" className="save-me">
          garpley
        </div>
      </div>
    )
  }
}

export default createBEMElement(Bar)
```

Rendering the `Foo` block above would produce the following HTML:

```html
<div className="foo foo--mod1 foo--mod2">
  <div className="foo__bar">
    <div className="foo__corge save-me">
      garpley
    </div>
  </div>
  <div className="foo__baz foo__baz--mod3 foo__baz--mod4">
    qux
  </div>
</div>
```

### Some things to note
- The block name of `foo` has been preserved in context and provided to the `Bar` element, so that it's always available.
- All `block`, `element` and `modifiers` props have been consumed. They are not rendered in the final HTML.
- The BEM props have been resolved and inserted into the `className` prop. The existing `className` is preserved.
- The `Bar` component could be used inside a different block, in which case the `foo__corge` classname would be `${block}__corge`.

### Tips for writing scalable and maintainable BEM components
- BEM blocks should be extremely portable, so the smaller the better. Try your best to keep it decoupled from other components.
- Try to keep most of your modifiers at the root node of the block. Instead of `.foo__bar--dark`, you can usually move the `--dark` modifier up so that you can target the `__bar` element like `.foo--dark > .foo__bar`. In this way, you can use the same `--dark` modifier for any number of other elements w/o scattering the same modifier everywhere.
- If you find yourself creating elements like `foo__bar-baz` and `foo__bar-qux`, this could be a code smell. Consider if there are any benefits of extracting the concept of `__bar` into a new `Bar` block.

## API

### `createBEMBlock( componentClass )`

Wraps a class with BEM block functionality, providing the BEM block name via context and converting block and modifiers attributes into `className` attributes.

### `createBEMElement( componentClass )`

Wraps a class with BEM element functionality, receiving the BEM block name via context and converting element and modifiers attributes into `className` attributes.

### `resolveBEMNode( node, { block, element?, modifiers? } )`

Walks a BEM node tree, consumes BEM props and resolves class names.

---

### `bemClassNameProp( block [, element] [, modifiers] [, options] )`

Same as `bemClassNames` (below), but returns an object with a `className` prop:

```js
{
  className: 'foo'
}
```

### `bemClassNames( block [, element] [, modifiers] [, options] )`

Joins a BEM block or element with any number of potentionally deeply nested modifiers.

### `getDisplayName( class )`

Attempts to get the displayName of a class. Falls back to name prop or "Component".

### `isFunction( value )`

Checks if `value` is classified as a `Function` object.

### `isString( value )`

Checks if `value` is classified as a `String` primitive or object.

### `omit( object, [paths] )`

Creates an object composed of the own and inherited enumerable property paths of `object` that are not omitted.

### `omitBEMProps( object )`

Omits `block`, `element` and `modifiers` props from an object.

## TypeScript

This project is written in TypeScript, so the TypeScript definitions come for free. Here are some interfaces you might be able to use in your project:

- `BEMBlockClass`
- `BEMBlockProps`
- `BEMClassNamePropOptions`
- `BEMClassNamesOptions`
- `BEMElementClass`
- `BEMElementProps`
- `BEMNode`
- `ReactBEMElement`
- `ReactBEMElementProps`
- `ReactRenderResult`
