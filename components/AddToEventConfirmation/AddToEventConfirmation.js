import React, { useEffect, useState } from 'react';
import { searchFirebase } from '../../src/firebase';
import styles from './AddToEventConfirmation.module.scss';

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
    console.log(avalibleEvents)
    /*
    so now:
    if avalibleEvents.length is 0, we neet to inform about that and propose to create new event
     (push to create new event for this day)
     if there are events for this date, we should display a list, where client can choose on witch he want to add an ad
     when he will choose, the addID should be inserted in event connected ads
     then in my events we should fetch all ads connected to events and push them to state with a key:
             {
            title: 'All Day Event very long title',
            allDay: true,
            start: new Date(2021, 2, 20, 12, 22, 0),
            end: new Date(2021, 2, 20, 13, 22, 0)
          },

    after adding -> go to my events
    */
    return(
        <div className={styles.form}>
           <p>{addID}</p>
           <p>{addOwnerID}</p>
        </div>
    );
};

export default AddToEventConfirmation;