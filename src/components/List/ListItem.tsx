import React from "react";

import Icon from "../../assets/icon.png";
import formatDate from "../../utils/hooks/getFormattedDate";

import styles from "./List.module.css";

interface ListItemProps {
  item: any;
  isRepo?: boolean;
}

const ListItem = ({ item, isRepo }: ListItemProps) => {
  const { name, description, owner, forks, language, created_at, html_url } =
    item;
  const createdRepoDate = formatDate(created_at);

  const handleItemClick = () => {
    window.open(html_url, "_blank"); // This will open the HTML URL in a new tab
  };

  return (
    <div
      className={styles.itemWrapper}
      onClick={handleItemClick}
      title={html_url}
    >
      <img
        src={isRepo ? Icon : owner.avatar_url}
        alt={name}
        className={styles.img}
      />
      <div className={styles.info}>
        <div className={styles.topSection}>
          <div className={styles.mainInfo}>
            <span className={styles.title}>{name}</span>
            <span className={styles.tag}>Forks: {forks}</span>
            {language ? <span className={styles.tag}>{language}</span> : null}
          </div>
          <span className={styles.date}>{createdRepoDate}</span>
        </div>
        <span className={styles.description}>
          {description ??
            "A list of the top 100 most popular open-source repositories on GitHub"}
        </span>
      </div>
    </div>
  );
};

export default ListItem;
