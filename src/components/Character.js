import React, { useState, useEffect } from 'react';
import { CharacterFactory } from './CharacterFactory';

import Summary from './Summary';

const Character = props => {

  const [loadedCharacter, setLoadedCharacter] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {

    setIsLoading(true);

    fetch('https://swapi.dev/api/people/' + props.selectedChar)
      .then(response => {
        setIsLoading(false);
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        let loadedCharacter = new CharacterFactory(props.selectedChar, charData);
        setLoadedCharacter(loadedCharacter);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

    useEffect(() => {
        fetchData();
        return () =>{
            console.log('Cleaning up job')
        }
    }, [props.selectedChar])

    useEffect(() => {
        return () =>{
            console.log('This works like componentWillUnmount lifecycle')
        }
    }, [])

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
}

export default React.memo(Character);