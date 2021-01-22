import React from 'react';
import styles from './Logo.module.scss';
import logoIMG from '../../../assets/img/logo.png';

const Logo = () => {
    return(
        <img className={styles.logo} src={logoIMG} alt="EventPlanner logo" />
    );
};

export default Logo;