/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#101715',
        sage: '#1C4432',
        forest: '#123728',
        limestone: '#173025',
        porcelain: '#F3F0E9',
        copper: '#B7804B',
        champagne: '#D0A06B',
        walnut: '#684C38',
        ink: '#101715',
        emerald: '#28573D',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'wider-2': '0.15em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
