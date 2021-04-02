import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { searchFirebase } from '../../src/firebase';
import Button from '../../UIelements/Button/Button';
import styles from './AddToEventConfirmation.module.scss';
import AvalibleEventsItem from './AvalibleEventsItem/AvalibleEventItem';

const AddToEventConfirmation = ({ user, addID, addOwnerID, addDate }) => {
    const [avalibleEvents, setAvalibleEvents] = useState([]);
    useEffect(async () => {
        if(user) {
            const areThereEventsForThisDate = await searchFirebase('events', 'user', user.uid)
                                                .then( res => {
                                                    let match = [];
                                                    res.map( el => {
                                                        if(el.eventDate === addDate) {
                                                            match.push(el);
                                                        }
                                                    });
                                                    return match;
                                                })
                                                .catch(e => console.log(e));
        setAvalibleEvents(areThereEventsForThisDate);
        }
    }, []);

    const printContent = () => {

        const printAvalibleEvents = () => {
            return avalibleEvents.map( el => {
                return(
                    <AvalibleEventsItem key={el.docID}
                                        eventID={el.docID} 
                                        eventDate={el.eventDate} 
                                        eventDesc={el.eventDesc}
                                        addID={addID}
                                        addOwnerID={addOwnerID}
                                        eventObject={el} />
                );
            });
        }


        if(avalibleEvents.length === 0) {
            return(
                <>
                    <p className={styles.form__mainLabel}>You don't have any events on {addDate}.</p>
                    <p className={styles.form__smallLabel}>Do You wish to create one?</p>
                    <div className={styles.confirmation__buttons}>
                        <Button clickAction={() => Router.push('/CreateEvent')}>Yes</Button>
                        <Button clickAction={() => Router.push('/')}>No</Button>
                    </div>
                </>
            );
        };
        return(
            <>
                <p className={styles.form__mainLabel}>At {addDate} you have following events:</p>
                <p className={styles.form__smallLabel}>choose one</p>
                {printAvalibleEvents()}
                <Button clickAction={() => Router.push('/MyEvents')}>Go to events</Button>
            </>
        );
    };

    return(
        <div className={styles.form}>
           {printContent()}
        </div>
    );
};

export default AddToEventConfirmation;