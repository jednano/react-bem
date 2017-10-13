import { BEMBlockProviderContext } from './createBEMBlock'
import resolveBEMNode, { ReactRenderResult } from './resolveBEMNode'
import { BEMElementProps } from './types'

export default function resolveRenderedElement<P>(
	rendered: ReactRenderResult,
	props: P & BEMElementProps,
	context: BEMBlockProviderContext,
) {
	const {
		element,
		modifiers,
	} = props
	return rendered && resolveBEMNode(rendered, {
		block: context.block,
		element: element as string,
		modifiers: [rendered.props.modifiers].concat([modifiers]),
	}) as ReactRenderResult
}
