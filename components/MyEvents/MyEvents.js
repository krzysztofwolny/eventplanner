import React, { useState} from 'react';
import styles from './MyEvents.module.scss';
import ShowEvent from './ShowEvent/ShowEvent';

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
    const [events, setEvents] = useState([
        {
            date: new Date(2021, 2, 20, 0, 0, 0),
            dateDisp: "20-03-2021",
            eventDesc: 'opis eventu 1',
            eventID: 'wefsefwregf'
        },
        {
            date: new Date(2021, 2, 15, 0, 0, 0),
            dateDisp: "15-03-2021",
            eventDesc: 'opis eventu 2',
            eventID: 'dfbngaahrWE43'
        },
        {
            date: new Date(2021, 2, 30, 0, 0, 0),
            dateDisp: "30-03-2021",
            eventDesc: 'opis eventu 3',
            eventID: 'wthsthsrthsrthrhty'
        },
    ]); 

    const printContent = () => {
        if(!user) {
            return <div>You need to be logged</div>
        } else {
            return(
                <React.Fragment>
                    <p>{user.uid}</p>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                    <ShowEvent ads={signedInAds} events={events} />
                </React.Fragment>
            );
        }
    };

    return(
        <div className={styles.form}>
            <p>MyEvents</p>
            {printContent()}
        </div>
    );
};

export default MyEvents;