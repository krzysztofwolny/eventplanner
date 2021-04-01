import React, { useContext } from 'react';
import { UserContext } from '../../src/providers/UserProvider';
import { withRouter } from 'next/router';

import Header from '../../components/Header/Header';
import SearchResult from '../../components/SearchResult/SearchResult';
import Search from '../../components/Search/Search';

const SearchResultPage = (props) => {
    const user = useContext(UserContext);
    return(
        <div className="container">
            <Header />
            <Search mainPageStyle={false} />
            <SearchResult searchForText={props.router.query.searchText} 
                          searchForDate={props.router.query.searchDate}
                          user={user} />
        </div>
    );
}

export default withRouter(SearchResultPage);