import * as PT from 'prop-types'
import * as React from 'react'

import { getDisplayName } from './helpers'
import { BEMBlockProps } from './types'
import resolveRenderedBlock from './resolveRenderedBlock'

export interface BEMBlockProviderContext {
	/**
	 * BEM block name
	 */
	block: string
}

/**
 * Wraps an SFC with BEM block functionality, providing the BEM block name
 * via context and converting block and modifiers attributes into className
 * attributes.
 * @param SFC The SFC to wrap with BEM block functionality.
 */
export default function createBEMBlockSFC<P ={}>(
	SFC: React.SFC<P>,
) {

	return class Wrapped<P2 = {}, S = {}>
	extends React.Component<any & P & P2 & BEMBlockProps, S> {

		static displayName = `BEMBlock(${getDisplayName(SFC as any)})`

		static childContextTypes = {
			block: PT.string.isRequired,
		}

		getChildContext(): BEMBlockProviderContext {
			return {
				block: this.props.block as string,
			}
		}

		render() {
			return resolveRenderedBlock(
				SFC(this.props, this.context),
				this.props,
			)
		}
	}
}
