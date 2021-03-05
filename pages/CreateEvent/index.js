import React, { useContext } from 'react';
import { UserContext } from '../../src/providers/UserProvider';
import CreateEvent from '../../components/CreateEvent/CreateEvent';
import Header from '../../components/Header/Header';

const CreateEventPage = () => {
    const user = useContext(UserContext);
    return(
        <React.Fragment>
            <Header />
            <CreateEvent user={user}/>
        </React.Fragment>
    );
}

export default CreateEventPage;