import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header>
      <div className={styles.headerWrapper}>
        <Link href="/">
          <a>
            <Image
              src="/assets/logo.png"
              alt="Logo Space Travelling"
              width={237}
              height={26}
            />
          </a>
        </Link>
      </div>
    </header>
  );
}
