const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	mode: 'jit',

	content: [
		'src/*.{html,js,jsx,svelte,ts}',
		'src/**/*.{html,js,jsx,svelte,ts}',
		'./node_modules/@fdti/designsystem/*'
	],
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],

	theme: {
		extend: {
			fontFamily: {
				quattrocento: ['Quattrocento Sans', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				// Primary Color
				darkGrey: {
					DEFAULT: '#1D2024',
					1: '#555555',
					2: '#BBBCBD'
				},
				yellow: {
					DEFAULT: '#F9D089'
				},

				// Secondary Color
				grey: {
					DEFAULT: '#525659',
					2: '#242930'
				},

				lightGrey: {
					DEFAULT: '#E6E6E9'
				},
				grey1: '#525659'
			},

			visibility: ['hover', 'focus'],

			boxShadow: {
				4: '0px 4px 4px rgba(0, 0, 0, 0.25)'
			},

			backgroundImage: {
				'gradient-1': 'linear-gradient(104.83deg, #000000 0.66%, #555555 100%)',
				'gradient-2': 'linear-gradient(150deg, #1d2024 60%, #555555)'
			}
		}
	},

	variants: {
		extend: {
			textColor: ['visited'],
			backgroundColor: ['active']
		}
	}
};

module.exports = config;
