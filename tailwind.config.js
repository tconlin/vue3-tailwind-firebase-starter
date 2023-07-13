import colors from 'windicss/colors'

module.exports = {
  important: true,
  purge: {
    enabled: true,
    content: [
      './public/**/*.html',
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx'
    ]
  },
  theme: {
    extend: {
      colors: {
        blue: colors.blue,
        indigo: colors.indigo,
        cyan: colors.cyan,
        rose: colors.rose,
        sky: colors.sky,
        red: colors.red,
        gray: colors.gray,
        green: colors.green,
        yellow: colors.yellow,
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b'
        },
        primary: '#f4f4f5'
      },
      fontFamily: {
        sans: ['Inter']
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    }
  }
}
