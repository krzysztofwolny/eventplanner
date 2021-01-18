import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
    return(
        <section className={styles.header}>
            <p className={styles.header__p}>Header</p>
        </section>
    );
}

export default Header;