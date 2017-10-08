import { render } from 'enzyme'
import * as React from 'react'

import createBEMBlock from './createBEMBlock'
import createBEMElement from './createBEMElement'

describe('react-bem HOCs', () => {

	class Foo extends React.Component {
		render() {
			return (
				<div children={this.props.children} />
			)
		}
	}

	const FooBlock = createBEMBlock(Foo)

	class Item extends React.Component {
		render() {
			return (
				<div />
			)
		}
	}

	const ItemElement = createBEMElement(Item)

	it('renders an element within a block within a block', () => {
		expect(render(
			<FooBlock block="b1">
				<ItemElement element="e1" />
				<FooBlock block="b2">
					<ItemElement element="e2" />
				</FooBlock>
			</FooBlock>
		)).toMatchSnapshot()
	})
})
