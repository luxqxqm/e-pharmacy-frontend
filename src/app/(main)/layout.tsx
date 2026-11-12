import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import styles from './layout.module.css';

/** SharedLayout з ТЗ: Header + сторінка + Footer */
export default function MainLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
