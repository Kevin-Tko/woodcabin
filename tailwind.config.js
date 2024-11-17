/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'],
			sono: ['Sono', 'sans-serif'],
		},
		screens: {
			// => @media (min-width: 320px) { ... }
			mobile: '425px',
			// => @media (min-width: 481px) { ... }
			tablet: '768px',
			// => @media (min-width: 769px) { ... }
			laptop: '1024px',
			// => @media (min-width: 1025px) { ... }
			desktop: '1440px',
			// => @media (min-width: 1201px) { ... }
			tvs: '2560px',
		},
		extend: {
			gridTemplateColumns: {
				// Complex site-specific column configuration
				applayoutcols: '20fr 80fr',
				navlinkcols: '30fr 70fr',
				menulayout: 'auto 1fr',
				tabledata: '5% 25% 25% 25% 5% 5%',
				today: '1fr auto 2fr 1fr 1fr',
			},
			gridTemplateRows: {
				applayoutrows: '10fr 90fr',
			},
		},
	},
	plugins: [],
};
