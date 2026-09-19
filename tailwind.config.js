/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand Design Tokens
        'violet-primary': '#A67FD7', // older-sister / guidance actions
        'coral-primary': '#F885A5',  // her / personal actions
        'overlap-deep': '#8D63B1',   // connection moments (sparingly used)
        'base-cream': '#EBE4E2',     // default warm background (NEVER pure white)
        'ink': '#2C2523',            // near-black warm grey text
        'safety-amber': '#C97A3E',   // distinct calm amber for safety/crisis

        // Supporting Tonal Palettes
        violet: {
          50: '#F7F3FC',
          100: '#EFE7FA',
          200: '#DFCEF4',
          300: '#CDB1ED',
          400: '#BA94E5',
          500: '#A67FD7',
          600: '#8D63B1',
          700: '#714994',
          800: '#543173',
          900: '#391B52',
        },
        coral: {
          50: '#FFF5F8',
          100: '#FFE8EF',
          200: '#FFD1DF',
          300: '#FFB3C9',
          400: '#FC99B5',
          500: '#F885A5',
          600: '#DE6487',
          700: '#B94467',
          800: '#8E2847',
          900: '#5C122A',
        },
        cream: {
          50: '#F7F3F1',
          100: '#EBE4E2',
          200: '#DDD4D1',
          300: '#CEC0BC',
          400: '#BAAAA5',
          500: '#9C8983',
        },
        sage: {
          50: '#F3F7F4',
          100: '#E4EDE6',
          500: '#5A7F66',
          700: '#3D5B46',
        }
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Nunito Sans', '-apple-system', 'sans-serif'],
        sans: ['Nunito Sans', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Full Type Scale with explicit px and line-heights
        'display': ['32px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['26px', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        'h2': ['20px', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['15px', { lineHeight: '1.45', fontWeight: '500' }],
        'caption': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
        'micro': ['11px', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '600' }],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(44, 37, 35, 0.06)',
        'float': '0 8px 30px -4px rgba(44, 37, 35, 0.12)',
        'modal': '0 20px 40px -10px rgba(44, 37, 35, 0.22)',
        'sparkle': '0 0 35px 8px rgba(166, 127, 215, 0.45)',
      },
      transitionTimingFunction: {
        'sparkle-bloom': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ribbon-morph': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
