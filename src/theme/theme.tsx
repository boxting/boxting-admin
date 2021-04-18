import { theme } from '@chakra-ui/core';
import { merge } from '@chakra-ui/utils';

const boxtingTheme = merge(theme, {
	fonts: {
		body: `'Open Sans', sans-serif`,
		heading: `'Open Sans', sans-serif`,
		mono: `'Open Sans', sans-serif`,
	},
	fontWeights: {
		normal: 400,
		semibold: 600,
		bold: 700,
		extrabold: 800,
	},
	textStyles: {
		h1: {
			fontSize: [`1.3rem`, `1.32rem`, `1.35rem`, `1.4rem`],
			fontWeight: `semibold`,
			lineHeight: `150%`,
			letterSpacing: `0%`,
			color: `text`,
		},
		h2: {
			fontSize: [`1rem`, `1.05rem`, `1.1rem`, `1.16rem`],
			fontWeight: `semibold`,
			lineHeight: `150%`,
			letterSpacing: `0%`,
			color: `text`,
		},
		p: {
			fontSize: [`1rem`, `0.98rem`, `0.95rem`, `0.95rem`],
			fontWeight: `normal`,
			lineHeight: `150%`,
			letterSpacing: `0.01rem`,
			color: `text`,
		},
		small: {
			fontSize: [`0.9rem`, `0.85rem`, `0.85rem`, `0.85rem`],
			fontWeight: `normal`,
			lineHeight: `150%`,
		},
		label: {
			fontSize: [`0.62rem`, `0.62rem`, `0.62rem`, `0.62rem`],
			fontWeight: `semibold`,
			color: `lightText.900`,
		},
	},
	colors: {
		text: `#18191F`,
		placeholder: `#AAAAAA`,
		background: `#fff`,
		primary: `#6200EE`,
		primaryHover: `#4903ac`,
		secondary: `#03DAC5`,
		lightBackground: {
			900: `#D9DBE1`,
			800: `#EEEFF4`,
			200: `#fafafa`,
			100: `#FEFEFE`,
		},
		lightText: {
			900: `#232323`,
			800: `#393939`,
			200: `#656565`,
			100: `#AAAAAA`,
		},
		modes: {
			dark: {
				text: `#fff`,
				placeholder: `#AAAAAA`,
				background: `#010`,
				primary: `#6200EE`,
				secondary: `#03DAC5`,
				lightBackground: {
					900: `#232323`,
					800: `#222`,
					200: `#121`,
					100: `#020`,
				},
				lightText: {
					900: `#AAAAAA`,
					800: `#656565`,
					200: `#393939`,
					100: `#232323`,
				},
			},
			light: {
				text: `#18191F`,
				placeholder: `#555`,
				background: `#fff`,
				primary: `#6200EE`,
				secondary: `#03DAC5`,
				lightBackground: {
					900: `#D9DBE1`,
					800: `#EEEFF4`,
					200: `#fafafa`,
					100: `#FEFEFE`,
				},
				lightText: {
					900: `#232323`,
					800: `#393939`,
					200: `#656565`,
					100: `#AAAAAA`,
				},
			},
		},
	},
});

export default boxtingTheme;
