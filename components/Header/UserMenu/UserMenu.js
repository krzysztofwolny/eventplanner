import React from 'react';
import Link from 'next/link';
import styles from './UserMenu.module.scss';
import icons from '../../../assets/svg/sprite.svg';

const UserMenu = () => {
    return(
        <div className={styles.userMenu}>
            <Link href="/">
                <a>
                    <svg className={styles.userMenu__icon}>
                        <use xlinkHref={`${icons}#icon-bubbles`}></use>
                    </svg>
                </a>
            </Link>
            <Link href="/UserHome">
                <a>
                    <svg className={styles.userMenu__icon}>
                        <use xlinkHref={`${icons}#icon-user`}></use>
                    </svg>
                </a>
            </Link>
            <Link href="/">
                <a>
                    <svg className={styles.userMenu__icon}>
                        <use xlinkHref={`${icons}#icon-menu3`}></use>
                    </svg>
                </a>
            </Link>
        </div>
    );
}

export default UserMenu;