import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'footer-texture': "url('/img/footer-texture.png')",
            },

            fontSize: {
                //# Custom font sizes
                xs: '0.85rem', // extra small
                sm: '0.975rem', // small
                base: '1.2rem', // default
                lg: '1.3rem', // large
                xl: '1.4rem', // extra large
                '2xl': '1.6rem', // 2x extra large
                '3xl': '1.975rem', // 3x extra large
                '4xl': '2.35rem', // 4x extra large
                '5xl': '3rem', // 5x extra large
                '6xl': '4rem', // 6x extra large
            },
        },
        colors: {
            primary: {
                gray_background: '#f0f0f2',
                //will add when we decide on color theme
            },

            //* default colors
            green: '#349934',
            blue: '#0000ff',
            red: '#ff0000',
            yellow: '#ffff00',
            white: '#ffffff',
            black: '#000000',
            gray: '#808080',
        },
    },
    plugins: [],
}
export default config
