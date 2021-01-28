import React, { useState } from 'react';
import Link from 'next/link';
import styles from './UserMenu.module.scss';
import icons from '../../../assets/svg/sprite.svg';

const UserMenu = ({ openCloseSidebar }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const menuSVG = openSidebar ? "icon-menu4" : "icon-menu3";

    const onClickHandler = () => {
        openCloseSidebar();
        setOpenSidebar(!openSidebar);
    }
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
                <div onClick={onClickHandler}>
                    <svg className={styles.userMenu__icon}>
                        <use xlinkHref={`${icons}#${menuSVG}`}></use>
                    </svg>
                </div>
        </div>
    );
}

export default UserMenu;