import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import formatDate from "../../utils/hooks/getFormattedDate";
import { githubEvents } from "../../utils/events";
import styles from "./Timeline.module.css";

const EVENTS_COUNT = 6;

interface TimelineProps {
  userEvents: any;
}

const Timeline: React.FC<TimelineProps> = ({ userEvents }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.header}>Contribution Activity</span>
      <div className={styles.elementWrapper}>
        {userEvents.slice(0, EVENTS_COUNT).map((event, index) => {
          const { created_at, type, repo } = event;
          const eventDescription = `${githubEvents[type]?.description}`;

          return (
            <div className={styles.element}>
              <div className={styles.elementHeader}>
                <span className={styles.date}>{formatDate(created_at)}</span>
                <div className={styles.line}></div>
              </div>
              <span key={index} className={styles.description}>
                {eventDescription}{" "}
                <Link to={repo.url} className={styles.url}>
                  {repo.name}{" "}
                  <Icon icon="iconamoon:link-external-fill" color=" #867a2d" />
                </Link>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
