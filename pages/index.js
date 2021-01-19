import React from 'react';

import Header from '../components/Header/Header';

const MainPage = () => {
    const user = null;
    return(
        <div className="container">
            <Header user={user} />
            Main Page
        </div>
    );
}

export default MainPage;