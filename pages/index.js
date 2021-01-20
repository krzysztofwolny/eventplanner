import React, { useContext } from 'react';
import { UserContext } from '../src/providers/UserProvider';
import Header from '../components/Header/Header';

const MainPage = () => {
    const user = useContext(UserContext);
    console.log(user)
    return(
        <div className="container">
            <Header user={user} />
            Main Page
        </div>
    );
}

export default MainPage;