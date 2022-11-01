module.exports = {
  purge: ['./index.html','./src/**/*.{vue,js}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-1deg)'
          },
          '50%': {
            transform: 'rotate(1deg)'
          },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    },
  },
  variants: {
    extend: {
      tableLayout: ['hover', 'focus'],
      translate: ['motion-safe'],
      display: ["group-hover"],
    },
  },
  plugins: [],
}
