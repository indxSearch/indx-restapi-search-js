'use client'

/*
SEARCH for RestAPI
For V3.1 with CoverageSetup

See docs.indx.co to learn more.
Go to auth.indx.co to register for a developer account
*/

import { useState, useEffect } from 'react';
import styles from './Search.module.css';

//
// YOUR CREDENTIALS (required)
//
const token = "Bearer " + "INSERT YOUR TOKEN HERE";

const url = 'https://api.indx.co/api/Search'; // indx API
//const url = 'http://localhost:38171/api/Search'; // local


export default function Search(
  {
    results = 10,
    merge = false,
    heap = 10, 
    algorithm = 0, 
    firstQuery = "", 
    placeholderText = "Search", 
    dataSet = "Undefined", 
    metricScoreMin = 0,
    doTruncate = false,
    showMeta = false,
    removeDuplicates = true,
    
    // COVERAGE SETUP (Default values)
    // Only activates on algorithm 13
    lcsTopErrorTolerance = 0,
    lcsTopMaxRepetions = 0,
    lcsErrorTolerance = 0,
    lcsMaxRepetitions = 0,
    lcsBottomErrorTolerance = 0,
    lcsBottomMaxRepetitions = 0,
    lcsWordMinWordSize = 3,
    lcsWordLcsErrorTolerance = 0,
    lcsWordLcsMaxRepetitions = 0,
    lcsWordBottomMinWordHits = 1,
    coverageMinWordHitsAbs = 1,
    coverageMinWordHitsRelative = 0,
    coverageQLimitForErrorTolerance = 5,
    coverageLcsErrorToleranceRelativeq = 0.2

  }) {
  const [records, setRecords] = useState([]);
  const [searchText, setSearchText] = useState(firstQuery);
  const [truncateIndex, setTruncateIndex] = useState(-1);

  const callAPI = async (queryText) => {

      try {
        const response = await fetch(url + "/" + heap, {
          cache: "no-cache",
          method: 'POST',
          headers: {
            'Accept': 'text/plain',
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              "algorithm": algorithm,
              "keyExcludeFilter": null,
              "keyIncludeFilter": null,
              "logPrefix": "",
              "maxNumberOfRecordsToReturn": results,
              "removeDuplicates": removeDuplicates,
              "soughtText": queryText,
              "timeOutLimitMilliseconds": 100,
              "wordExcludeFilter": null,
              "wordIncludeFilter": null,
              "coverageSetup": {
                "lcsTopErrorTolerance": lcsTopErrorTolerance,
                "lcsTopMaxRepetions": lcsTopMaxRepetions,
                "lcsErrorTolerance": lcsErrorTolerance,
                "lcsMaxRepetitions": lcsMaxRepetitions,
                "lcsBottomErrorTolerance": lcsBottomErrorTolerance,
                "lcsBottomMaxRepetitions": lcsBottomMaxRepetitions,
                "lcsWordMinWordSize": lcsWordMinWordSize,
                "lcsWordLcsErrorTolerance": lcsWordLcsErrorTolerance,
                "lcsWordLcsMaxRepetitions": lcsWordLcsMaxRepetitions,
                "lcsWordBottomMinWordHits": lcsWordBottomMinWordHits,
                "coverageMinWordHitsAbs": coverageMinWordHitsAbs,
                "coverageMinWordHitsRelative": coverageMinWordHitsRelative,
                "coverageQLimitForErrorTolerance": coverageQLimitForErrorTolerance,
                "coverageLcsErrorToleranceRelativeq": coverageLcsErrorToleranceRelativeq
              },
              "numberOfRecordsForAppliedAlgorithm": 500
            }
          )
        });
        const data = await response.json();

        if (data && data.searchRecords) {
          // Filter records where metricScore is above min threshold
          if(queryText.length > 1)
          {
            const filteredRecords = data.searchRecords.filter(record => record.metricScore >= metricScoreMin);
            setRecords(filteredRecords); // Update state with filtered records
          }
          else {
            setRecords(data.searchRecords)
          }
          setTruncateIndex(-1); // set to reset
          if(doTruncate) setTruncateIndex(data.lcsBottomIndex);
        } else {
            setRecords([]); // Reset to empty array if response is not as expected
        }
        
      } catch (err) {
        console.log(err);
        setRecords([]); // Reset to empty array in case of error
      }
  };



  
  useEffect(() => {
    callAPI(firstQuery); // Use to wake API server on page load
  }, []); 
  

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    callAPI(event.target.value);
  }

  
  return (
    <div className={styles.content}>
        <div id={styles.searchheader}>

            <input
                placeholder={placeholderText}
                value={searchText}
                onChange={handleInputChange}
                className={styles.input}
            />

            <div id={styles.meta}>
                <div className={styles.metafields}>
                    <div className={styles.description}>INDX SEARCH SYSTEM</div>
                    {showMeta ? (
                        <>
                            <div className={styles.metainfo}>Dataset: {dataSet} / Heap: {heap}</div>
                            <div className={styles.metainfo}>Algorithm: {algorithm}</div>
                        </>
                    ) : (
                        <div className={styles.metainfo}>Dataset: {dataSet}</div>
                    )}
                </div>
            </div>

        </div>

        <ul className={`${styles.ul} ${records.length === 0 ? styles.passive : ''}`}>

        {records.map((entry, index) => {

          let truncated = false;
          let lastInList = false;

          if(index == truncateIndex && doTruncate) lastInList = true;
          if(truncateIndex != -1 && truncateIndex < index && doTruncate) truncated = true;

          return (
              <li key={index} className={`${lastInList ? styles.lastInList : ''} ${truncated ? styles.cut : ''}`}>
                  <div className={styles.number}> {index + 1} </div>
                  <div className={styles.number + ' ' + styles.score}>{entry.metricScore}</div>
                  <div className={styles.resultinfo}>
                      <div className={styles.textfields}>                      
                          <div>
                            {entry.documentTextToBeIndexed}
                            {showMeta ? (
                              <>
                                <span className={styles.documentKey}>{entry.documentKey}.{entry.segmentNumber}</span>
                              </>
                            ) : (<></>)}
                          </div> 
                      </div>
                  </div>
              </li>
          );
          
        })}

        </ul>
    </div>
  );
}

