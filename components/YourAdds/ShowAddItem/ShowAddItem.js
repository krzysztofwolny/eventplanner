import React, { useState } from 'react';
import styles from './ShowAddItem.module.scss';
import Button from '../../../UIelements/Button/Button';
import DeleteConfirmationModal from './ConfirmationModal/DeleteConfirmationModal';

const ShowAddItem = ({ date, desc, from, to, title, who, docID, deleteItem }) => {
    const [showModal, setShowModal] = useState(false);

    const confirmDelete = () => {
        deleteItem(docID);
        setShowModal(false);
    };
    
    const deleteModule = () => {
        if(showModal) {
            return(
                <DeleteConfirmationModal deletefunc={() => confirmDelete(docID)} 
                                         refusefunc={() => setShowModal(false)} />
            );
        } else if (!showModal) {
            return(
                <p>
                    <Button buttonType="button__google"
                           clickAction={() => setShowModal(true)}
                           isScalable>
                        Delete
                    </Button>
                </p>
            );
        }
    };

    const createTimeString = (timestamp) => {
        const time = new Date(Number(timestamp)*1000);
        const hours = time.getHours();
        const minutes = time.getMinutes().toString();
        return `${hours}:${minutes.length === 1 ? `0${minutes}` : minutes}`;
    };

    const fromTransformed = createTimeString(from);
    const toTransformed = createTimeString(to);;

    return(
        <li className={styles.showAddItem}>
            <div className={styles.displayFlex + " " + styles.showAddItem__date}>
                <p>{date}</p>
            </div>
            <div className={styles.displayFlex + " " + styles.showAddItem__from}>
                <p>{fromTransformed}</p>
            </div>
            <div className={styles.displayFlex + " " + styles.showAddItem__to}>
                <p>{toTransformed}</p>
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
            <div className={styles.displayFlex + " " + styles.showAddItem__delete}>
                {deleteModule()}
            </div>
        </li>
    );
}

export default ShowAddItem;