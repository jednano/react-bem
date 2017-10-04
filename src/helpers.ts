import {
	BEMModifiers,
	joinBEMElement,
} from 'bem-helpers'
import bemJoin, { BEMJoinOptions } from 'bem-join'

import { ReactBEMElementProps } from './types'

abstract class Component {
	static displayName?: string
}

/**
 * Gets the displayName of a class. Falls back to name or "Component".
 */
export function getDisplayName(ComponentClass: typeof Component) {
	return ComponentClass.displayName
		|| ComponentClass.name
		|| 'Component'
}

const bemProps = ['block', 'element', 'modifiers']
export function omitBEMProps<T>(
	props: T & ReactBEMElementProps,
): ReactBEMElementProps {
	// tslint:disable-next-line:no-any
	return omit(props, bemProps) as any
}

// tslint:disable-next-line:no-any
export function isFunction(value: any): value is Function {
	return typeof value === 'function'
}

// tslint:disable-next-line:no-any
export function isString(value: any): value is String {
	return typeof value === 'string'
}

function omit<T>(obj: T, paths: string[]) {
	return Object.keys(obj || {})
		.filter(k => paths.indexOf(k) === -1)
		.reduce(
			(accumulator, key) => {
				accumulator[key] = obj[key]
				return accumulator
			},
			{},
		)
}

export interface BEMClassNamePropOptions extends BEMClassNamesOptions {}

export function bemClassNameProp(
	block: string,
	element?: string,
	modifiers?: BEMModifiers,
	options: BEMClassNamePropOptions = {},
) {
	const className = bemClassNames(
		block,
		element,
		modifiers,
		options,
	)
	return className ? { className } : {}
}

export interface BEMClassNamesOptions extends BEMJoinOptions {}

export function bemClassNames(
	block: string,
	element?: string,
	modifiers?: BEMModifiers,
	options: BEMJoinOptions = {},
) {
	return bemJoin(
		element ? joinBEMElement(block, element) : block,
		modifiers,
		options,
	)
}
