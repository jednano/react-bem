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
}

export type BEMBlockClass = typeof AbstractBEMBlock

/**
 * BEM block properties
 */
export interface BEMBlockProps {
	/**
	 * BEM block name
	 */
	block?: string
	/**
	 * BEM block modifiers
	 */
	modifiers?: BEMModifiers
}

export type BEMElementClass = typeof AbstractBEMElement

/**
 * BEM element properties
 */
export interface BEMElementProps {
	/**
	 * BEM element name
	 */
	element?: string
	/**
	 * BEM element modifiers
	 */
	modifiers?: BEMModifiers
}

export interface ReactBEMElementProps<P = {}>
extends BEMElementProps, ReactElementProps<P> {}

export interface ReactElementProps<P = {}>
extends React.Props<P> {
	className?: string,
}
