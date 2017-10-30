import * as React from 'react'

import { BEMModifiers } from 'bem-helpers'

export abstract class AbstractBEMBlock<P = {}, S = {}>
extends React.Component<P, S> {
	static childContextTypes?: {}
	static displayName?: string
	getChildContext() {
		return {}
	}
}

export abstract class AbstractBEMElement<P = {}, S = {}>
extends React.Component<P, S> {
	static contextTypes?: {}
	static displayName?: string
	static propTypes?: {}
}

export type BEMBlockClass = typeof AbstractBEMBlock

/**
 * BEM block properties
 */
export interface BEMBlockProps {
	/**
	 * BEM block name
	 */
	bemBlock?: string
	/**
	 * BEM block modifiers
	 */
	bemModifiers?: BEMModifiers
}

export type BEMElementClass = typeof AbstractBEMElement

/**
 * BEM element properties
 */
export interface BEMElementProps {
	/**
	 * BEM element name
	 */
	bemElement?: string
	/**
	 * BEM element modifiers
	 */
	bemModifiers?: BEMModifiers
}

export interface ReactBEMElementProps<P = {}>
extends BEMElementProps, ReactElementProps<P> {}

export interface ReactElementProps<P = {}>
extends React.Props<P> {
	className?: string,
}
