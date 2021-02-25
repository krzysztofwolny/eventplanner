import React, { useContext } from 'react';
import { UserContext } from '../../src/providers/UserProvider';
import Header from '../../components/Header/Header';
import MyEvents from '../../components/MyEvents/MyEvents';

const MyEventsPage = () => {
    const user = useContext(UserContext);
    return(
        <div className="container">
            <Header />
            <MyEvents user={user} />
        </div>
    );
};

export default MyEventsPage;