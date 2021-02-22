import React from 'react';
import styles from './SearchResult.module.scss';

const SearchResult = ({searchForText, searchForDate}) => {
    return(
        <div className={styles.searchResult}>
            <h2>SearchResult</h2>
            <p>{searchForText}</p>
            <p>{searchForDate}</p>
        </div>
    );
};

export default SearchResult;