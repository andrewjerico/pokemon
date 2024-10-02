import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../../src/styles/Header.module.css';

function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.img}>
            <Image src={"/pokeball-icon.png"} width={55} height={55} alt={"pokeball"}/>
        </div>
        
        <nav className={styles.nav}>
            <Link href={"/"} className={styles.link}>My Pokemon</Link>
            <Link href={"/pokemon/list"} className={styles.link}>Pokemon List</Link>
        </nav>
    </header>
    </>
  )
}

export default Header;