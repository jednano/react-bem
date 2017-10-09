import { BEMElementProps } from './types'

declare module 'react' {
	interface HTMLAttributes<T> extends BEMElementProps {}
}
