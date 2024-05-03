import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
 
  content: ["./src/**/*.tsx"],
  darkMode: ['class'],
  theme: {
    screens: {
      'min-sm': '306px',
      // => @media (min-width: 640px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
