import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import NextBundleAnalyzer from '@next/bundle-analyzer'
import nextTranslate from 'next-translate-plugin'

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [],
	},
})

const withBundleAnalyzer = NextBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

export default nextTranslate(withBundleAnalyzer(
	withMDX({
		pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
		reactStrictMode: true,
		output: 'standalone',
		webpack: (config) => {
			config.resolve.fallback = { fs: false }
			return config
		},
		i18n: {
			defaultLocale: 'zh',
			locales: ['zh', 'en']
		},
		async rewrites() {
			return [
			  {
					source: '/:locale/rss.xml',
					destination: '/rss.xml',
					locale: false
			  },
			]
		  },
	})
))
