import { GetStaticProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Post from '../components/Post';

import { createClient } from '../../prismicio';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [page, setPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<string>(postsPagination.next_page);
  const initialRender = useRef(true);

  useEffect(() => {
    async function loadMorePosts(): Promise<void> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newPosts: any = await createClient().getByType('posts', {
        page,
        pageSize: 3,
      });

      setPosts(prevPosts => [...prevPosts, ...newPosts.results]);
      setNextPage(newPosts.next_page);
    }
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      loadMorePosts();
    }
  }, [page]);

  return (
    <main className={`${commonStyles.mainContent} ${styles.mainContentHome}`}>
      <Header />
      {posts.map(post => (
        <Link key={post.uid} href={`/post/${post.uid}`}>
          <a>
            <Post post={post} />
          </a>
        </Link>
      ))}
      {!!nextPage && (
        <button
          onClick={() => setPage(prevPage => prevPage + 1)}
          type="button"
          className={styles.buttonLoad}
        >
          Carregar mais posts
        </button>
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient();
  const postsPagination = await prismic.getByType('posts', {
    pageSize: 3,
  });

  return {
    props: {
      postsPagination,
    },
  };

  // TODO
};
