import React from 'react';
import logo from '../../assets/svg/logo.svg'
import SuperButton from "../../common/SuperButton/SuperButton";
import styles from './Header.module.scss'
export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div>
          <img src={logo} alt="logo"/>
        </div>
        <div className={styles.account}>
          <SuperButton>Sign In</SuperButton>
        </div>
      </div>
    </header>
  );
};

