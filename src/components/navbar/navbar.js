"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../darkmodetoggle/darkmodetoggle";
import Image from "next/image";

const Navbar = () => {

  return (
    <div className={styles.fixed_container}>
      <div className={styles.container}>
        <Link href="/" className={`${styles.logo}`}>
          <Image src="/brand.png" width={35} height={35} className={styles.icon} alt="Home" />
          Neo-Wallet
        </Link>
        <div className={styles.links}>
          <DarkModeToggle />
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Navbar;
