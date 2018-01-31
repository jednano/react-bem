import {
	BEMModifiers,
	joinBEMElement,
	joinBEMModifiers,
} from 'bem-helpers'

export default function BEMBlock(
	/**
	 * The name of the BEM block that will prefix all class names.
	 */
	blockName: string,
	{
		elementSeparator = '__',
		modifierSeparator = '--',
	}: {
		/**
		 * The separator used between the BEM block and element name.
		 * The default is "__" (e.g., foo__bar).
		 */
		elementSeparator?: string
		/**
		 * The separator used between the BEM element and modifier names.
		 * The default is "--" (e.g., foo__bar--baz).
		 */
		modifierSeparator?: string
	} = {},
) {
	return ((
		elementOrModifiers?: string | BEMModifiers,
		modifiers: BEMModifiers = {},
	) => ((typeof elementOrModifiers !== 'string')
			? joinBEMModifiers(
				blockName,
				elementOrModifiers as BEMModifiers,
				modifierSeparator,
			)
			: joinBEMModifiers(
				joinBEMElement(blockName, elementOrModifiers, elementSeparator),
				modifiers,
				modifierSeparator,
			)
	).join(' ')) as {
		(
			/**
			 * If specified, the first class name returned will be the BEM block and element names joined (e.g., foo__bar).
			 */
			element?: string,
			/**
			 * If specified, the last class names returned will be the joined BEM block and element followed by any number of modifiers provided (e.g., foo__bar--mod1 foo__bar--mod2)
			 */
			modifiers?: BEMModifiers,
		): string
		(
			/**
			 * If specified, the last class names returned will be the BEM block name followed by any number of modifiers provided (e.g., foo--mod1 foo--mod2).
			 */
			modifiers?: BEMModifiers,
		): string
	}
}
