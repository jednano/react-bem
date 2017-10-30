import { BEMBlockProviderContext } from './createBEMBlock'
import resolveBEMNode, { ReactRenderResult } from './resolveBEMNode'
import { BEMElementProps } from './types'

export default function resolveRenderedElement<P>(
	rendered: ReactRenderResult,
	props: P & BEMElementProps,
	context: BEMBlockProviderContext,
) {
	const {
		bemElement: element,
		bemModifiers: modifiers,
	} = props
	return rendered && resolveBEMNode(rendered, {
		block: context.bemBlock,
		element: element as string,
		modifiers: [rendered.props.bemModifiers].concat([modifiers]),
	}) as ReactRenderResult
}
