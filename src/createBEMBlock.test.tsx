import { render } from 'enzyme'
import * as PT from 'prop-types'
import * as React from 'react'

import createBEMBlock from './createBEMBlock'
import createBEMElement from "./createBEMElement";

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

	it('extends input childContextTypes with a block validator', () => {
		class Foo extends React.Component {
			static childContextTypes = {
				bar: PT.string,
			}
			render() {
				return null
			}
		}
		const FooBlock = createBEMBlock(Foo)
		expect(FooBlock.childContextTypes).toEqual({
			bar: PT.string,
			block: PT.string.isRequired,
		})
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
			static contextTypes = {
				block: PT.string.isRequired,
			}
			render() {
				expect(this.context).toMatchSnapshot()
				return null
			}
		}
		const FooBlock = createBEMBlock(Foo)
		render(
			<FooBlock block="context-block">
				<FooItem />
			</FooBlock>,
		)
	})

	it('extends getChildContext() with the block value from props', () => {
		class Foo extends React.Component {
			static childContextTypes = {
				bar: PT.string.isRequired,
			}
			getChildContext() {
				return {
					bar: 'baz',
				}
			}
			render() {
				return (
					<div>
						{this.props.children}
					</div>
				)
			}
		}
		class FooItem extends React.Component {
			static contextTypes = {
				bar: PT.string.isRequired,
				block: PT.string.isRequired,
			}
			render() {
				expect(this.context).toMatchSnapshot()
				return null
			}
		}
		const FooBlock = createBEMBlock(Foo)
		render(
			<FooBlock block="context-block">
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

	it('Renders README example with correct className as shown', () => {
		class Bar extends React.Component {
			static defaultProps = {
				element: 'bar'
			}
			render() {
				return (
					<div>
						<div element="corge" className="save-me">
							garpley
						</div>
					</div>
				)
			}
		}

		const BarElement = createBEMElement(Bar);

		class Foo extends React.Component {
			static defaultProps = {
				block: 'foo'
			}
			render() {
				return (
					<div modifiers="mod1 mod2">
						<BarElement />
						<div element="baz" modifiers={['mod3', { mod4: true }]}>
							qux
						</div>
					</div>
				)
			}
		}
		const FooBlock = createBEMBlock(Foo);
		expect(render(<FooBlock/>)).toMatchSnapshot()
	})
})
