// @ts-check
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://cyberuni.github.io',
	base: '/path-equal/',
	server: { open: '/path-equal/' },
	vite: { plugins: [tailwindcss()] },
	integrations: [
		starlight({
			title: 'path-equal',
			description: 'Compare file paths across Windows and POSIX separator conventions.',
			favicon: '/img/logo.svg',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				alt: 'path-equal',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cyberuni/path-equal' }],
			customCss: ['./src/styles/global.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Path normalization', slug: 'guides/normalization' },
						{ label: 'Comparison limits', slug: 'guides/limits' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Overview', slug: 'reference' },
						{ label: 'pathEqual', slug: 'reference/path-equal' },
					],
				},
			],
		}),
	],
})
