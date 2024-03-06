import React from "react";
import SearchBanner from "../../components/SearchBanner/SearchBanner";
import TrendingList from "../../components/List/List";
import usePopularRepositories from "../../utils/hooks/usePopularRepositories";

import styles from "./Home.module.css";

const Home = () => {
  const { repositories, loading, error } = usePopularRepositories();
  const wrapperClass = `${styles.wrapper} ${styles["slide-enter-content"]}`;

  return (
    <div className={wrapperClass}>
      <div className={styles.body}>
        <SearchBanner />
        {error ? (
          <span className={styles.error}>
            Patience, dear user, for a brief moment: Our feathered friend, the
            API, is currently taking a breather due to its popularity. Sit back,
            relax, and allow it to catch its breath. We'll be back in a jiffy
          </span>
        ) : (
          <div className={styles.subWrapper}>
            <span className={styles.header}>Popular repositories</span>
            <div className={styles.listContainer}>
              <TrendingList
                listItems={repositories}
                header=""
                isLoading={loading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
