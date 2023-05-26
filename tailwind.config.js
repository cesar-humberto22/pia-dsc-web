module.exports = {
    content: [
        "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            screens: {
                'phone': '0px',
                'tablet': '640px',
                'desktop': '1280px',
            },
            colors: {
                "primary": {
                    50: "#FFEFEB",
                    100: "#FFE4DB",
                    200: "#FFC4B3",
                    300: "#FFA98F",
                    400: "#FF8A66",
                    500: "#FF7043",
                    600: "#FF3C00",
                    700: "#C22D00",
                    800: "#801E00",
                    900: "#420F00",
                    950: "#1F0700"
                },
                "secondary": {
                    50: "#EDF8F7",
                    100: "#DBF0EE",
                    200: "#B7E1DD",
                    300: "#93D2CC",
                    400: "#72C5BD",
                    500: "#4DB6AC",
                    600: "#3D948C",
                    700: "#2D6C66",
                    800: "#1E4844",
                    900: "#0F2422",
                    950: "#071211"
                },
                "tertiary": {
                    50: "#FDF2F2",
                    100: "#FAE5E5",
                    200: "#F5C7C7",
                    300: "#F0ADAD",
                    400: "#EA8F8F",
                    500: "#E57373",
                    600: "#DA3939",
                    700: "#B02121",
                    800: "#741616",
                    900: "#3C0B0B",
                    950: "#1E0606"
                }
            }
        }
    },
    plugins: []
}
