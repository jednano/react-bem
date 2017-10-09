import { shallow } from 'enzyme'
import * as PT from 'prop-types'
import * as React from 'react'

import createBEMElement from './createBEMElement'

describe('createBEMElement', () => {

	it('extends input class with a displayName of "BEMElement(Bar)"', () => {
		class Bar extends React.Component {
			render() {
				return null
			}
		}
		const BarElement = createBEMElement(Bar)
		expect(BarElement.displayName).toEqual('BEMElement(Bar)')
	})

	it('extends input propTypes with a block validator', () => {
		class Bar extends React.Component {
			static propTypes = {
				bar: PT.string,
			}
			render() {
				return null
			}
		}
		const BarElement = createBEMElement(Bar)
		expect(BarElement.propTypes).toMatchSnapshot()
	})

	it('receives BEM block name via props', () => {
		class Bar extends React.Component {
			render() {
				expect((this.props as any).block).toBe('foo')
				return null
			}
		}
		const BarElement = createBEMElement(Bar)
		shallow(
			<BarElement block="foo" element="bar" />,
		)
	})

	it('merges modifiers prop with root node\'s modifiers', () => {
		class Bar extends React.Component {
			render() {
				return (
					<div modifiers="mod1" />
				)
			}
		}
		const BarElement = createBEMElement(Bar)
		expect(shallow(
			<BarElement block="foo" element="bar" modifiers="mod2" />,
		)).toMatchSnapshot()
	})
})
