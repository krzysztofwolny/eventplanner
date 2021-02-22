import React from 'react';
import Header from '../components/Header/Header';

import Search from '../components/Search/Search';

const MainPage = () => {

    return(
        <div className="container">
            <Header />
            <Search />
        </div>
    );
}

export default MainPage;