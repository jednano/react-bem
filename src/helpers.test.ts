import {
	getDisplayName,
} from './helpers'

describe('#getDisplayName', () => {

	it('returns the static displayName property of a class before its class name', () => {
		class Foo {
			static displayName = 'Bar'
		}
		expect(getDisplayName(Foo)).toEqual('Bar')
	})

	it('returns the class name of a class if the class has no static displayName', () => {
		class Foo {}
		expect(getDisplayName(Foo)).toEqual('Foo')
	})

	it('returns "Component" if no displayName or name is found', () => {
		// tslint:disable-next-line:no-any
		expect(getDisplayName({} as any)).toEqual('Component')
	})
})
