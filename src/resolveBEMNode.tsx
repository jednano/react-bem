import {
	BEMModifiers,
	joinBEMElement,
} from 'bem-helpers'
import bemJoin from 'bem-join'
import * as React from 'react'
import truthyKeys from 'truthy-keys'

import { isString, omitBEMProps } from './helpers'
import { ReactBEMElementProps } from './types'

/**
 * BEM block or element node.
 */
type ReactBEMElement = React.ReactElement<ReactBEMElementProps>

export default function resolveBEMNode(
	node: ReactBEMElement,
	bem: {
		block: string,
		element?: string,
		modifiers?: BEMModifiers
	},
	/**
	 * Recursion depth.
	 */
	depth: number = 0,
): JSX.Element {
	if (!node) {
		throw new Error('Missing required React element')
	}
	if (!React.isValidElement(node)) {
		throw new Error('Invalid React element')
	}
	if (!bem) {
		throw new Error('Missing required BEM object argument')
	}
	if (!bem.block) {
		throw new Error('Missing required BEM block name')
	}
	if (!isString(bem.block)) {
		throw new Error('BEM block name must be a string')
	}
	if (bem.element && !isString(bem.element)) {
		throw new Error('BEM element name must be a string')
	}
	const props = omitBEMProps(node.props)
	return (
		<node.type
			{...props}
			{...truthyKeys({
				children: resolveChildren(props.children, bem.block),
				className: (bem.element || !depth) && bemJoin(
					bem.element
						? joinBEMElement(bem.block, bem.element)
						: bem.block,
					bem.modifiers,
					{ className: props.className },
				),
			})}
		/>
	)

	function resolveChildren(children: React.ReactNode, block: string) {
		const count = React.Children.count(children)
		return !count ? children : (count > 1)
			? React.Children.map(children, resolveChild)
			: resolveChild(React.Children.only(children), 0, true)

		function resolveChild(
			child: ReactBEMElement,
			index: number,
			isOnlyChild: Boolean = false,
		) {
			const { element, modifiers } = child.props
			return (!element && !isOnlyChild) ? child : resolveBEMNode(
				child,
				{ block, element, modifiers },
				depth + 1,
			)
		}
	}
}

// export default function resolveClassNames<P>(
// 	reactElement: React.ReactElement<P> | null,
// 	options: {
// 		block?: string
// 		element?: string
// 		modifiers?: Modifiers,
// 	} = {},
// ) {
// 	if (!reactElement) {
// 		return reactElement
// 	}
// 	let block = options.block || reactElement.props.block
// 	let element = options.element || reactElement.props.element
// 	if (!block) {
// 		if (!element) {
// 			return reactElement
// 		}
// 		[block, element] = element.split(BLOCK_ELEMENT_DELIMITER)
// 	}
// 	return resolveParentClassNames({
// 		block,
// 		element,
// 		modifiers: options.modifiers,
// 		reactElement,
// 	})
// }

// function resolveParentClassNames(options) {
// 	const {
// 		block,
// 		element,
// 		reactElement,
// 	} = options
// 	const props = reactElement.props
// 	const modifiers = compact([options.modifiers, props.modifiers])

// 	if (isReactComponent(reactElement)) {
// 		return quickClone(
// 			omitBy({ element: resolvePrefix(), modifiers }, isEmpty),
// 		)
// 	}

// 	const { className } = props
// 	return quickClone({
// 		className: classnames(uniq(compact(
// 			buildModifiers(resolvePrefix(block), modifiers)
// 				.concat(isString(className) && className.split(/\s+/)),
// 		))),
// 	})

// 	function resolvePrefix(fallback) {
// 		if (!element) {
// 			return fallback
// 		}
// 		if (element.indexOf(BLOCK_ELEMENT_DELIMITER) !== -1) {
// 			return element
// 		}
// 		return [
// 			block,
// 			BLOCK_ELEMENT_DELIMITER,
// 			element,
// 		].join('')
// 	}

// 	function quickClone(newProps) {
// 		return clone({ reactElement, block, newProps })
// 	}
// }

// function isReactComponent(reactElement) {
// 	return isFunction(reactElement.type)
// }

// function clone({ reactElement, block, newProps }) {
// 	const { ref, key, props } = reactElement
// 	const children = resolveNestedClassNames({
// 		block,
// 		children: props.children,
// 	})

// 	if (isReactComponent(reactElement)) {
// 		return React.cloneElement(...compact([
// 			reactElement,
// 			{ ref, ...newProps },
// 			children,
// 		]))
// 	} else {
// 		return React.createElement(...compact([
// 			reactElement.type,
// 			{
// 				ref,
// 				...omitBy({ key }, isNil),
// 				...omitBemProps(props),
// 				...omitBemProps(newProps),
// 			},
// 			children,
// 		]))
// 	}

// 	function omitBemProps(object) {
// 		return omit(object, ['block', 'element', 'modifiers'])
// 	}
// }

// function buildModifiers(blockOrElement, modifiers) {
// 	return (modifiers.length) ? [blockOrElement].concat(
// 			flatten(
// 				flattenDeep(modifiers).map(resolveModifiers),
// 			).map(appendModifier),
// 		) : [blockOrElement]

// 	function resolveModifiers(modifiers) {
// 		return (isString(modifiers))
// 			? modifiers.split(/\s+/)
// 			: keys(pickBy(modifiers, identity))
// 	}

// 	function appendModifier(modifier) {
// 		return [
// 			blockOrElement,
// 			ELEMENT_MODIFIER_DELIMETER,
// 			modifier,
// 		].join('')
// 	}
// }

// function resolveNestedClassNames({ block, children }) {
// 	if (!React.Children.count(children)) {
// 		return children
// 	}
// 	return (children.map)
// 		? React.Children.map(children, resolveNestedElements)
// 		: resolveNestedElements(children)

// 	function resolveNestedElements(reactElement) {
// 		if (!React.isValidElement(reactElement)) {
// 			return reactElement
// 		}

// 		const { props } = reactElement
// 		if (props.block) {
// 			return !isReactComponent(reactElement)
// 				? resolveClassNames(reactElement, { block: props.block })
// 				: reactElement
// 		}

// 		const newProps = { block, reactElement }
// 		const { element } = props

// 		return element
// 			? resolveParentClassNames({ ...newProps, element })
// 			: clone(newProps)
// 	}
// }
