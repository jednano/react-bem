import { BEMModifiers } from 'bem-helpers'
import * as React from 'react'

import { bemClassNameProp, isString, omitBEMProps } from './helpers'
import { ReactBEMElementProps } from './types'

/**
 * BEM block or element node.
 */
export type ReactBEMElement = React.ReactElement<ReactBEMElementProps>

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
	const classNameProp = (bem.element || !depth) ? bemClassNameProp(
		bem.block,
		bem.element,
		bem.modifiers,
		{ className: props.className },
	) : {}
	return (
		<node.type
			{...{
				...props,
				children: resolveChildren(props.children, bem.block),
				...classNameProp,
			}}
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
