import Link from 'next/link'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import Layout from 'components/Layout'
import Date from 'components/Date'
import BackButton from 'components/Backbutton'
import { getPostsListBySearchTerm } from 'lib/posts'

// 搜索页面
export default function SearchPage({ searchResults, term }) {
	const { t } = useTranslation('search')
	const searchResultsTitle = t('SearchResults')
	const nothingFound = t('NothingFound')
	return (
		<Layout>
			{/* 标题 */}
			<Head>
				<title>{term}</title>
			</Head>
			{/* 搜索结果 */}
			<section className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-5">
				<div className="hidden lg:block lg:col-span-2" />
				<div className="col-span-full lg:col-span-7">
					<h1 className="text-2xl font-semibold mb-4 text-center">{searchResultsTitle}：{term}</h1>
					{searchResults.length === 0 ? (
						<p className="text-gray-600 text-2xl flex items-center justify-center h-full">{nothingFound}</p>
					) : (
						<ul className="grid grid-cols-1 gap-8 mb-8">
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
					<BackButton className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-100 dark:bg-gray-600 dark:hover:bg-gray-500" />
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
