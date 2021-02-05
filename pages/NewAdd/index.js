import React, { useContext } from 'react';
import { UserContext } from '../../src/providers/UserProvider';
import Header from '../../components/Header/Header';
import NewAdd from '../../components/NewAdd/NewAdd';

const NewAddPage = () => {
    const user = useContext(UserContext);

    return(
        <div className="container">
            <Header />
            <NewAdd user={user} />
        </div>
    );
}

export default NewAddPage;