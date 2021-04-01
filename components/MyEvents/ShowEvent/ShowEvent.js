import React, { useState } from 'react';
import styles from './ShowEvent.module.scss';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const ShowEvent = ({ads, events}) => {
    const [currentEvent, setCurrentEvent] = useState(0);

    const localizer = momentLocalizer(moment);

    const changeDisplayedEvent = (direction, actualEvent) => {
        const numberOfEvents = events.length;
        console.log("leng", numberOfEvents);
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

    const printContent = () => {
        if(events.length === 0) {
            return(
                <p className={styles.showEvent__eventDesc}>You have no events. Create new!</p>
            );
        } else {
            return(
                <div className={styles.showEvent}>
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
                events={ads}
                startAccessor="start"
                endAccessor="end"
                view="day"
                onView={() => {}}
                date={events[currentEvent].date}
                onNavigate={date => {}}
                style={{heigth: 500}}
            />
        </div>
            );
        }
    }

    
    console.log(events);

    return(
        <>
            {printContent()}
        </>
    );
};

export default ShowEvent;