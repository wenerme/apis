
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [`${__dirname}/packages/src/**/*.{html,ts,tsx,js}`, `${__dirname}/apps/src/**/*.{html,ts,tsx,js}`],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp'), require('daisyui')],
  daisyui: {
    // themes: [
    //   {
    //     light: {
    //       ...require('daisyui/src/colors/themes')['[data-theme=light]'],
    //     },
    //   },
    // ],
  },
};
