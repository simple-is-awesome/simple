import Link from 'next/link'
import Head from 'next/head'
import Layout from 'components/Layout'
import Date from 'components/Date'
import { getPostsListBySearchTerm } from 'lib/posts'

// 搜索页面
export default function SearchPage({ searchResults, term }) {
	return (
		<Layout>
			{/* 标题 */}
			<Head>
				<title>搜索结果：{term}</title>
			</Head>
			{/* 搜索结果 */}
			<section className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-5">
				<div className="hidden lg:block lg:col-span-2" />
				<div className="col-span-full lg:col-span-7">
					<h1 className="text-2xl font-semibold mb-4">搜索结果：{term}</h1>
					{searchResults.length === 0 ? (
						<p className="text-gray-600">没有找到相关结果</p>
					) : (
						<ul className="grid grid-cols-1 gap-8">
							{searchResults.map(({ year, month, slug, title, date,summary }) => (
								<li
									key={slug}
									className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-600 dark:text-gray-100">
									<h3 className="text-xl font-semibold mb-4">
										<Link href={`/${year}/${month}/${slug}`}>{title}</Link>
									</h3>
									<small className="text-gray-600 dark:text-gray-100">
										<Date dateString={date} />
									</small>
									<p className="text-gray-700 mt-2 dark:text-gray-100">{summary}</p>
								</li>
							))}
						</ul>
					)}
				</div>
			</section>
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const term = context.query.term || ''
	const searchResults = getPostsListBySearchTerm(term)

	return {
		props: {
			searchResults,
			term,
		},
	}
}
