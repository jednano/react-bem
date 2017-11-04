import * as PT from 'prop-types'
import * as React from 'react'

import { BEMBlockProviderContext } from './createBEMBlock'
import { getDisplayName } from './helpers'
import resolveRenderedElement from './resolveRenderedElement'
import { BEMElementProps } from './types'

/**
 * Wraps a class with BEM element functionality, receiving the BEM block name
 * via context and converting element and modifiers attributes into className
 * attributes.
 * @param SFC The class to wrap with BEM element functionality.
 */
export default function createBEMElementSFC<P = {}>(
	SFC: React.SFC<P>,
) {
	const WrappedSFC: React.SFC = function(
		props: P,
		context: BEMBlockProviderContext,
	) {
		return resolveRenderedElement(
			SFC(props, context),
			props,
			context,
		) as JSX.Element | null
	}

	// tslint:disable-next-line:no-any
	WrappedSFC.displayName = `BEMElementSFC(${getDisplayName(SFC as any)})`

	WrappedSFC.contextTypes = {
		...(SFC.contextTypes || {}),
		bemBlock: PT.string.isRequired,
	}

	WrappedSFC.propTypes = {
		// tslint:disable-next-line:no-any
		...(SFC.propTypes as any || {}),
		bemElement: PT.string,
		bemModifiers: PT.any,
	}

	return WrappedSFC as React.SFC<P & BEMElementProps> & {
		displayName: string
		contextTypes: typeof SFC.contextTypes & {
			bemBlock: PT.Validator<string>
		}
	}
}
