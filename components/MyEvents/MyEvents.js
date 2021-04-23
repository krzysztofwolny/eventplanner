import React, { useState, useEffect} from 'react';
import styles from './MyEvents.module.scss';
import ShowEvent from './ShowEvent/ShowEvent';
import DeleteEvents from './DeleteEvents/DeleteEvents';

import { searchFirebase, getDocumentFromFirebase } from '../../src/firebase';
import { sortEventsByDate } from '../../customHooks/sortObjects';

const MyEvents = ({user}) => {
    const [signedInAds, setSignedInAds] = useState([]);
    const [events, setEvents] = useState([]); 

    const fetchUserEvents = async () => {
        const fetchEvents = await searchFirebase("events", "user", user.uid);
        let adsArr = [];
        if(fetchEvents.length > 0) {
            fetchEvents.map( el => {
                if(el.conectedAds.length === 0) {
                    return
                }
                el.conectedAds.map( a => {
                    getDocumentFromFirebase('adds', a)
                    .then(res => {
                        const fetchedEl = res;
                        const newObj = {
                            forWhichEvent: el.docID,
                            title: fetchedEl.title,
                            start: new Date(fetchedEl.timestampFrom.seconds * 1000),
                            end: new Date(fetchedEl.timestampTo.seconds * 1000)
                        }
                        adsArr.push(newObj);
                    });
                });
            });
        };
        const sorted = sortEventsByDate(fetchEvents);
        setEvents(sorted);
        setSignedInAds(adsArr);
    };

    useEffect(async () => {
        if(user) {
            fetchUserEvents();
        }
    }, []);

    const printContent = () => {
        if(!user) {
            return <div>You need to be logged</div>
        } else {
            return(
                <div className={styles.myEvents__twoColumns}>
                    <ShowEvent ads={signedInAds} events={events} />
                    <DeleteEvents events={events} refresh={() => fetchUserEvents()} />
                </div>
            );
        }
    };

    return(
        <div className={styles.form}>
            <p className={styles.form__mainLabel}>MyEvents</p>
            {printContent()}
        </div>
    );
};

export default MyEvents;