module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // background-colors
        primary: "#fafafa",
        secondary: "#295CD4",
        tertiary: "#fff",
        quaternary: "#bdbdbd",
        quinary: "#004340",
        senary: "#212121",
        septenary: "#F3F8FF",
        octonary: "#212121",
        nonary: "#e0e0e0",
        denaray: "#f0fff4", // chips

        // text-colors
        textPrimary: "#5c5c5c",
        textSecondary: "#295CD4",
        textTertiary: "#7b7f82",
        textQuanternary: "#bdbdbd",
        textQuinary: "#004340",
        textNonary: "#e0e0e0",
        // util-colors
        progress: "#3580DE",
        modalShade: "#050505",
        neutral: "#efc83d",
        processing: "#29D459",
        danger: "#D96464",
        warning: "#38a169"
      },
      fontFamily: {
        sans: ["Roboto", "Helvetica", "Arial", "sans-serif"]
      },
      spacing: {
        px: "1px",
        0: "0px",
        0.5: "0.2rem",
        1: "0.4rem",
        1.5: "0.6rem",
        2: "0.8rem",
        2.5: "1rem",
        3: "1.2rem",
        3.5: "1.4rem",
        4: "1.6rem",
        5: "2rem",
        6: "2.4rem",
        7: "2.8rem",
        8: "3.2rem",
        9: "3.6rem",
        10: "4rem",
        11: "4.4rem",
        12: "4.8rem",
        14: "5.6rem",
        16: "6.4rem",
        20: "8rem",
        24: "9.6rem",
        28: "11.2rem",
        32: "12.8rem",
        36: "14.4rem",
        40: "16rem",
        44: "17.6rem",
        48: "19.2rem",
        52: "20.8rem",
        56: "22.4rem",
        60: "24rem",
        64: "25.6rem",
        72: "28.8rem",
        80: "32rem",
        96: "38.4rem"
      },
      fontSize: {
        xs: ["1.2rem", { lineHeight: "1.6rem" }],
        sm: ["1.4rem", { lineHeight: "2rem" }],
        base: ["1.6rem", { lineHeight: "2.4rem" }],
        lg: ["1.8rem", { lineHeight: "2.8rem" }],
        xl: ["2rem", { lineHeight: "2.8rem" }],
        "2xl": ["2.4rem", { lineHeight: "3.2rem" }],
        "3xl": ["3rem", { lineHeight: "3.2rem" }],
        "4xl": ["3.6rem", { lineHeight: "3.6rem" }],
        "5xl": ["4.8rem", { lineHeight: "4rem" }],
        "6xl": ["6rem", { lineHeight: "1.6rem" }],
        "7xl": ["7.2rem", { lineHeight: "1.6rem" }],
        "8xl": ["9.6rem", { lineHeight: "1.6rem" }],
        "9xl": ["8rem", { lineHeight: "1.6rem" }]
      },
      borderRadius: {
        custom: "0.4 rem",
        roundedButton: "50px"
      },
      backgroundImage: {
        customGradient:
          "linear-gradient(270deg, rgba(56, 178, 172, 0.3) 0%, rgba(56, 178, 172, 0) 100%)"
      },
      width: {
        "1/10": "10%"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
