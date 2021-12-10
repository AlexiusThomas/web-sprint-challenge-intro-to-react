import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Character from './components/Character'
import CharacterInfo from './components/CharacterInfo'

const App = () => {

  const [characters, setCharacters] = useState([])
  const [characterDetails, setCharacterDetails] = useState(null)

  const openInfo = character => {
    setCharacterDetails(character)
  }
  const closeInfo = () => {
    setCharacterDetails(null)
  }

  useEffect(() => {
    axios
      .get('https://swapi.dev/api/people')
      .then(response => {
        setCharacters(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log('Characters Error')
      })
  }, [])
  
  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      {characters.map(character => {
        return <Character key={character.id} info={character} action={openInfo} />
      })}
      {characterDetails && <CharacterInfo characterInfo={characterDetails} close={closeInfo} />}
    </div>
  );
}
export default App;