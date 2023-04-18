import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import Date from 'components/Date'
import RightSidebar from 'components/RightSidebar'
import Pagination from 'components/Pagination'
import { getSortedPostsData, getAllTags } from 'lib/posts'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Page({ allPostsData, recentPosts, allTags, currentPage }) {
	const router = useRouter()
	const postsPerPage = parseInt(process.env.NEXT_PUBLIC_POSTS_PERPAGE)
	const startIndex = (currentPage - 1) * postsPerPage
	const endIndex = startIndex + postsPerPage
	const postsToRender = allPostsData.slice(startIndex, endIndex)

	const totalPages = Math.ceil(allPostsData.length / postsPerPage)

	const { t: translate } = useTranslation('index')

	const handlePrevPage = () => {
		if (parseInt(currentPage) === 2) {
		  router.push(`/`)
		} else {
		  router.push(`/page/${parseInt(currentPage) - 1}`)
		}
	  }
	  

	const handleNextPage = () => {
		if(parseInt(currentPage) === totalPages) {
			return
		} else {
			router.push(`/page/${parseInt(currentPage) + 1}`)
		}
	}

	return (
		<Layout>
			<Head>
				<title>{currentPage === 1 ? `${process.env.NEXT_PUBLIC_SITE_TITLE}` : `Page  ${currentPage}` }</title>
			</Head>
			<section className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-5">
				<div className="hidden lg:block lg:col-span-2" />
				<div className="col-span-full lg:col-span-7">
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
					<Pagination currentPage={currentPage} totalPages={totalPages} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage}/>
				</div>
				{/* 右侧边栏 */}
				<div className="hidden lg:block lg:col-span-3">
					<RightSidebar recentPosts={recentPosts} allTags={allTags} translate={translate} />
				</div>
			</section>
		</Layout>
	)
}


export async function getStaticPaths({ locales }) {
	const allPostsData = getSortedPostsData()
	const totalPages = Math.ceil(
	  allPostsData.length / parseInt(process.env.NEXT_PUBLIC_POSTS_PERPAGE)
	)
  
	let paths = []
  
	for (const locale of locales) {
	  const localePaths = Array.from({ length: totalPages }, (_, i) => ({
			params: { page: (i + 1).toString() },
			locale,
	  }))
	  paths = paths.concat(localePaths)
	}
  
	return {
	  paths,
	  fallback: false,
	}
}  

export async function getStaticProps({ params,locale }) {
	const currentPage = params.page
	const allPostsData = getSortedPostsData()
	const recentPosts = allPostsData.slice(0, 5)
	const allTags = getAllTags()
  
	return {
		props: {
			allPostsData,
			recentPosts,
			allTags,
			currentPage,
			...(await serverSideTranslations(locale, ['index'])),
		},
	}
}