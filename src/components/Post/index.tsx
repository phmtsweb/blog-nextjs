import { FiCalendar, FiUser } from 'react-icons/fi';
import styles from './post.module.scss';
import { formatDate } from '../../utils/date-utils';

interface Post {
  // eslint-disable-next-line react/no-unused-prop-types
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface IPostProps {
  post: Post;
}

export default function Post({ post }: IPostProps): JSX.Element {
  return (
    <div className={styles.postWrapper}>
      <h3 className={styles.postTitle}>{post.data.title}</h3>
      <p className={styles.postDescription}>{post.data.subtitle}</p>
      <div>
        <span className={styles.infoDate}>
          <FiCalendar size={20} />
          {formatDate(new Date(post.first_publication_date))}
        </span>
        <span className={styles.infoUser}>
          <FiUser size={20} />
          {post.data.author}
        </span>
      </div>
    </div>
  );
}
