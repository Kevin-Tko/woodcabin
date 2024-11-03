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
            mobile: '320px',
            // => @media (min-width: 481px) { ... }
            tablet: '481px',
            // => @media (min-width: 769px) { ... }
            laptop: '769px',
            // => @media (min-width: 1025px) { ... }
            desktops: '1025px',
            // => @media (min-width: 1201px) { ... }
            tvs: '1201px',
        },
        extend: {
            gridTemplateColumns: {
                // Complex site-specific column configuration
                applayoutcols: '20fr 80fr',
                menulayout: 'auto 1fr',
                tabledata: '5% 25% 25% 25% 5% 5%',
            },
            gridTemplateRows: {
                applayoutrows: '10fr 90fr',
            },
        },
    },
    plugins: [],
}
