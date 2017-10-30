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

	it('extends input contextTypes with a block validator', () => {
		class Bar extends React.Component {
			static contextTypes = {
				bar: PT.string,
			}
			render() {
				return null
			}
		}
		const BarElement = createBEMElement(Bar)
		expect(BarElement.contextTypes).toEqual({
			bar: PT.string,
			bemBlock: PT.string.isRequired,
		})
	})

	it('extends input propTypes with a element and modifiers validators', () => {
		class Bar extends React.Component {
			static propTypes = {
				baz: PT.string,
			}
			render() {
				return null
			}
		}
		const BarElement = createBEMElement(Bar)
		expect(BarElement.propTypes).toEqual({
			baz: PT.string,
			bemElement: PT.string,
			bemModifiers: PT.any,
		})
	})

	it('receives BEM block name via context', () => {
		class Bar extends React.Component {
			render() {
				expect(this.context).toMatchSnapshot()
				return null
			}
		}
		const BarElement = createBEMElement(Bar)
		shallow(
			<BarElement bemElement="bar" />,
			{
				context: {
					bemBlock: 'context-block',
				},
			},
		)
	})

	it('merges modifiers prop with root node\'s modifiers', () => {
		class Bar extends React.Component {
			render() {
				return (
					<div bemModifiers="mod1" />
				)
			}
		}
		const BarElement = createBEMElement(Bar)
		expect(shallow(
			<BarElement bemElement="bar" bemModifiers="mod2" />,
			{
				context: {
					bemBlock: 'foo',
				},
			},
		)).toMatchSnapshot()
	})
})
