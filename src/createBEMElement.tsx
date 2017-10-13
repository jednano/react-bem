
import * as PT from 'prop-types'
import * as React from 'react'

import { getDisplayName } from './helpers'
import { BEMBlockProviderContext } from './createBEMBlock'
import resolveRenderedElement from './resolveRenderedElement'
import { BEMElementProps } from './types'

/**
 * Wraps a class with BEM element functionality, receiving the BEM block name
 * via context and converting element and modifiers attributes into className
 * attributes.
 * @param ComponentClass The class to wrap with BEM element functionality.
 */
export default function createBEMElement(
	ComponentClass: React.ComponentClass<any & BEMElementProps>,
) {
	return class Wrapped extends ComponentClass {

		static displayName =
			`BEMElement(${getDisplayName(ComponentClass as any)})`

		static contextTypes: BEMBlockProviderContext = {
			...(ComponentClass.contextTypes || {}),
			block: PT.string.isRequired,
		}

		context: BEMBlockProviderContext

		static propTypes = {
			...(ComponentClass.propTypes as any || {}),
			element: PT.string,
			modifiers: PT.any,
		}

		render() {
			return resolveRenderedElement(
				super.render.call(this),
				this.props,
				this.context,
			)
		}
	}
}
