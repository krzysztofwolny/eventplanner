import React from 'react';
import styles from './index.module.scss';

import Header from '../components/Header/Header';

const MainPage = () => {
    return(
        <div className={styles.container}>
            <Header />
            Main Page
        </div>
    );
}

export default MainPage;