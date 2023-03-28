import Link from 'next/link'

export default function RecentPosts({ posts }) {
	return (
		<div className='bg-white shadow-lg rounded-lg p-6'>
			<div className='text-left text-2xl font-semibold'>近期文章</div>
			<ol className='mt-3 list-decimal'>
				{posts.map(({ slug, date, title }) => {
					const [year, month] = date.split('-')
					return (
						<li key={slug} className="text-blue-600">
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
