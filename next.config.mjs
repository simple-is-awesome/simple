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
		publicRuntimeConfig: {
			NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
			NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
			NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
			NEXT_PUBLIC_KEYWORDS: process.env.NEXT_PUBLIC_KEYWORDS,
			NEXT_PUBLIC_FOOTER: process.env.NEXT_PUBLIC_FOOTER,
			NEXT_PUBLIC_POSTS_PERPAGE: process.env.NEXT_PUBLIC_POSTS_PERPAGE,
			NEXT_PUBLIC_GITHUB_REPO: process.env.NEXT_PUBLIC_GITHUB_REPO,
			NEXT_PUBLIC_SHOW_COMMENT: process.env.NEXT_PUBLIC_SHOW_COMMENT,
			NEXT_PUBLIC_INOREADER_CHANNEL: process.env.NEXT_PUBLIC_INOREADER_CHANNEL,
			NEXT_PUBLIC_RAINDROP: process.env.NEXT_PUBLIC_RAINDROP,
			NEXT_PUBLIC_OPENAI_API_KEY_AVAILABLE: process.env.NEXT_PUBLIC_OPENAI_API_KEY_AVAILABLE,
			NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY,
			NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		}
	})
))
