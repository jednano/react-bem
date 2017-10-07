import {
	BEMModifiers,
	joinBEMElement,
} from 'bem-helpers'
import bemJoin, { BEMJoinOptions } from 'bem-join'

import {
	BEMBlockProps,
	BEMElementProps,
	ReactElementProps,
} from './types'

export abstract class Component {
	static displayName?: string
}

/**
 * Gets the displayName of a class. Falls back to name prop or "Component".
 */
export function getDisplayName(ComponentClass: typeof Component) {
	return ComponentClass.displayName
		|| ComponentClass.name
		|| 'Component'
}

const bemProps: ['block', 'element', 'modifiers'] =
	['block', 'element', 'modifiers']
export function omitBEMProps<T>(
	props: T & BEMBlockProps & BEMElementProps,
): ReactElementProps {
	return omit(props, bemProps) as any
}

// tslint:disable-next-line:no-any
export function isFunction(value: any): value is Function {
	return typeof value === 'function'
}

// tslint:disable-next-line:no-any
export function isNumber(value: any): value is Number {
	return typeof value === 'number'
}

// tslint:disable-next-line:no-any
export function isString(value: any): value is String {
	return typeof value === 'string'
}

export function omit<T, K extends keyof T>(obj: T, paths: K[]) {
	return Object.keys(obj || {})
		.filter((k: K) => paths.indexOf(k) === -1)
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

/**
 * Joins a BEM block or element with any number of potentionally deeply
 * nested modifiers.
 */
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
