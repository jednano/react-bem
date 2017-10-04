import * as PT from 'prop-types'
import * as React from 'react'

import { getDisplayName, isFunction } from './helpers'
import { BEMBlockClass, BEMBlockProps } from './types'
import resolveBEMNode from './resolveBEMNode'

/**
 * Wraps a class with BEM block functionality, providing the BEM block name
 * via context and converting block and modifiers attributes into className
 * attributes.
 * @param ComponentClass The class to wrap with BEM block functionality.
 */
export default function createBEMBlock(
	ComponentClass: BEMBlockClass | React.ComponentClass,
) {

	return class Wrapped<P = {}, S = {}>
	extends (ComponentClass as BEMBlockClass)<P & BEMBlockProps, S> {

		static displayName = `BEMBlock(${getDisplayName(ComponentClass)})`

		static childContextTypes = {
			...ComponentClass.childContextTypes,
			block: PT.string.isRequired,
		}

		getChildContext() {
			return {
				...(isFunction(super.getChildContext) && (
					super.getChildContext.call(this))
				),
				block: this.props.block,
			}
		}

		render() {
			const {
				block,
				modifiers,
			} = this.props
			const rendered = super.render.call(this)
			return rendered && resolveBEMNode(rendered, {
				block: block as string,
				modifiers,
			})
		}
	}
}
