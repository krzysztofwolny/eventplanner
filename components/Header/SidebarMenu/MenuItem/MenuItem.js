import React from 'react';
import Link from 'next/link';
import styles from './MenuItem.module.scss';

const MenuItem = ({ label, link }) => {
    return(
        <Link href={link}>
            <li className={styles.menuItem}>
                <a>{label}</a>
            </li>
        </Link>
    );
}

export default MenuItem;