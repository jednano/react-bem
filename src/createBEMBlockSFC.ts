import * as PT from 'prop-types'
import * as React from 'react'

import { getDisplayName } from './helpers'
import { BEMBlockProps } from './types'
import resolveRenderedBlock from './resolveRenderedBlock'

export interface BEMBlockProviderContext {
	/**
	 * BEM block name
	 */
	bemBlock: string
}

/**
 * Wraps an SFC with BEM block functionality, providing the BEM block name
 * via context and converting block and modifiers attributes into className
 * attributes.
 * @param SFC The SFC to wrap with BEM block functionality.
 */
export default function createBEMBlockSFC<P = {}>(
	SFC: React.SFC<P>,
) {

	return class Wrapped<P2 = {}, S = {}>
	extends React.Component<{} & P & P2 & BEMBlockProps, S> {

		// tslint:disable-next-line:no-any
		static displayName = `BEMBlock(${getDisplayName(SFC as any)})`

		static childContextTypes = {
			bemBlock: PT.string.isRequired,
		}

		getChildContext(): BEMBlockProviderContext {
			return {
				bemBlock: this.props.bemBlock as string,
			}
		}

		render() {
			return resolveRenderedBlock(
				// tslint:disable-next-line:no-any
				SFC(this.props as any, this.context),
				this.props,
			)
		}
	}
}
