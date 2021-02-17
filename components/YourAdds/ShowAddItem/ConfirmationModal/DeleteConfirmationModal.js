import React from 'react';
import styles from './DeleteConfirmationModal.module.scss';

const DeleteConfirmationModal = ({deletefunc, refusefunc}) => {
    return(
        <div className={styles.deleteModal}>
            <p className={styles.deleteModal__label}>Are You Sure? There is no way to undo this.</p>
            <button className={styles.deleteModal__button} onClick={deletefunc}>Yes, delete</button>
            <button className={styles.deleteModal__button} onClick={refusefunc}>No, I changed my mind!</button>
        </div>
    );
};

export default DeleteConfirmationModal;