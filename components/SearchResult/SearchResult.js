import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from './SearchResult.module.scss';
import ShowSearchResultItem from './ShowSearchResultItem/ShowSearchResultItem';

import { searchFirebase } from '../../src/firebase';
import { sortAddsByDate } from '../../customHooks/sortObjects';

const SearchResult = ({searchForText, searchForDate, user}) => {

    const [searchResult, setSearchResult] = useState([]);

    useEffect(async () => {
        const fetchSearchResult = await searchFirebase("adds", "date", searchForDate);
        const transformed = sortAddsByDate(fetchSearchResult);
        setSearchResult(transformed);
    }, []);

    const searchInText = () => {
        //usuwamy znaki specjalne z szukanego tekstu
        const removeSpecialCharacters = (str) => {
            const lower = str.toLowerCase();
            const upper = str.toUpperCase();

            let res = "";
            for(let i=0; i<lower.length; ++i) {
            if(lower[i] != upper[i] || lower[i].trim() === '')
            res += str[i];
            }
            return res;
        };
        //robimy tabele ze słowami z tekstu
        const stringTransform = (input) => {
            const output = removeSpecialCharacters(input)
                            .toLowerCase()
                            .split(' ')
                            .filter(e => e !== '');

            return output
        };
        //tabela z szukanego tekstu
        const searchQueryArray = stringTransform(searchForText);

        //sprawdzamy, czy w desc lub title występuja takie same słowa jak w zapytaniu
        const seekForWords = () => {
            const outputArr = [];
            const output = searchResult.map(el => {
                const arrayFromTitle = stringTransform(el.title);
                const arrayFromDesc = stringTransform(el.desc);
                const findCommonElement = (arr1, arr2) => {
                    return arr1.some(item => arr2.includes(item));
                };
                const compareQueryToTitle = findCommonElement(searchQueryArray, arrayFromTitle);
                const compareQueryToDesc = findCommonElement(searchQueryArray, arrayFromDesc);
                if(compareQueryToTitle || compareQueryToDesc) {
                    outputArr.push(el);
                };
            });
            return outputArr;
        };

        return seekForWords();
    };

    const addToEventHandler = (docID, whoID, date) => {
        if(!user) {
            return Router.push('/SignIn');
        }
        if(user.uid === whoID) {
            return window.alert('This is your own add!');
        }
        return Router.push({
                            pathname: '/AddToEventConfirmation',
                            query: { 
                                    addID: docID,
                                    addOwnerID: whoID,
                                    addDate: date
            }
        });
    };

    const printSearchResult = () => {
        const toPrint = searchInText();
        if(toPrint.length === 0) {
            return(
                <div className={styles.searchResult__failure}>Sorry, we didn't find anything :( try search something else, or on different day.</div>
            );
        } else { 
            return toPrint.map(el => {
                return(
                    <ShowSearchResultItem 
                    date={el.date}
                    from={el.timestampFrom.seconds}
                    to={el.timestampTo.seconds}
                    title={el.title}
                    desc={el.desc}
                    who={el.userName}
                    whoID={el.user}
                    key={el.docID}
                    docID={el.docID}
                    //ten jest źle, nie ma takiej funkcji, zrobimy, jak zrobimy tworzenie eventów
                    addItemToEvent={(docID, whoID, date) => addToEventHandler(docID, whoID, date)}
                    />
                );
            });
        }
    };

    return(
        <div className={styles.form + ' ' + styles.searchResult__smallerMargin}>
            <h2 className={styles.form__mainLabel}>Search result</h2>
            <p className={styles.form__smallLabel}>Your query: {searchForText} at {searchForDate}</p>
            <ul className={styles.searchResult__list}>{printSearchResult()}</ul>
        </div>
    );
};

export default SearchResult;