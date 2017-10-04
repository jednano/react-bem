import { shallow } from 'enzyme'
import * as React from 'react'

import resolveBEMNode from './resolveBEMNode'

describe('resolveBEMNode', () => {

	it('throws if missing React element argument', () => {
		expect(() => {
			// tslint:disable-next-line:no-any
			resolveBEMNode(undefined as any, undefined as any)
		}).toThrow('Missing required React element')
	})

	it('throws if invalid React argument is passed', () => {
		expect(() => {
			// tslint:disable-next-line:no-any
			resolveBEMNode('foo' as any, undefined as any)
		}).toThrow('Invalid React element')
	})

	it('throws if missing BEM object argument', () => {
		expect(() => {
			// tslint:disable-next-line:no-any
			resolveBEMNode(<div />, undefined as any)
		}).toThrow('Missing required BEM object argument')
	})

	it('throws if missing BEM block name', () => {
		expect(() => {
			// tslint:disable-next-line:no-any
			resolveBEMNode(<div />, {} as any)
		}).toThrow('Missing required BEM block name')
	})

	it('throws if BEM block name is a number', () => {
		expect(() => {
			// tslint:disable-next-line:no-any
			resolveBEMNode(<div />, { block: 42 } as any)
		}).toThrow('BEM block name must be a string')
	})

	it('throws if BEM element name is a number', () => {
		expect(() => {
			// tslint:disable-next-line:no-any
			resolveBEMNode(<div />, { block: 'foo', element: 42 } as any)
		}).toThrow('BEM element name must be a string')
	})

	it('assigns block name as class name', () => {
		expect(shallow(resolveBEMNode(
			<div />,
			{
				block: 'block',
			},
		))).toMatchSnapshot()
	})

	it('assigns "block__element" to root node\'s className', () => {
		expect(shallow(resolveBEMNode(
			<div />,
			{
				block: 'block',
				element: 'element',
			},
		))).toMatchSnapshot()
	})

	it('preserves existing className', () => {
		expect(shallow(resolveBEMNode(
			<div element="remove-me" modifiers="and-me" className="keep-me" />,
			{
				block: 'block',
				element: 'element',
			},
		))).toMatchSnapshot()
	})

	it('removes element and modifiers props from root node', () => {
		expect(shallow(resolveBEMNode(
			<div element="remove-me" modifiers="and-me" />,
			{
				block: 'block',
				element: 'element',
			},
		))).toMatchSnapshot()
	})

	it('resolves a nested element', () => {
		expect(shallow(resolveBEMNode(
			<div>
				<div element="nested" />
			</div>,
			{
				block: 'block',
				element: 'element',
			},
		))).toMatchSnapshot()
	})

	it('resolves a deeply nested element', () => {
		expect(shallow(resolveBEMNode(
			<div>
				<div>
					<div element="deeply-nested" />
				</div>
			</div>,
			{
				block: 'block',
				element: 'element',
			},
		))).toMatchSnapshot()
	})

	it('removes an empty element value', () => {
		expect(shallow(resolveBEMNode(
			<div>
				<div element="" modifiers="mod1 mod2">
					<div element="deeply-nested" />
				</div>
			</div>,
			{
				block: 'block',
				element: 'element',
			},
		))).toMatchSnapshot()
	})

	it('resolves a deeply nested element with modifiers', () => {
		expect(shallow(resolveBEMNode(
			<div>
				<div>
					<div element="deeply-nested" modifiers="mod1 mod2" />
				</div>
			</div>,
			{
				block: 'block',
				element: 'element',
			},
		))).toMatchSnapshot()
	})
})
