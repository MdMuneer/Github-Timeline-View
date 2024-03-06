import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SearchBanner.module.css";

const SearchBanner = () => {
  const [searchValue, setSearchValue] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/${searchValue}`);
    }
  };

  const handleClick = () => {
    setSearchValue("octocat");
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.header}>Explore Github Timelines</span>
      <span className={styles.subHeader}>
        Search for a user to see their public activity, or view the latest
        trending repositories.
      </span>
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search for a user"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className={styles.btn}
          onClick={handleSearch}
          disabled={!searchValue}
        >
          Search
        </button>
      </div>
      <span className={styles.footer}>
        Or use the demo account: @<span onClick={handleClick} className={styles.example}>octocat</span>
      </span>
    </div>
  );
};

export default SearchBanner;
