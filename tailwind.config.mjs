/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			colors: {
				"gris-cemento":"#4a5058",
				"gris-claro": "#e8e8e8",
				"gris-bg": "#eae8e4",
				"amarillo": "#f6ca0f"
			},
			fontFamily: {
                montserrat: ['Montserrat Variable', 'sans-serif'],
            },
		},
	},
	plugins: [
        require('flowbite/plugin')
    ]
}
