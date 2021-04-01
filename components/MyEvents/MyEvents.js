import React, { useState, useEffect} from 'react';
import styles from './MyEvents.module.scss';
import ShowEvent from './ShowEvent/ShowEvent';

import { searchFirebase } from '../../src/firebase';
import { sortEventsByDate } from '../../customHooks/sortObjects';

const MyEvents = ({user}) => {
    const [signedInAds, setSignedInAds] = useState([
        {
            title: 'All Day Event very long title',
            allDay: true,
            start: new Date(2021, 2, 20, 12, 22, 0),
            end: new Date(2021, 2, 20, 13, 22, 0)
          },
          {
            title: 'Long Event',
            start: new Date(2021, 2, 30, 12, 22, 0),
            end: new Date(2021, 2, 30, 13, 22, 0)
          },
        
          {
            title: 'DTS STARTS',
            start: new Date(2021, 2, 26, 12, 22, 0),
            end: new Date(2021, 2, 26, 13, 22, 0)
          },
        
          {
            title: 'DTS ENDS',
            start: new Date(2021, 2, 24, 0, 0, 0),
            end: new Date(2021, 2, 24, 0, 0, 0)
          },
        
          {
            title: 'Some Event',
            start: new Date(2021, 2, 25, 10, 20, 0),
            end: new Date(2021, 2, 25, 11, 20, 0)
          }
    ]);
    const [events, setEvents] = useState([]); 

    const fetchUserEvents = async () => {
        const fetchEvents = await searchFirebase("events", "user", user.uid);
        const sorted = sortEventsByDate(fetchEvents);
        setEvents(sorted);
    }

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
                <>
                    <ShowEvent ads={signedInAds} events={events} />
                </>
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