import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

import useUserDetails from "../../utils/hooks/useUserDetails";
import Loader from "../../components/Loader/Loader";
import List from "../../components/List/List";
import Card from "../../components/Card/Card";
import formatDate from "../../utils/hooks/getFormattedDate";

import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();

  const { user, repos, loading } = useUserDetails(username ?? "");
  const { followers, created_at } = user as any;
  const JoinedAt = formatDate(created_at);

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
        <span className={styles.username}>@{username}</span>
        <span className={styles.header}>Overview</span>
        <div className={styles.cardSubWrapper}>
          <Card
            icon={<Icon icon="uiw:date" width={18} height={18} />}
            header={"Joined On"}
            value={JoinedAt}
          />
          <Card
            icon={
              <Icon icon="solar:hamburger-menu-broken" width={24} height={24} />
            }
            header={"Repositories"}
            value={repos?.length ?? 0}
          />
          <Card
            icon={
              <Icon icon="mingcute:user-follow-fill" width={20} height={20} />
            }
            header={"Followers"}
            value={followers}
          />
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
