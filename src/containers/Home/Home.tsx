import React from "react";
import SearchBanner from "../../components/SearchBanner/SearchBanner";
import TrendingList from "../../components/List/List";
import usePopularRepositories from "../../utils/hooks/usePopularRepositories";

import styles from "./Home.module.css";

const Home = () => {
  const { repositories, loading } = usePopularRepositories();
  const wrapperClass = `${styles.wrapper} ${styles["slide-enter-content"]}`;

  return (
    <div className={wrapperClass}>
      <div className={styles.body}>
        <SearchBanner />
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
      </div>
    </div>
  );
};

export default Home;
