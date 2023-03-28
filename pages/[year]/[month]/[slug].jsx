import Head from 'next/head'
import Link from 'next/link'
import ArticleLayout from 'components/ArticleLayout'
import Date from 'components/Date'
import ArticleToc from 'components/ArticleToc'
import ChatGPTSummary from 'components/ChatGPTSummary'
import { getAllPostMetadata, getPostDataByFileName } from 'lib/posts'

export default function Post({ postData , params}) {
	return (
		<ArticleLayout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<div className="flex flex-col md:grid md:grid-cols-5 md:gap-4">
				<div className="md:col-span-1 order-1 md:order-1">
					<div className='sticky top-1/4 bottom-1/4 p-5 bg-gray-300 shadow-lg rounded-md'>
						<ChatGPTSummary contentMarkdown={postData.contentMarkdown} params={params} tags={postData.tags} />
					</div>
				</div>
				<div className="col-span-4 mx-10 order-2 md:order-2">
					<div className="grid grid-cols-4 gap-4">
						<article className="col-span-3 leading-relaxed tracking-wide">
							<h1 className="text-3xl font-semibold text-center my-3">{postData.title}</h1>
							<div className="text-right text-xl my-3">
								<span className="text-gray-500">Posted on</span>{' '}
								<Date dateString={postData.date} />
							</div>
							<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
							<div className="my-3">
								<span className="font-bold">Tags:{' '}</span>
								{postData.tags.map((tag, index) => (
									<span
										key={index}
										className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
									>
										{tag}
									</span>
								))}
							</div>
							<div className="my-12 mx-0">
								<Link href="/">← Back to home</Link>
							</div>
						</article>

						<div className="col-span-1 p-4">
							<ArticleToc contentMarkdown={postData.contentMarkdown} showtoc={postData.showtoc} />
						</div>
					</div>

				</div>
			</div>
		</ArticleLayout>
	)
}

export async function getStaticPaths() {
	const allPostMetadata = getAllPostMetadata()

	const paths = allPostMetadata.map((post) => {
		return {
			params: {
				year: post.year.toString(),
				month: post.month.toString().padStart(2, '0'),
				slug: post.slug,
			},
		}
	})

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const postData = await getPostDataByFileName(params.year, params.month, params.slug)
	return {
		props: {
			postData,
			params
		},
	}
}
