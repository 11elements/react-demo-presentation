import React, { useEffect } from 'react';
import { CharacterFactory } from './CharacterFactory';
import { useHttp } from '../hooks/http';

import Summary from './Summary';

const Character = props => {

    const [isLoading, data] = useHttp(`https://swapi.dev/api/people/${props.selectedChar}`, [props.selectedChar])
    
    let character = null;

    if(data) {
        character = new CharacterFactory(props.selectedChar, data)
    }

    useEffect(() => {
        return () =>{
            console.log('This works like componentWillUnmount lifecycle')
        }
    }, [])

    let content = <p>Loading Character...</p>;

    if (!isLoading && character) {
      content = (
        <Summary
          name={character.name}
          gender={character.gender}
          height={character.height}
          hairColor={character.colors.hair}
          skinColor={character.colors.skin}
          movieCount={character.movieCount}
        />
      );
    } else if (!isLoading && !character) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
}

export default React.memo(Character);