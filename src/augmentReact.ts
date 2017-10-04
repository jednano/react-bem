import {
	BEMBlockProps,
	BEMElementProps,
} from './types'

declare module 'react' {
	interface HTMLAttributes<T>
	extends BEMBlockProps, BEMElementProps {}
}
