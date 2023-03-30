import Head from 'next/head'
import Link from 'next/link'
import Date from 'components/Date'
import Layout from 'components/Layout'
import Inoreader from 'components/Inoreader'
import RecentPosts from 'components/RecentPosts'
import TagCloud from 'components/TagCloud'
import { getSortedPostsData, getAllTags } from 'lib/posts'
import config from 'config'
import { useContext,useState } from 'react'
import SearchContext from 'contexts/SearchContext'
import generateRSSFeed from 'lib/generateRSSFeed'

export default function Home({ allPostsData, recentPosts, allTags, handleResetSearch }) {

	const { searchResults, searchPerformed } = useContext(SearchContext)
	const [currentPage, setCurrentPage] = useState(1)

	const renderPosts = () => {
		const postsPerPage = config.postsPerPage
		const startIndex = (currentPage - 1) * postsPerPage
		const endIndex = startIndex + postsPerPage
		const postsToRender = searchPerformed ? searchResults.slice(startIndex, endIndex) : allPostsData.slice(startIndex, endIndex)

		if (postsToRender.length === 0) {
			return (
				<div className="text-center">
					<h2 className="text-2xl font-semibold mb-4">
						{searchPerformed ? '没有找到相关文章' : '暂无文章'}
					</h2>

					<div className="my-12 mx-0">
						<Link href="/" onClick={handleResetSearch}>← Back to home</Link>
					</div>
				</div>
			)
		}

		return (
			<>
				<ul className="grid grid-cols-1 gap-8">
					{postsToRender.map(({ date, slug, title, summary }) => {
						const [year, month] = date.split('-')
						return (
							<li
								key={slug}
								className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-600 dark:text-gray-100"
							>
								<h3 className="text-xl font-semibold mb-4">
									<Link href={`/${year}/${month}/${slug}`}>{title}</Link>
								</h3>
								<small className="text-gray-600 dark:text-gray-100">
									<Date dateString={date} />
								</small>
								<p className="text-gray-700 mt-2 dark:text-gray-100">{summary}</p>
							</li>
						)
					})}
				</ul>
				{renderPagination(postsPerPage)}
			</>
		)
	}

	const renderPagination = (postsPerPage) => {
		const totalPages = searchPerformed
		  ? Math.ceil(searchResults.length / postsPerPage)
		  : Math.ceil(allPostsData.length / postsPerPage)
	  
		return (
		  <div className="flex justify-center my-4">
				{currentPage !== 1 && (
			  <button
						className="px-4 py-2 bg-gray-300 text-black rounded mr-2 dark:bg-gray-600 dark:text-gray-100"
						onClick={() =>
				  setCurrentPage((prevPage) => Math.max(1, prevPage - 1))
						}
						disabled={currentPage === 1}
			  >
				Previous
			  </button>
				)}
				<span className="px-4 py-2">
					{currentPage} / {totalPages}
				</span>
				{currentPage !== totalPages && (
					<button
						className="px-4 py-2 bg-gray-300 text-black rounded ml-2 dark:bg-gray-600 dark:text-gray-100"
						onClick={() =>
							setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1))
						}
						disabled={currentPage === totalPages}
					>
				Next
					</button>
				)}
			</div>
		)
	  }
	  

	  return (
		<Layout handleResetSearch={handleResetSearch}>
			<Head>
				<title>{config.siteTitle}</title>
			</Head>
			<section className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-5">
				<div className="hidden lg:block lg:col-span-2" />
				<div className="col-span-full lg:col-span-7">
					<div>{renderPosts()}</div>
				</div>
				<div className="hidden lg:block lg:col-span-3">
					<RecentPosts posts={recentPosts} />
					<Inoreader />
					<TagCloud tags={allTags} />
				</div>
			</section>
		</Layout>
	)
	
}

export async function getStaticProps() {
	const allPostsData = getSortedPostsData()
	const recentPosts = allPostsData.slice(0, 5)
	const allTags = await getAllTags()
	await generateRSSFeed()
	return {
		props: {
			allPostsData,
			recentPosts,
			allTags,
		},
	}
}
