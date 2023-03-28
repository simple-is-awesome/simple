import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import NextBundleAnalyzer from '@next/bundle-analyzer'

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [],
	},
})

// 添加这一行来配置NextBundleAnalyzer
const withBundleAnalyzer = NextBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(
	withMDX({
		pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
		reactStrictMode: true,
		async rewrites() {
			return [
				{
					source: '/sitemap.xml',
					destination: '/api/sitemap',
				},
			]
		},
		webpack: (config) => {
			config.resolve.fallback = { fs: false }
			return config
		},
	})
)
