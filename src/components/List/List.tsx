import React from "react";
import ListItem from "./ListItem";
import Loader from "../../components/Loader/Loader";

import styles from "./List.module.css";

interface ListProps {
  listItems: string[];
  header: string;
  isLoading: boolean;
  isRepo?: boolean;
}

const List = ({
  listItems,
  header,
  isLoading = true,
  isRepo = false,
}: ListProps) => {
  return (
    <div className={styles.listWrapper}>
      {header ? <span className={styles.mainHeader}>{header}</span> : null}
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        listItems.map((item, index) => (
          <ListItem key={index} item={item} isRepo={isRepo} />
        ))
      )}
    </div>
  );
};

export default List;
