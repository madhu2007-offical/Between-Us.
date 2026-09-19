/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          50: '#FAF5F8',
          100: '#F5EBF2',
          200: '#EAD7E5',
          300: '#DBB7D2',
          400: '#C28EB7',
          500: '#A46397',
          600: '#864379',
          700: '#6C3060',
          800: '#4A1D42',
          900: '#381432',
          950: '#230A1F',
        },
        blush: {
          50: '#FFF7F8',
          100: '#FFEBF0',
          200: '#FFD6E1',
          300: '#FFB8CC',
          400: '#F98BAA',
          500: '#EE638A',
        },
        petal: {
          50: '#FAF7FC',
          100: '#F3ECF8',
          200: '#E6D7F1',
          300: '#D2BBE4',
          400: '#B897D2',
          500: '#9C72BD',
        },
        dustyrose: {
          50: '#FFF9F8',
          100: '#FDF0ED',
          200: '#F9D8D2',
          300: '#F3B8AD',
          400: '#E89384',
          500: '#D98880',
          600: '#BA5F56',
          700: '#96453E',
        },
        cream: {
          50: '#FDFBF8',
          100: '#FAF6F0',
          200: '#F4ECE1',
          300: '#E8DEC9',
          400: '#D8CBB0',
        },
        sage: {
          50: '#F3F8F5',
          100: '#E4EFE8',
          200: '#C9E1D2',
          500: '#528263',
          700: '#355841',
        },
      },
      fontFamily: {
        sans: ['Quicksand', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 6px 24px -3px rgba(74, 29, 66, 0.07)',
        'float': '0 10px 32px -4px rgba(74, 29, 66, 0.14)',
        'modal': '0 24px 48px -12px rgba(56, 20, 50, 0.28)',
        'petal': '0 8px 25px -4px rgba(238, 99, 138, 0.25)',
      },
    },
  },
  plugins: [],
};
