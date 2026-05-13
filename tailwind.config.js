/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spendwise: {
          primary: "#4F46E5",
          background: "#F8FAFC",
          sidebar: "#FFFFFF",
          border: "#E2E8F0",
          text: {
            primary: "#1E293B",
            secondary: "#64748B",
            muted: "#94A3B8",
          },
          status: {
            success: {
              bg: "#F0FDF4",
              text: "#15803D",
              border: "#DCFCE7",
            },
            warning: {
              bg: "#FFFBEB",
              text: "#B45309",
              border: "#FEF3C7",
            },
            danger: {
              bg: "#FEF2F2",
              text: "#B91C1C",
              border: "#FEE2E2",
            },
            neutral: {
              bg: "#F8FAFC",
              text: "#475569",
              border: "#F1F5F9",
            }
          }
        }
      },
      boxShadow: {
        'enterprise': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'enterprise-elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'button-press': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.97)' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'button-press': 'button-press 0.15s ease-in-out',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
