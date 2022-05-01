import { GetStaticPaths, GetStaticProps } from 'next';

import { ParsedUrlQuery } from 'querystring';
import {
  FiArrowLeft,
  FiArrowLeftCircle,
  FiCalendar,
  FiClock,
  FiUser,
} from 'react-icons/fi';
import Image from 'next/image';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Link from 'next/link';
import { createClient } from '../../../prismicio';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';
import { formatDate, since } from '../../utils/date-utils';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      alt: string;
      url: string;
      dimensions: {
        width: number;
        height: number;
      };
    };
    author: string;
    content: {
      heading: string;
      body: RichTextBlock[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <main className={styles.mainContent}>
      <div className={commonStyles.mainContent}>
        <Header />
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src={post.data.banner.url}
          width={1440}
          height={400}
          alt={post.data.banner.alt}
        />
      </div>
      <section className={commonStyles.mainContent}>
        <h1 className={styles.postTitle}>{post.data.title}</h1>
        <div className={styles.infoContent}>
          <span className={styles.infoDate}>
            <FiCalendar size={20} />
            {formatDate(new Date(post.first_publication_date))}
          </span>
          <span className={styles.infoUser}>
            <FiUser size={20} />
            {post.data.author}
          </span>
          <span className={styles.infoTime}>
            <FiClock size={20} />
            {since(new Date(post.first_publication_date))}
          </span>
        </div>
      </section>
      <section className={`${commonStyles.mainContent} ${styles.textContent}`}>
        {post.data.content.map((cont, idx) => (
          <div
            className={styles.paragraphContent}
            key={cont.heading.concat(idx.toString())}
          >
            <h3 className={styles.paragraphTitle}>{cont.heading}</h3>
            <RichText render={cont.body} />
          </div>
        ))}
      </section>
      <div className={commonStyles.mainContent}>
        <Link href="/">
          <a className={styles.backLink}>
            <FiArrowLeftCircle size={20} />
            Voltar
          </a>
        </Link>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = createClient();
  const posts = await prismic.getByType('posts');

  return {
    paths: posts.results.map(post => ({
      params: {
        slug: post.uid,
      },
    })),
    fallback: true,
  };
  // TODO
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  const prismic = createClient();
  const response = await prismic.getByUID('posts', slug);

  return {
    props: {
      post: response,
    },
  };
};
