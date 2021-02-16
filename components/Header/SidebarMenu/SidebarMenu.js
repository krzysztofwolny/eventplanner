import React from 'react';
import styles from './SidebarMenu.module.scss';
import sidebarMenuData from './SidebarMenuData';
import MenuItem from './MenuItem/MenuItem';
import logo from '../../../assets/img/logo.png'

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
    
    const sidebarStyle = willUnmount ? styles.sidebar + " " + styles.sidebar__out : styles.sidebar  + " " + styles.sidebar__in

    return(
        <nav className={sidebarStyle}>
            <ul>
                {displayMenuItems()}
            </ul>
            <img className={styles.sidebar__logo} src={logo} alt="EventPlannerLogo" />
        </nav>
    );
};

export default SidebarMenu;