import Layout from '../../components/layout';

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
  }

export default function Post() {
  return <Layout>...</Layout>;
}