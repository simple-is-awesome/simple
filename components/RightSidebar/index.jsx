import RecentPosts from 'components/RecentPosts'
import Inoreader from 'components/Inoreader'
import Raindrop from 'components/Raindrop'
import TagCloud from 'components/TagCloud'

export default function RightSidebar({ recentPosts, allTags}) {
	return (
		<>
			<RecentPosts posts={recentPosts} />
			<Inoreader />
			<Raindrop />
			<TagCloud tags={allTags} />
		</>
	)
}
