/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-color': '#1868B7',
        hovered: 'rgb(46, 142, 238)',
        focused: 'rgb(138, 147, 155)',
        overlay: 'rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
};
