import * as PT from 'prop-types'
import * as React from 'react'

import { getDisplayName, isFunction } from './helpers'
import { BEMBlockClass, BEMBlockProps } from './types'
import resolveRenderedBlock from './resolveRenderedBlock'

export interface BEMBlockProviderContext {
	/**
	 * BEM block name
	 */
	bemBlock: string
}

/**
 * Wraps a class with BEM block functionality, providing the BEM block name
 * via context and converting block and modifiers attributes into className
 * attributes.
 * @param ComponentClass The class to wrap with BEM block functionality.
 */
export default function createBEMBlock<P = {}>(
	ComponentClass: (
		BEMBlockClass |
		React.ComponentClass<P>
	),
) {

	return class Wrapped<P2 = {}, S = {}>
	extends (ComponentClass as BEMBlockClass)<P & P2 & BEMBlockProps, S> {

		// tslint:disable-next-line:no-any
		static displayName = `BEMBlock(${getDisplayName(ComponentClass as any)})`

		static childContextTypes = {
			...ComponentClass.childContextTypes,
			bemBlock: PT.string.isRequired,
		}

		getChildContext(): BEMBlockProviderContext {
			return {
				...(isFunction(super.getChildContext) && (
					super.getChildContext.call(this))
				),
				bemBlock: this.props.bemBlock,
			}
		}

		render() {
			return resolveRenderedBlock(
				super.render.call(this),
				this.props,
			)
		}
	}
}
