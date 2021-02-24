import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import icons from '../../../assets/svg/sprite.svg'

const SearchBar = ({searchFor}) => {
    const [searchText, setSearchText] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const onchageHandler = (event) => {
        const {name, value} = event.currentTarget;
  
        if(name === 'search') {
            setSearchText(value);
        }
        else if(name === 'date'){
            setSearchDate(value);
        }
    };

    return(
        <form className={styles.searchBar}>
            <input className={styles.searchBar__inputText}
                   type="text"
                   name="search" 
                   placeholder="What do you need?"
                   value={searchText}
                   required
                   onChange={(event) => onchageHandler(event)} >
            </input>
            <input className={styles.searchBar__inputDate}
                   type="date"
                   name="date"
                   value={searchDate}
                   required
                   onChange={(event) => onchageHandler(event)} >
            </input>
            <button className={styles.searchBar__buttonSearch}
                    onClick={() => searchFor(searchText, searchDate)}>
                <svg className={styles.searchBar__buttonSearch_icon}>
                    <use xlinkHref={`${icons}#icon-magnifying-glass`}></use>
                </svg>
            </button>
        </form>
    );
};

export default SearchBar;