import RecentPosts from 'components/RecentPosts'
import Inoreader from 'components/Inoreader'
import Raindrop from 'components/Raindrop'
import TagCloud from 'components/TagCloud'

export default function RightSidebar({ recentPosts, allTags, translate}) {
	return (
		<>
			<RecentPosts posts={recentPosts} translate={translate} />
			{ process.env.NEXT_PUBLIC_INOREADER_CHANNEL && <Inoreader translate={translate} />}
			{ process.env.NEXT_PUBLIC_RAINDROP && <Raindrop translate={translate} />}
			<TagCloud tags={allTags} translate={translate} />
		</>
	)
}
