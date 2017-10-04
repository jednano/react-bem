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
			block: PT.string.isRequired,
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
			<BarElement element="bar" />,
			{
				context: {
					block: 'context-block',
				},
			},
		)
	})
})
