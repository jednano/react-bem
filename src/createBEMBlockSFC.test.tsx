import { render } from 'enzyme'
import * as PT from 'prop-types'
import * as React from 'react'

import createBEMBlockSFC from './createBEMBlockSFC'

describe('createBEMBlockSFC', () => {

	it('extends input class with a displayName of "BEMBlock(Foo)"', () => {
		const Foo: React.SFC = () => null
		const FooBlock = createBEMBlockSFC(Foo)
		expect(FooBlock.displayName).toEqual('BEMBlock(Foo)')
	})

	it('provides BEM block name via context', () => {
		const Foo: React.SFC = (props) => (
			<div>
				{props.children}
			</div>
		)
		const FooBlock = createBEMBlockSFC(Foo)
		const FooItem: React.SFC = (props, context) => {
			expect(context).toMatchSnapshot()
			return null
		}
		FooItem.contextTypes = {
			bemBlock: PT.string.isRequired,
		}
		render(
			<FooBlock bemBlock="context-block">
				<FooItem />
			</FooBlock>,
		)
	})

	it('merges modifiers prop with root node\'s modifiers', () => {
		const Foo: React.SFC = () => (
			<div bemModifiers="mod1" />
		)
		const FooBlock = createBEMBlockSFC(Foo)
		expect(render(
			<FooBlock bemBlock="foo" bemModifiers="mod2" />,
		)).toMatchSnapshot()
	})
})
