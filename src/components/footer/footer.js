import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <hr />
      <div className={styles.container}>
        {/* <div>By AZRA3L. All rights reserved. &nbsp;</div> */}
        <div className={styles.social}>
          <Link href={'https://github.com/m-azra3l'} target="_blank"><Image src="/github.jpg" width={35} height={35} className={styles.icon} alt="Github" /></Link>
          <Link href={'https://www.linkedin.com/in/michael-damilare-adesina-4b51a5134/'} target="_blank"><Image src="/linkedin.png" width={40} height={40} className={styles.icon} alt="LinkedIn" /></Link>
        </div>
      </div>
    </>

  );
};

export default Footer;
