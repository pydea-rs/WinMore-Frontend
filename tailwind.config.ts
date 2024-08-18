import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.filter-backdrop': {
          backdropFilter: 'saturate(190%) blur(16px)',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
export default config
