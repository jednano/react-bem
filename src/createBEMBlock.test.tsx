import { render } from 'enzyme'
import * as PT from 'prop-types'
import * as React from 'react'

import createBEMBlock from './createBEMBlock'

describe('createBEMBlock', () => {

	it('extends input class with a displayName of "BEMBlock(Foo)"', () => {
		class Foo extends React.Component {
			render() {
				return null
			}
		}
		const FooBlock = createBEMBlock(Foo)
		expect(FooBlock.displayName).toEqual('BEMBlock(Foo)')
	})

	it('extends input propTypes with a block validator', () => {
		class Foo extends React.Component {
			static propTypes = {
				bar: PT.string,
			}
			render() {
				return null
			}
		}
		const FooBlock = createBEMBlock(Foo)
		expect(FooBlock.propTypes).toMatchSnapshot()
	})

	it('provides BEM block name via context', () => {
		class Foo extends React.Component {
			render() {
				return (
					<div>
						{this.props.children}
					</div>
				)
			}
		}
		class FooItem extends React.Component {
			render() {
				expect(this.props).toMatchSnapshot()
				return null
			}
		}
		const FooBlock = createBEMBlock(Foo)
		render(
			<FooBlock block="foo">
				<FooItem />
			</FooBlock>,
		)
	})

	it('merges modifiers prop with root node\'s modifiers', () => {
		class Foo extends React.Component {
			render() {
				return (
					<div modifiers="mod1" />
				)
			}
		}
		const FooBlock = createBEMBlock(Foo)
		expect(render(
			<FooBlock block="foo" modifiers="mod2" />,
		)).toMatchSnapshot()
	})
})
