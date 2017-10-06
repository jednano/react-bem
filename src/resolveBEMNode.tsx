import { BEMModifiers } from 'bem-helpers'
import * as React from 'react'

import {
	bemClassNameProp,
	isNumber,
	isString,
	omitBEMProps,
} from './helpers'
import { ReactBEMElementProps } from './types'

/**
 * BEM block or element node.
 */
export type ReactBEMElement = React.ReactElement<ReactBEMElementProps>

/**
 * Return type from a React component's render method.
 */
export type ReactRenderResult = false | JSX.Element | null

export type BEMNode = ReactRenderResult | React.ReactChild

/**
 * Walks a BEM node tree, consumes BEM props and resolves class names.
 */
export default function resolveBEMNode(
	node: BEMNode,
	bem: {
		block: string,
		element?: string,
		modifiers?: BEMModifiers
	},
	/**
	 * Recursion depth.
	 */
	depth: number = 0,
): BEMNode {
	if (!node) {
		return node as ReactRenderResult
	}
	if (isString(node) || isNumber(node)) {
		return node as React.ReactChild
	}
	if (!React.isValidElement(node)) {
		throw new Error('Invalid React element')
	}
	if (!bem) {
		throw new Error('Missing required BEM object argument')
	}
	const { block, element, modifiers } = bem
	if (!block) {
		throw new Error('Missing required BEM block name')
	}
	if (!isString(block)) {
		throw new Error('BEM block name must be a string')
	}
	if (element && !isString(element)) {
		throw new Error('BEM element name must be a string')
	}
	const props = omitBEMProps(node.props)
	const classNameProp = (element || !depth) ? bemClassNameProp(
		block,
		element,
		depth
			? modifiers
			: [modifiers].concat(
				[(node as ReactBEMElement).props.modifiers]
			) as BEMModifiers,
		{ className: props.className },
	) : {}
	return (
		<node.type
			{...{
				...props,
				children: resolveChildren(props.children),
				...classNameProp,
			}}
		/>
	)

	function resolveChildren(children: React.ReactNode) {
		const count = React.Children.count(children)
		return !count ? children : (count > 1)
			? React.Children.map(children, resolveChild)
			: resolveChild(children as React.ReactChild, 0, true)

		function resolveChild(
			child: React.ReactChild,
			index: number,
			isOnlyChild: Boolean = false,
		): React.ReactChild {
			const props = (
				(child || {}) as ReactBEMElement
			).props || {} as ReactBEMElementProps
			const { element, modifiers } = props
			return (!element && !isOnlyChild) ? child : resolveBEMNode(
				child,
				{ block, element, modifiers },
				depth + 1,
			) as React.ReactChild
		}
	}
}
