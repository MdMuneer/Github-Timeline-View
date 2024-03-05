import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={Logo} alt="logo" />
        <span>GitHub TimeLine Viewer</span>
      </div>
      <Link to="https://github.com/MdMuneer" target="_blank">
        <Icon icon="mdi:github" color="#867a2d" width={32} />
      </Link>
    </div>
  );
};

export default Header;
