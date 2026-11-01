/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D7C66', dark: '#0A5C4D', light: '#14A387',
          50: '#E8F5F2', 100: '#C5E8E1', 200: '#8BD1C4', 300: '#4DB9A7',
          400: '#14A387', 500: '#0D7C66', 600: '#0B6352', 700: '#0A5C4D',
          800: '#073F34', 900: '#052821',
        },
        accent: { DEFAULT: '#41B3A2', light: '#7DD3C4', soft: '#E0F2EF' },
        warning: { DEFAULT: '#E76F51', light: '#F4A896', soft: '#FDE8E2' },
        caution: { DEFAULT: '#F59E0B', soft: '#FEF3C7' },
        info: { DEFAULT: '#60A5FA', soft: '#DBEAFE' },
        neutral: {
          50: '#FAFAF9', 100: '#F5F5F4', 200: '#E7E5E4', 300: '#D6D3D1',
          400: '#A8A29E', 500: '#78716C', 600: '#57534E', 700: '#44403C',
          800: '#292524', 900: '#1C1917',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        heartbeat: { '0%,100%': { transform: 'scale(1)' }, '14%': { transform: 'scale(1.15)' }, '28%': { transform: 'scale(1)' }, '42%': { transform: 'scale(1.15)' }, '70%': { transform: 'scale(1)' } },
        pulseRing: { '0%': { transform: 'scale(0.8)', opacity: '0.8' }, '100%': { transform: 'scale(2)', opacity: '0' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        ecg: { '0%': { strokeDashoffset: '300' }, '100%': { strokeDashoffset: '0' } },
      },
      animation: {
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        pulseRing: 'pulseRing 2s ease-out infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        ecg: 'ecg 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};
