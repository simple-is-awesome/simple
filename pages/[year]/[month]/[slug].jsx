import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import Date from 'components/Date';
import ArticleToc from 'components/ArticleToc';
import { getAllPostMetadata, getPostDataByFileName } from 'lib/posts';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
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

        <div className="col-span-1">
          <ArticleToc contentMarkdown={postData.contentMarkdown} showtoc={postData.showtoc} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const allPostMetadata = getAllPostMetadata();

  const paths = allPostMetadata.map((post) => {
    return {
      params: {
        year: post.year.toString(),
        month: post.month.toString().padStart(2, '0'),
        slug: post.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostDataByFileName(params.year, params.month, params.slug);
  return {
    props: {
      postData,
    },
  };
}
