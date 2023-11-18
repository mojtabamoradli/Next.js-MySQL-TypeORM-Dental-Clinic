/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/utils/**/*.{js,ts,jsx,tsx,mdx}", "./src/layout/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        Irancell_Medium: ["var(--font-irancell-medium)"],
        Irancell_Light: ["var(--font-irancell-light)"],
        Irancell_ExtraLight: ["var(--font-irancell-extralight)"],
        Irancell_Bold: ["var(--font-irancell-bold)"],
      },
      boxShadow: {
        custom: "0 10px 30px #c6bebe",
      },

      keyframes: {
        appear: {
          "0%": { opacity: "0", filter: "blur(1px)" },
          "100%": { opacity: "100%", filter: "blur(0px)" },
        },
        come: {
          "0%": { opacity: "0", filter: "blur(1px)", transform: "translateX(100%)" },
          "100%": { opacity: "100%", filter: "blur(0px)", transform: "translateX(0)" },
        },
        comeFromUp: {
          "0%": { opacity: "0", filter: "blur(1px)", transform: "translateY(-100%)" },
          "100%": { opacity: "100%", filter: "blur(0px)", transform: "translateY(0)" },
        },
        comeFromDown: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        goToDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        wave: {
          "  0%": { transform: "rotate( 0.0deg)" },
          " 10%": { transform: "rotate(14.0deg)" } /* The following five values can be played with to make the waving more or less extreme */,
          " 20%": { transform: "rotate(-8.0deg)" },
          " 30%": { transform: "rotate(14.0deg)" },
          " 40%": { transform: "rotate(-4.0deg)" },
          " 50%": { transform: "rotate(10.0deg)" },
          " 60%": { transform: "rotate( 0.0deg)" } /* Reset for the last half to pause */,
          "100%": { transform: "rotate( 0.0deg)" },
        },
        not: {
          "  0%": { transform: "rotate( 0.0deg)" },
          " 10%": { transform: "rotate(2.0deg)" } /* The following five values can be played with to make the waving more or less extreme */,
          " 20%": { transform: "rotate(-1.0deg)" },
          " 30%": { transform: "rotate(2.0deg)" },
          " 40%": { transform: "rotate(-1.0deg)" },
          " 50%": { transform: "rotate(1.0deg)" },
          " 60%": { transform: "rotate( 0.0deg)" } /* Reset for the last half to pause */,
          "100%": { transform: "rotate( 0.0deg)" },
        },
        animateLight: {
          "0%": {
            filter: "brightness(0.8)",
          },
          "50%": {
            filter: "brightness(1.2)",
          },
          "100%": {
            filter: "brightness(0.8)",
          },
        },
        fadeIn: {
          "5%": {
            opacity: "1",
            visibility: "visible",
            transform: "translateY(0)",
          },
          "90%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        wavyPulse: {
          "0%": {
            boxShadow: "0 0 0 0px rgba(0, 0, 0, 0.14)",
          },
          "100%": {
            boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 4s",
        appearFast: "appear .5s ",
        appear: "appear 1.5s ",
        come: "come 1.5s ",
        comeFromUp: "comeFromUp 1.5s ",
        comeFromDown: "comeFromDown 1.5s ",
        goToDown: "goToDown 1.5s ",
        wave: "wave 1.5s infinite",
        not: "not 1s ",
        animateLight: "animateLight 5s infinite",
        wavyPulse: "wavyPulse 2s infinite",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {

      textColor: ["visited", "hover"],
    },
  },
};
