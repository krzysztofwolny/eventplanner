import React from 'react';
import { withRouter } from 'next/router';

import Header from '../../components/Header/Header';
import SearchResult from '../../components/SearchResult/SearchResult';
import Search from '../../components/Search/Search';

const SearchResultPage = (props) => {

    return(
        <div className="container">
            <Header />
            <Search mainPageStyle={false} />
            <SearchResult searchForText={props.router.query.searchText} 
                          searchForDate={props.router.query.searchDate} />
        </div>
    );
}

export default withRouter(SearchResultPage);