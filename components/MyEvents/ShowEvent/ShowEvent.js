import React, { useState, useEffect } from 'react';
import styles from './ShowEvent.module.scss';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { updateItemInFirebase, getDocumentFromFirebase } from '../../../src/firebase';

const ShowEvent = ({ads, events, refresh}) => {
    const [adsToDisplay, setAdsToDisplay] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(0);

    useEffect(() => {
        let filteredAds = [];
        ads.map( el => {
            if(el.forWhichEvent === events[currentEvent].docID) {
                return filteredAds.push(el);
            }
        });
        setAdsToDisplay(filteredAds);
    }, [currentEvent, ads]);

    const localizer = momentLocalizer(moment);

    const changeDisplayedEvent = (direction, actualEvent) => {
        const numberOfEvents = events.length;
        if(direction === "prev") {
            if(actualEvent === 0) {
                setCurrentEvent(numberOfEvents - 1);
            } else {
                setCurrentEvent(actualEvent - 1);
            }
        } else if (direction === "next") {
            if(actualEvent === numberOfEvents - 1) {
                setCurrentEvent(0);
            } else {
                setCurrentEvent(actualEvent + 1)
            }
        }
    };

    const unsubscribeAdd = (addData) => {
        getDocumentFromFirebase('events', addData.forWhichEvent)
        .then( res => {
            console.log(res);
            let adsToFilter = [...res.conectedAds];
            adsToFilter = adsToFilter.filter(e => e !== addData.addID);
            const updatedEventData = { 
                ...res,
                conectedAds: adsToFilter
            };
            updateItemInFirebase('events', addData.forWhichEvent, updatedEventData);
            refresh();
        })
        .catch( e => console.log(e) );
    };

    const printContent = () => {
        if(events.length === 0) {
            return(
                <p className={styles.showEvent__eventDesc}>You have no events. Create new!</p>
            );
        } else {
            return(
                <div className={styles.showEvent}>
                    <p className={styles.showEvent__eventDesc}>Click on add to usubscribe</p>
                    <div className={styles.showEvent__buttons}>
                        <button className={styles.showEvent__buttons_toggle}
                        onClick={() => changeDisplayedEvent("prev", currentEvent)}>
                            Previous event</button>
                        <button className={styles.showEvent__buttons_toggle}
                        onClick={() => changeDisplayedEvent("next", currentEvent)}>
                            Next event</button>
                    </div>
                    <p className={styles.showEvent__eventDesc}>{events[currentEvent].eventDate}</p>
                    <p className={styles.showEvent__eventDesc}>{events[currentEvent].eventDesc}</p>
                    <Calendar
                        toolbar={false}
                        localizer={localizer}
                        events={adsToDisplay}
                        startAccessor="start"
                        endAccessor="end"
                        view="day"
                        onView={() => {}}
                        date={new Date(events[currentEvent].eventTimestamp.seconds * 1000)}
                        onNavigate={date => {}}
                        onSelectEvent={ event => unsubscribeAdd(event)}
                        style={{height: 600, width: 400}}
                    />
                </div>
            );
        }
    };

    return(
        <>
            {printContent()}
        </>
    );
};

export default ShowEvent;