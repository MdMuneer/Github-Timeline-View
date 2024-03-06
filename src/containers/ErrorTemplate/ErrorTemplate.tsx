import React from "react";
import { Link } from "react-router-dom";

import Error from "../../assets/error.png";

import styles from "./ErrorTemplate.module.css";

interface errorTemplateProps {
  message?: string;
}

const ErrorTemplate = ({ message }: errorTemplateProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <img
        src={Error}
        alt="artwork"
        height={"329px"}
        width={"443px"}
        className={styles.artwork}
      />

      <div className={styles.content}>
        <span className={styles.textMessage}>
          {message ?? "ERROR : PAGE NOT FOUND"}
        </span>
        <Link to="/" className={styles.linkBack}>
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorTemplate;
