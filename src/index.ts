import './augmentReact'

export { default as createBEMBlock } from './createBEMBlock'
export { default as createBEMElement } from './createBEMElement'
export { default as resolveBEMNode } from './resolveBEMNode'

export {
	bemClassNameProp,
	BEMClassNamePropOptions,
	bemClassNames,
	BEMClassNamesOptions,
	getDisplayName,
	isFunction,
	isString,
	omit,
	omitBEMProps,
} from './helpers'

export {
	BEMBlockClass,
	BEMBlockProps,
	BEMElementClass,
	BEMElementProps,
	ReactBEMElementProps,
} from './types'
