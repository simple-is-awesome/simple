import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, my name is Gu Jiakai. I am a student from China, currently studying at Nanjing Xiaozhuang University.
        </p>
        <p>
          My major is Computer Science and Technology. I aspire to become a proficient front-end developer in the future.
        </p>
      </section>
    </Layout>
  );
}