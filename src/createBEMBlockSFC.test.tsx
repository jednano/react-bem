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
			block: PT.string.isRequired,
		}
		render(
			<FooBlock block="context-block">
				<FooItem />
			</FooBlock>,
		)
	})

	it('merges modifiers prop with root node\'s modifiers', () => {
		const Foo: React.SFC = () => (
			<div modifiers="mod1" />
		)
		const FooBlock = createBEMBlockSFC(Foo)
		expect(render(
			<FooBlock block="foo" modifiers="mod2" />,
		)).toMatchSnapshot()
	})
})
