import React, { useState, useEffect } from 'react';

import './CharPicker.css';

const CharPicker = props => {
    const [loadedChars, setLoadedChars] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {  
        setIsLoading(true);

        fetch('https://swapi.dev/api/people/')
        .then(response => {
            setIsLoading(false)

            if (!response.ok) {
            throw new Error('Failed.');
            }
            return response.json();
        })
        .then(charData => {
            const selectedCharacters = charData.results.slice(0, 15);
            setIsLoading(false)

            setLoadedChars(
            selectedCharacters.map((char, index) => ({
                name: char.name,
                id: index + 1
            }))            
        );
        })
        .catch(err => {
            setIsLoading(false)
            console.log(err);
        });
    }, [])

    let content = <p>Loading characters...</p>;

    if (
      !isLoading &&
      loadedChars &&
      loadedChars.length > 0
    ) {
      content = (
        <select
          onChange={props.onCharSelect}
          value={props.selectedChar}
          className={props.side}
        >
          {loadedChars.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !isLoading &&
      (!loadedChars || loadedChars.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
  }

export default CharPicker;