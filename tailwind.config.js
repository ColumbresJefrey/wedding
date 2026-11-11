/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF7EE',
          200: '#F3EDE0',
          300: '#E6DCCB',
          400: '#D5C7B2',
          DEFAULT: '#FAF7EE',
        },
        champagne: {
          50: '#FAF6F0',
          100: '#F5EFE6',
          200: '#EADFCF',
          300: '#DCCBB3',
          400: '#C7AF90',
          500: '#B29472',
          DEFAULT: '#F5EFE6',
        },
        sage: {
          50: '#F4F6F4',
          100: '#E6ECE6',
          200: '#CDD9CD',
          300: '#A9C0A9',
          400: '#83A183',
          500: '#668266',
          600: '#4F6850',
          700: '#3D513E',
          800: '#2C3A2D',
          DEFAULT: '#668266',
        },
        gold: {
          50: '#FAF6ED',
          100: '#F3EAD3',
          200: '#E5D3A9',
          300: '#D4B87E',
          400: '#C29F5A',
          500: '#A88440',
          600: '#8A692E',
          DEFAULT: '#C29F5A',
        },
        charcoal: {
          900: '#1A1C19',
          800: '#2A2E2B',
          700: '#3F4440',
          600: '#5A615B',
          500: '#757D76',
          400: '#949B95',
          DEFAULT: '#2A2E2B',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(42, 46, 43, 0.07)',
        'luxury-hover': '0 25px 50px -12px rgba(42, 46, 43, 0.12)',
        'glow-gold': '0 0 25px rgba(194, 159, 90, 0.25)',
      },
      backgroundImage: {
        'paper-pattern': "radial-gradient(#C29F5A 0.5px, transparent 0.5px)",
      }
    },
  },
  plugins: [],
}

