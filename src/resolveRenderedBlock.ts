import resolveBEMNode, { ReactRenderResult } from './resolveBEMNode'
import { BEMBlockProps } from './types'

export default function resolveRenderedBlock<P>(
	rendered: ReactRenderResult,
	props: P & BEMBlockProps,
) {
	const {
		bemBlock: block,
		bemModifiers: modifiers,
	} = props
	return rendered && resolveBEMNode(rendered, {
		block: block as string,
		modifiers: [rendered.props.bemModifiers].concat([modifiers]),
	}) as ReactRenderResult
}
