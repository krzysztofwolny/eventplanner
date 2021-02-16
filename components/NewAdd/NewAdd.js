import React, { useState } from 'react';
import styles from './NewAdd.module.scss';
import Button from '../../UIelements/Button/Button';
import { saveToFirebase } from '../../src/firebase';

const NewAdd = ({user, refresh}) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");
    const [errorWithTime, setErrorWithTime] = useState(false);
    const [savingSucces, setSavingSucces] = useState(0)


    const saveAddToDatabase = () => {
        event.preventDefault();

        const destructureDate = date.split("-");
        const destructureTimeFrom = timeFrom.split(":");
        const destructureTimeTo = timeTo.split(":");

        const timestampFrom = new Date( destructureDate[0], 
                                        destructureDate[1], 
                                        destructureDate[2], 
                                        destructureTimeFrom[0],
                                        destructureTimeFrom[1]);
        const timestampTo = new Date( destructureDate[0], 
                                        destructureDate[1], 
                                        destructureDate[2], 
                                        destructureTimeTo[0],
                                        destructureTimeTo[1]);
        if(destructureTimeFrom[0] > destructureTimeTo[0]) {
            setErrorWithTime(true);
        } else {
            setErrorWithTime(false);
            const yes = () => {
                setSavingSucces(1)
            };
            const no = () => {
                setSavingSucces(2)
            };
            saveToFirebase("adds", {
                user: user.uid,
                title: title,
                desc: desc,
                date: date,
                timestampFrom: timestampFrom,
                timestampTo: timestampTo
            }, yes, no);
            setTimeout(() => {
                setSavingSucces(0);
                setTitle("");
                setDate("");
                setDesc("");
                setTimeFrom("");
                setTimeTo("");
                setErrorWithTime(false);
                document.getElementById('newAdd').reset();
                refresh();
            }, 5000);
        }
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

    const saveValueToState = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'title') {
            setTitle(value);
        } else if (name === 'date') {
            setDate(value);
        } else if (name === 'description') {
            setDesc(value);
        } else if (name === 'timeFrom') {
            setTimeFrom(value);
        } else if (name === 'timeTo') {
            setTimeTo(value);
        }
    };

    const printContent = () => {
        if(!user) {
            return <div className={styles.form__mainLabel}>You need to be logged</div>
        } else {
            return(
                <React.Fragment>
                    <form className={styles.form__form} id="newAdd">
                        <label className={styles.form__inputLabel}>Title or short description</label>
                        <input 
                            className={styles.form__input}
                            name="title"
                            type="text"
                            value={title}
                            placeholder="Short title"
                            required
                            onChange={(event) => saveValueToState(event)}
                        ></input>
                        <label className={styles.form__inputLabel}>Date - when you offer your service</label>
                        <input 
                            className={styles.form__input + " " + styles.form__input__date}
                            name="date"
                            type="date"
                            value={date}
                            required
                            onChange={(event) => saveValueToState(event)}
                        ></input>
                        <label className={styles.form__inputLabel}>Time - time when you are avalible</label>
                        {errorWithTime ? <p className={styles.form__error}>Hour from needs to be smaller than to</p> : null}
                        <div className={styles.form__input__timeContainer}>
                            <label className={styles.form__inputLabel}>From</label>
                            <input 
                                className={styles.form__input + " " + styles.form__input__time}
                                name="timeFrom"
                                type="time"
                                value={timeFrom}
                                required
                                onChange={(event) => saveValueToState(event)}
                            ></input>
                            <label className={styles.form__inputLabel}>To</label>
                            <input 
                                className={styles.form__input + " " + styles.form__input__time}
                                name="timeTo"
                                type="time"
                                value={timeTo}
                                required
                                onChange={(event) => saveValueToState(event)}
                            ></input>
                        </div>
                        
                        <label className={styles.form__inputLabel}>Describe your service</label>
                        <input 
                            className={styles.form__input}
                            name="description"
                            type="text"
                            value={desc}
                            placeholder="Short title"
                            required
                            onChange={(event) => saveValueToState(event)}
                        ></input>
                        <Button
                            clickAction={() => saveAddToDatabase()}
                        >Ad your add :)</Button>
                    </form>
                    <p className={styles.form__successMessage}>{displayUserSavingInfo()}</p>
                </React.Fragment>
            );
        }
    };

    return(
        <div className={styles.form__mainWrapper}>
            <div className={styles.form}>
                <h2 className={styles.form__mainLabel}>Create your add</h2>
                {printContent()}
            </div>
        </div>);
};

export default NewAdd;