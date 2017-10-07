import { shallow } from 'enzyme'
import * as React from 'react'

import resolveBEMNode from './resolveBEMNode'

describe('resolveBEMNode', () => {

	it('returns input value if falsey', () => {
		[
			null,
			undefined as any,
			false as false,
			0,
			'',
		].forEach(value => {
			// tslint:disable-next-line:no-any
			expect(resolveBEMNode(value, {} as any)).toBe(value)
		})
	})

	it('returns input value if string or number', () => {
		[
			'foo',
			42,
		].forEach(value => {
			// tslint:disable-next-line:no-any
			expect(resolveBEMNode(value, {} as any)).toBe(value)
		})
	})

	it('throws if invalid React element is passed', () => {
		expect(() => {
			// tslint:disable-next-line:no-any
			resolveBEMNode({} as any, undefined as any)
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
		) as JSX.Element)).toMatchSnapshot()
	})

	it('preserves the key attribute', () => {
		const key = 'keep-me'
		expect((resolveBEMNode(
			<div key={key} />,
			{
				block: 'block',
			}
		) as any).key).toBe(key)
	})

	it('preserves the ref attribute', () => {
		const fn = jest.fn()
		expect((resolveBEMNode(
			<div ref={fn} />,
			{
				block: 'block',
			}
		) as any).ref).toBe(fn)
	})

	it('assigns "block__element" to root node\'s className', () => {
		expect(shallow(resolveBEMNode(
			<div />,
			{
				block: 'block',
				element: 'element',
			},
		) as JSX.Element)).toMatchSnapshot()
	})

	it('preserves existing className', () => {
		expect(shallow(resolveBEMNode(
			<div element="remove-me" className="keep-me" />,
			{
				block: 'block',
				element: 'element',
			},
		) as JSX.Element)).toMatchSnapshot()
	})

	it('removes element and modifiers props from root node', () => {
		expect(shallow(resolveBEMNode(
			<div element="remove-me" modifiers="and-me" />,
			{
				block: 'block',
				element: 'element',
			},
		) as JSX.Element)).toMatchSnapshot()
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
		) as JSX.Element)).toMatchSnapshot()
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
		) as JSX.Element)).toMatchSnapshot()
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
		) as JSX.Element)).toMatchSnapshot()
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
		) as JSX.Element)).toMatchSnapshot()
	})

	it('doesn\'t choke on nested primitive values', () => {
		[
			false as false,
			null,
			'foo',
			42,
		].forEach(value => {
			expect(shallow(resolveBEMNode(
				<div>{value}</div>,
				{ block: 'block' },
			) as JSX.Element)).toMatchSnapshot()
		})
    })
})
