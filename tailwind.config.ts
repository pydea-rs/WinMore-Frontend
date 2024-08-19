import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        fractul: ['var(--font-fractul)'],
        dmSans: ['var(--font-dm-sans)'],
      },

      colors: { secondary: 'rgba(121, 137, 152, 1)' },
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1142px',
        // '2xl': '1142px',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-navy': 'linear-gradient(90deg, rgba(45, 48, 93, 1),rgba(94, 101, 195, 1))',
        'gradient-hot-pink': 'linear-gradient(90deg, rgba(199, 56, 184, 1),rgba(97, 27, 90, 1))',
        'gradient-dark-purple': 'linear-gradient(0deg, rgba(45, 48, 93, 0.42), rgba(45, 48, 93, 0.42)),linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
      },
      fontSize: {
        // base: '1rem',
        // xl: '1.25rem',
        relative2xl: 'calc(1.5rem + 2.8vmax)',
        // '3xl': '1.953rem',
        // '4xl': '2.441rem',
        // '5xl': '3.052rem',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.filter-backdrop': {
          backdropFilter: 'saturate(100%) blur(13px)',
        },
      }

      addUtilities(newUtilities, ['responsive'])
    },
  ],
}
export default config
