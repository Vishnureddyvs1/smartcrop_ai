/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* light-gray */
        input: "var(--color-input)", /* white */
        ring: "var(--color-ring)", /* professional-blue */
        background: "var(--color-background)", /* near-white */
        foreground: "var(--color-foreground)", /* dark-charcoal */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep-forest-green */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* sage-green */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* clear-red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* subtle-gray */
          foreground: "var(--color-muted-foreground)", /* medium-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* professional-blue */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* dark-charcoal */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white */
          foreground: "var(--color-card-foreground)", /* dark-charcoal */
        },
        success: {
          DEFAULT: "var(--color-success)", /* vibrant-green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* warm-amber */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* clear-red */
          foreground: "var(--color-error-foreground)", /* white */
        },
        surface: {
          DEFAULT: "var(--color-surface)", /* subtle-gray */
          foreground: "var(--color-surface-foreground)", /* dark-charcoal */
        },
        'text-primary': "var(--color-text-primary)", /* dark-charcoal */
        'text-secondary': "var(--color-text-secondary)", /* medium-gray */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevated': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.8',
          },
        },
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}