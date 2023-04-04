import Link from 'next/link'

// 近期文章组件
export default function RecentPosts({ posts }) {
	return (
		<div className='bg-white shadow-lg rounded-lg p-6 dark:bg-gray-600 dark:text-gray-100'>
			<div className='text-left text-2xl font-semibold'>近期文章</div>
			<ol className='mt-3'>
				{posts.map(({ slug, date, title }) => {
					const [year, month] = date.split('-')
					return (
						<li key={slug} className="text-blue-600 dark:text-gray-100">
							<Link href={`/${year}/${month}/${slug}`}>
								{title}
							</Link>
						</li>
					)
				})}
			</ol>
		</div>
	)
}
