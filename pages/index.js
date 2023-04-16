import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/Layout'
import Date from 'components/Date'
import RightSidebar from 'components/RightSidebar'
import { getSortedPostsData, getAllTags } from 'lib/posts'
import generateRSSFeed from 'lib/generateRSSFeed'

export default function Home({ allPostsData, recentPosts, allTags }) {
	const totalPages = Math.ceil(allPostsData.length / process.env.NEXT_PUBLIC_POSTS_PERPAGE)
	const postsToRender = allPostsData.slice(0, process.env.NEXT_PUBLIC_POSTS_PERPAGE)

	return (
		<Layout>
			{/* 标题 */}
			<Head>
				<title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
			</Head>

			{/* 首页 */}
			<section className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-5">
				<div className="hidden lg:block lg:col-span-2" />
				<div className="col-span-full lg:col-span-7">
					<ul className="grid grid-cols-1 gap-8">
						{postsToRender.map(({ date, slug, title, summary }) => {
							const [year, month] = date.split('-')
							return (
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
							)
						})}
					</ul>
					<div className="flex justify-center my-4">
						<span className="px-4 py-2"> 1 / {totalPages}</span>
						<Link href="/page/2" className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-600 dark:text-gray-100">
							Next
						</Link>
					</div>
				</div>
				<div className="hidden xl:block xl:col-span-3">
					<RightSidebar recentPosts={recentPosts} allTags={allTags} />
				</div>
			</section>
		</Layout>
	)
}

export async function getStaticProps() {
	const allPostsData = getSortedPostsData()
	const recentPosts = allPostsData.slice(0, 5)
	const allTags = getAllTags()
	await generateRSSFeed()
	return {
		props: {
			allPostsData,
			recentPosts,
			allTags,
		},
	}
}
