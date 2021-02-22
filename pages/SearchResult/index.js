import React from 'react';
import { withRouter } from 'next/router';

import Header from '../../components/Header/Header';
import SearchResult from '../../components/SearchResult/SearchResult';

const SearchResultPage = (props) => {

    return(
        <div className="container">
            <Header />
            <SearchResult searchForText={props.router.query.searchText} 
                          searchForDate={props.router.query.searchDate} />
        </div>
    );
}

export default withRouter(SearchResultPage);