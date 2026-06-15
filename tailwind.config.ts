import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  //en tailwind podemos tener clases personalizadas
  theme: {
    extend: {
      backgroundImage:{
        "auth":"url('/grafico.svg')"
      },
      backgroundSize:{
        '30' :'30rem'
      }
    },
  },
  plugins: [],
};
export default config;
