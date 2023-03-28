import Head from 'next/head'
import Link from 'next/link'
import Date from 'components/Date'
import Layout from 'components/Layout'
import Inoreader from 'components/Inoreader'
import RecentPosts from 'components/RecentPosts'
import TagCloud from 'components/TagCloud'
import { getSortedPostsData, getAllTags} from 'lib/posts'
import config from 'config'

export default function Home({ allPostsData, recentPosts, allTags}) {
	return (
		<Layout home>
			<Head>
				<title>{config.siteTitle}</title>
			</Head>
			<section className='grid grid-cols-7 gap-8'>
				<div className='col-span-5'>
					<ul className="grid grid-cols-1 gap-8">
						{allPostsData.map(({ date, slug, title, summary }) => {
							const [year, month] = date.split('-')
							return (
								<li key={slug} className="bg-white shadow-lg rounded-lg p-6">
									<h3 className="text-xl font-semibold mb-4">
										<Link href={`/${year}/${month}/${slug}`}>{title}</Link>
									</h3>
									<small className="text-gray-600">
										<Date dateString={date} />
									</small>
									<p className="text-gray-700 mt-2">{summary}</p>
								</li>
							)
						})}
					</ul>
				</div>
				<div className='col-span-2'>
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
	return {
		props: {
			allPostsData,
			recentPosts,
			allTags
		},
	}
}