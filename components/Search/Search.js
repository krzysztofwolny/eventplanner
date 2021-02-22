import React from 'react';
import Router from 'next/router';
import styles from './Search.module.scss';

import SearchBar from './SearchBar/SearchBar'

const Search = () => {
    const searchFor = (searchForText, searchForDate) => {
        event.preventDefault();
        console.log("searchText", searchForText);
        console.log("searchdate", searchForDate);
        Router.push({
            pathname: '/SearchResult',
            query: { 
                searchText: searchForText,
                searchDate: searchForDate
            }
        });
    }
    return(
        <section className={styles.search}>
            <h1 className={styles.search__h1}>Welcome to EventPlanner!</h1>
            <SearchBar searchFor={(searchText, searchDate) => searchFor(searchText, searchDate)}/>
            <h2 className={styles.search__h2}>Search for an ad or read how it works</h2>
        </section>
    );
};

export default Search;