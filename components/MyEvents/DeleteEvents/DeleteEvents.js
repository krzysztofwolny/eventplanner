import React, { useState } from 'react';
import styles from './DeleteEvents.module.scss';
import DeleteEventsItem from './DeleteEventsItem/DeleteEventsItem';

import { deleteItemFromFirebase } from '../../../src/firebase';

const DeleteEvents = ({ events, refresh }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [loading, setLoading] = useState(false);

    const dragoverHandler = (event) => {
        event.preventDefault();
        console.log('draged!');
        setIsHovered(true);
    };

    const dropHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        await deleteItemFromFirebase('events', event.dataTransfer.getData("text"))
        .then( () => setLoading(false))
        .catch( e => console.log(e));
        setIsHovered(false);
        refresh();
    };

    const deleteEventByButton = (id) => {
        deleteItemFromFirebase('events', id);
        refresh();
    }

    const generateList = () => {
        return events.map( el => {
            return <DeleteEventsItem key={el.docID}
                                     docID={el.docID} 
                                     date={el.eventDate} 
                                     name={el.eventDesc}
                                     deleteEvent={ (id) => deleteEventByButton(id) } />
        });
    };

    const dragLeaveHandler = (event) => {
        event.preventDefault();
        setIsHovered(false);
    }

    const currentStyleDroppable = isHovered ? `${styles.deleteEvents__droppableField} ${styles.deleteEvents__droppableField__isHovered}` : `${styles.deleteEvents__droppableField}`;

    return(
        <div className={styles.deleteEvents}>
            <h2 className={styles.deleteEvents__instr}>Drop event on red field to delete.</h2>
            <ul className={styles.deleteEvents__eventsList}>
                {generateList()}
            </ul>
            <div className={currentStyleDroppable}
                 onDragOver={ e => dragoverHandler(e)}
                 onDragLeave={ e => dragLeaveHandler(e) }
                 onDrop={ e => dropHandler(e) }
                 >
                {isHovered ? 'Drop to delete!' : 'Drag here event to delete'}
                {loading ? 'Waiting' : null}
            </div>
        </div>
    );
};

export default DeleteEvents;