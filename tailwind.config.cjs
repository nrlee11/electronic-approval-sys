/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./App.{js,ts,jsx,tsx}",
    "./index.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ], // src 없으니 이렇게
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans-base)"],
        mono: ["var(--font-mono-base)"],
      },
      // ✅ spacing을 토큰으로 통일 (p-4, gap-4 같은거)
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
      },
      // ✅ radius도 토큰으로 통일 (rounded-lg 등이 토큰 값 사용)
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        "4xl": "var(--radius-4xl)",
      },
      fontWeight: {
        light: "var(--font-weight-light)",
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },

      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        md: "var(--font-size-md)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
      },
      // styles/tokens.css 에서 정의한 값들
      //
      // ✅ shadcn 스타일처럼 “시맨틱 컬러 이름”을 토큰에 연결
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",

        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",

        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",

        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        "primary-hover": "var(--primary-hover)",
        "primary-disabled": "var(--primary-disabled)",
        "primary-disabled-foreground": "var(--primary-disabled-foreground)",

        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",

        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",

        success: "var(--success)",
        "success-foreground": "var(--success-foreground)",

        warning: "var(--warning)",
        "warning-foreground": "var(--warning-foreground)",

        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // brand
        "brand-blue1": "var(--brand-blue1)",
        "brand-blue1-foreground": "var(--brand-blue1-foreground)",
        "brand-blue2": "var(--brand-blue2)",
        "brand-blue2-foreground": "var(--brand-blue2-foreground)",
        "brand-blue3": "var(--brand-blue3)",
        "brand-blue3-foreground": "var(--brand-blue3-foreground)",
        "brand-blue4": "var(--brand-blue4)",
        "brand-blue4-foreground": "var(--brand-blue4-foreground)",
        "brand-blue5": "var(--brand-blue5)",
        "brand-blue5-foreground": "var(--brand-blue5-foreground)",

        // example
        "example-content": "var(--example-content)",
        "example-content-foreground": "var(--example-content-foreground)",
      },
    },
  },
  plugins: [],
};
