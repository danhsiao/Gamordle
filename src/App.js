import React, { useState, useEffect } from 'react';
import GameImage from './GameImage';
import GuessInput from './GuessInput';
import './App.css'; // Or other styling approach

function App() {
  const [token, setToken] = useState('');
  const [image, setImage] = useState(''); // State for storing the game cover image URL
  
  useEffect(() => {
    fetch('/api/get-game-cover')
      .then(response => {
        console.log(response)
        return response.json();
      })
      .then(data => {
        console.log(data)
        setImage(data.imageUrl);})
      .catch(error => console.error('Error:', error));
  }, []);

  const handleGuessSubmit = (guess) => {
    // Handle the guess logic here
    console.log("User guessed: ", guess);
  };

  return (
    <div className="App">
      <h1>Gamordle</h1>
      {image && <img src={image} alt="Game Cover" />}
      <GuessInput onGuessSubmit={handleGuessSubmit} />
      {/* Other components like ScoreBoard, if any */}
    </div>
  );
}

export default App;
