import React from "react";
import { Link } from "react-router-dom";

import Error from "../../assets/error.png";

import styles from "./ErrorTemplate.module.css";

const ErrorTemplate = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <img
        src={Error}
        alt="artwork 404"
        height={"329px"}
        width={"443px"}
        className={styles.artwork}
      />

      <div className={styles.content}>
        <span className={styles.textMessage}>ERROR : PAGE NOT FOUND</span>
        <Link to="/" className={styles.linkBack}>
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorTemplate;
