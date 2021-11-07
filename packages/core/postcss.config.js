module.exports = {
  content: ['index.html'],
  options: {
    safelist: [
      /data-theme$/,
    ]
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
