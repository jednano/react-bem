import { shallow } from 'enzyme'
import * as PT from 'prop-types'
import * as React from 'react'

import createBEMElementSFC from './createBEMElementSFC'

describe('createBEMElementSFC', () => {

	it('extends input class with a displayName of "BEMElement(Bar)"', () => {
		const Bar: React.SFC = () => null
		const BarElement = createBEMElementSFC(Bar)
		expect(BarElement.displayName).toEqual('BEMElement(Bar)')
	})

	it('extends input contextTypes with a block validator', () => {
		const Bar: React.SFC = () => null
		Bar.contextTypes = {
			bar: PT.string,
		}
		const BarElement = createBEMElementSFC(Bar)
		expect(BarElement.contextTypes).toEqual({
			bar: PT.string,
			block: PT.string.isRequired,
		})
	})

	it('extends input propTypes with a element and modifiers validators', () => {
		const Bar: React.SFC = () => null
		Bar.propTypes = {
			baz: PT.string,
		}
		const BarElement = createBEMElementSFC(Bar)
		expect(BarElement.propTypes).toEqual({
			baz: PT.string,
			element: PT.string,
			modifiers: PT.any,
		})
	})

	it('receives BEM block name via context', () => {
		const Bar: React.SFC = (prop, context) => {
			expect(context).toMatchSnapshot()
			return null
		}
		const BarElement = createBEMElementSFC(Bar)
		shallow(
			<BarElement element="bar" />,
			{
				context: {
					block: 'context-block',
				},
			},
		)
	})

	it('merges modifiers prop with root node\'s modifiers', () => {
		const Bar: React.SFC = () => (
			<div modifiers="mod1" />
		)
		const BarElement = createBEMElementSFC(Bar)
		expect(shallow(
			<BarElement element="bar" modifiers="mod2" />,
			{
				context: {
					block: 'foo',
				},
			},
		)).toMatchSnapshot()
	})
})
