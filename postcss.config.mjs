/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    '@fullhuman/postcss-purgecss': {
      content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
      safelist: [/^ant-/],
    },
  },
};

export default config;
