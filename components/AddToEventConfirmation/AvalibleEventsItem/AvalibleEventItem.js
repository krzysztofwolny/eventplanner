import React from 'react';
import Router from 'next/router';
import styles from './AvalibleEventsItem.module.scss';

import { updateItemInFirebase } from '../../../src/firebase';

const AvalibleEventsItem = ({ eventDate, eventDesc, addID, addOwnerID, eventID, eventObject }) => {

    const printContent = () => {
        if(eventObject.conectedAds.includes(addID)) {
            return(
                <div className={`${styles.avalibleEventsItem} ${styles.avalibleEventsItem__not}`}>
                    <p className={styles.avalibleEventsItem__text_date}>Date: {eventDate}</p>
                    <p className={styles.avalibleEventsItem__text_desc}>Description: {eventDesc}</p>
                    <p className={`${styles.avalibleEventsItem__text_date} ${styles.avalibleEventsItem__text_red}`}>Add is signed for this event</p>
                </div>
            );
        }
        return(
            <div className={styles.avalibleEventsItem} onClick={() => onClickHandler()}>
                <p className={styles.avalibleEventsItem__text_date}>Date: {eventDate}</p>
                <p className={styles.avalibleEventsItem__text_desc}>Description: {eventDesc}</p>
            </div>
        );
    };

    const onClickHandler = () => {
        let updateConectedAds = [...eventObject.conectedAds];
        updateConectedAds.push(addID);
    
        const updatedEvent = {
            ...eventObject,
            conectedAds: updateConectedAds
        };
        updateItemInFirebase('events', eventID, updatedEvent);
        Router.push('/MyEvents');
    };

    return(
        <>
            {printContent()}
        </>
    );
};

export default AvalibleEventsItem;