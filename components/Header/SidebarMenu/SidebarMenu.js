import React from 'react';
import styles from './SidebarMenu.module.scss';
import sidebarMenuData from './SidebarMenuData';
import MenuItem from './MenuItem/MenuItem';
import logo from '../../../assets/img/logo.png'
import { auth } from '../../../src/firebase';
import Router from 'next/router';

const SidebarMenu = ({ willUnmount }) => {

    const displayMenuItems = () => {
        const items = sidebarMenuData.map(el => {
            return(
                <MenuItem   label={el.label} 
                            link={el.link}  
                            key={el.label} />
            );
        });
        return items;
    };

    const signOutHandler = () => {
        Router.push("/");
        auth.signOut();
    };
    
    const sidebarStyle = willUnmount ? styles.sidebar + " " + styles.sidebar__out : styles.sidebar  + " " + styles.sidebar__in

    return(
        <nav className={sidebarStyle}>
            <ul>
                {displayMenuItems()}
            </ul>
            <div className={styles.sidebar__footer}>
                <button className={styles.sidebar__signOut} onClick={() => signOutHandler()}>Sign Out</button>
                <img className={styles.sidebar__logo} src={logo} alt="EventPlannerLogo" />
            </div>
        </nav>
    );
};

export default SidebarMenu;