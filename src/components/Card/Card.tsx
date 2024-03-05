import React, { ReactNode } from "react";

import styles from "./Card.module.css";

interface CardProps {
  header: string;
  icon?: any;
  value: number | string;
}

const Card = ({ header, icon, value }: CardProps) => {
  return (
    <div className={styles.card}>
      <span>{icon}</span>
      <span className={styles.header}>{header}</span>
      <span className={styles.value}> {value}</span>
    </div>
  );
};

export default Card;
