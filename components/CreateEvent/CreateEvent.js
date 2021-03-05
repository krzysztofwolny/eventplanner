import React, { useState } from 'react';
import styles from './CreateEvent.module.scss';
import Button from '../../UIelements/Button/Button';
import { saveToFirebase } from '../../src/firebase';

const CreateEvent = ({user}) => {
    const [eventDate, setEventDate] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [savingSucces, setSavingSucces] = useState(0);
    const [dateError, setDateError] = useState(false);
   
    const saveValueToState = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'eventDesc') {
            setEventDesc(value);
        } else if (name === 'eventDate') {
            setEventDate(value);
        } 
    };

    const saveEventToDatabase = () => {
        event.preventDefault();

        const toNumbers = arr => arr.map(Number);

        const destructureDate = toNumbers(eventDate.split("-"));
        destructureDate[1] = destructureDate[1] - 1;
        const timestampDate = new Date( destructureDate[0], 
                                        destructureDate[1], 
                                        destructureDate[2], 
                                        0,
                                        0);

        if(timestampDate < new Date()) {
            setDateError(true)
        } else {
            setDateError(false);
            const yes = () => setSavingSucces(1);
            const no = () => setSavingSucces(2);

            saveToFirebase("events", {
                user: user.uid,
                eventDate: eventDate,
                eventDesc: eventDesc,
                eventTimestamp: timestampDate,
                conectedAds: [],
            }, yes, no);
            setTimeout(() => {
                setSavingSucces(0);
                setEventDate("");
                setEventDesc("");
                setDateError(false);
                document.getElementById('newEvent').reset();
            }, 5000);
        };
    };

    const displayUserSavingInfo = () => {
        if(savingSucces === 0) {
            return null
        } else if (savingSucces === 1) {
            return "your add was succesfuly saved!"
        } else if (savingSucces === 2) {
            return "your add was not saved, try again."
        }
    };

    const printContent = () => {
        if(!user) {
            return <div className={styles.form__mainLabel}>Please log in first!</div>
        } else {
            return(
                <React.Fragment>
                    <form className={styles.form__form} id="newEvent">
                        <label className={styles.form__inputLabel}>Short description of Your event. (eg. "My wedding")</label>
                            <input 
                                className={styles.form__input}
                                name="eventDesc"
                                type="text"
                                value={eventDesc}
                                placeholder="Short description"
                                required
                                onChange={(event) => saveValueToState(event)}
                            ></input>
                        <label className={styles.form__inputLabel}>Date - when it will take place?</label>
                        {dateError ? <p className={styles.form__error}>This is past date :(</p> : null}
                            <input 
                                className={styles.form__input + " " + styles.form__input__date}
                                name="eventDate"
                                type="date"
                                value={eventDate}
                                required
                                onChange={(event) => saveValueToState(event)}
                            ></input>
                            <Button
                                clickAction={() => saveEventToDatabase()}
                                >
                                Create Event
                            </Button>
                    </form>
                    <p className={styles.form__successMessage}>{displayUserSavingInfo()}</p>
                </React.Fragment>
            );
        }
    }


    return(
        <div className={styles.form}>
            {printContent()}
        </div>
    );
};

export default CreateEvent;