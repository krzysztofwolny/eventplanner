import React, { useState } from 'react';
import styles from './DeleteEventsItem.module.scss';

import Button from '../../../../UIelements/Button/Button';

const DeleteEventsItem = ({ docID, date, name, deleteEvent }) => {

    const [isUp, setIsUp] = useState(false);

    const dragStartHandler = (event) => {
        setIsUp(true);
        event.dataTransfer.setData("text/plain", event.target.id);
    };

    const dragEndHandler = () => {
        setIsUp(false);
    };

    const currentStyle = isUp ? `${styles.deleteEventsItem} ${styles.deleteEventsItem__isUp}` : `${styles.deleteEventsItem}`;
    const currentStyleText = isUp ? `${styles.deleteEventsItem__text} ${styles.deleteEventsItem__isUp_text}` : `${styles.deleteEventsItem__text}`;

    return(
        <li className={currentStyle}
             id={docID}
             draggable
             onDragStart ={ e => dragStartHandler(e, docID)}
             onDragEnd={ e => dragEndHandler(e) }>
            <p className={currentStyleText}>{date}</p>
            <p className={currentStyleText}>{name}</p>
            <p>{isUp ? 'Drop on bin to delete' : 'Drag to delete'}</p>
            <Button isScalable={true} 
                    buttonType="button__google"
                    clickAction={() => deleteEvent(docID)}
                    >Delete</Button>
        </li>
    );
};

export default DeleteEventsItem;