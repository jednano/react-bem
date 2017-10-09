
import * as PT from 'prop-types'
import * as React from 'react'

import { getDisplayName } from './helpers'
import resolveBEMNode, { ReactRenderResult } from './resolveBEMNode'
import { BEMElementClass, BEMElementProps } from './types'

/**
 * Wraps a class with BEM element functionality, receiving the BEM block name
 * via props and converting element and modifiers attributes into className
 * attributes.
 * @param ComponentClass The class to wrap with BEM element functionality.
 */
export default function createBEMElement(
	ComponentClass: BEMElementClass | React.ComponentClass,
) {

	return class Wrapped<P = {}, S = {}>
	extends (ComponentClass as BEMElementClass)<P & BEMElementProps, S> {

		static displayName = `BEMElement(${getDisplayName(ComponentClass)})`

		static propTypes = {
			...ComponentClass.propTypes,
			block: PT.string.isRequired,
			element: PT.string,
			modifiers: PT.any,
		}

		render() {
			const {
				block,
				element,
				modifiers,
			} = this.props
			const rendered = super.render.call(this)
			return rendered && resolveBEMNode(rendered, {
				block: block as string,
				element: element as string,
				modifiers: [rendered.props.modifiers].concat([modifiers]),
			}) as ReactRenderResult
		}
	}
}
