import React from 'react';
import styles from './ShowAddItem.module.scss';

const ShowAddItem = ({ date, desc, from, to, title, who, docID }) => {
    console.log("key", docID);
    return(
        <li className={styles.showAddItem}>
            <div className={styles.displayFlex + " " + styles.showAddItem__date}>
                <p>{date}</p>
            </div>
            <div className={styles.displayFlex + " " + styles.showAddItem__from}>
                <p>{from}</p>
            </div>
            <div className={styles.displayFlex + " " + styles.showAddItem__to}>
                <p>{to}</p>
            </div>
            <div className={styles.displayFlex__onStart + " " + styles.showAddItem__title}>
                <p>{title}</p>
            </div>
            <div className={styles.displayFlex__onStart + " " + styles.showAddItem__desc}>
                <p>{desc}</p>
            </div>
            <div className={styles.displayFlex + " " + styles.showAddItem__who}>
                <p>{who}</p>
            </div>
        </li>
    );
}

export default ShowAddItem;