import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import ErrorTemplate from "../ErrorTemplate/ErrorTemplate";
import useUserDetails from "../../utils/hooks/useUserDetails";
import Loader from "../../components/Loader/Loader";
import List from "../../components/List/List";
import Card from "../../components/Card/Card";
import useUserEvents from "../../utils/hooks/useUserEvents";
import formatDate from "../../utils/hooks/getFormattedDate";
import Timeline from "../../components/Timeline/Timeline";

import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { user, repos, loading, error } = useUserDetails(username ?? "");
  const { userEvents } = useUserEvents(username ?? "");

  const { followers, created_at, avatar_url, name, bio, blog } = user as any;
  const JoinedAt = formatDate(created_at);

  if (error) {
    return (
      <ErrorTemplate
        message=" Patience, dear user, for a brief moment: Our feathered friend, the
      API, is currently taking a breather due to its popularity. Sit back,
      relax, and allow it to catch its breath. We'll be back in a jiffy"
      />
    );
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.usernameSection}>
          <div className={styles.avatarSection}>
            <img src={avatar_url} className={styles.avatar}></img>
            <span className={styles.username}>@{name}</span>
          </div>
          <Link to="/" className={styles.backBtn}>
            Back to Home
          </Link>
        </div>
        <div className={styles.timelineContainer}>
          <div className={styles.cardWrapper}>
            <span className={styles.header}>Overview</span>
            <div className={styles.cardSubWrapper}>
              <Card
                icon={<Icon icon="uiw:date" width={18} height={18} />}
                header={"Joined On"}
                value={JoinedAt}
              />
              <Card
                icon={
                  <Icon
                    icon="solar:hamburger-menu-broken"
                    width={24}
                    height={24}
                  />
                }
                header={"Repositories"}
                value={repos?.length ?? 0}
              />
            </div>
            <div className={styles.cardSubWrapper}>
              <Card
                icon={
                  <Icon
                    icon="mingcute:user-follow-fill"
                    width={20}
                    height={20}
                  />
                }
                header={"Followers"}
                value={followers}
              />
              {(bio || blog) && (
                <Card
                  icon={
                    <Icon icon="lucide:square-pen" width={20} height={20} />
                  }
                  header={bio ? "Bio" : "Blog"}
                  value={bio ?? blog}
                />
              )}
            </div>
          </div>
          {userEvents?.length > 0 && <Timeline userEvents={userEvents} />}
        </div>
        <div className={styles.wrapper}>
          <List
            listItems={repos}
            header="Repositories"
            isLoading={loading}
            isRepo
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
