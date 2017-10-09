import * as PT from 'prop-types'
import * as React from 'react'

import { getDisplayName } from './helpers'
import { BEMBlockClass, BEMBlockProps } from './types'
import resolveBEMNode, { ReactRenderResult } from './resolveBEMNode'

/**
 * Wraps a class with BEM block functionality, providing the BEM block name
 * via props and converting block and modifiers attributes into className
 * attributes.
 * @param ComponentClass The class to wrap with BEM block functionality.
 */
export default function createBEMBlock(
	ComponentClass: BEMBlockClass | React.ComponentClass,
) {

	return class Wrapped<P = {}, S = {}>
	extends (ComponentClass as BEMBlockClass)<P & BEMBlockProps, S> {

		static displayName = `BEMBlock(${getDisplayName(ComponentClass)})`

		static propTypes = {
			...(ComponentClass.propTypes),
			block: PT.string,
			modifiers: PT.any,
		}

		render() {
			const {
				block,
				modifiers,
			} = this.props
			const rendered = super.render.call(this)
			return rendered && resolveBEMNode(rendered, {
				block: block as string,
				modifiers: [rendered.props.modifiers].concat([modifiers]),
			}) as ReactRenderResult
		}
	}
}
