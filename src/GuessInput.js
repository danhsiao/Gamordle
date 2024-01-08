import React, { useState } from 'react';

function GuessInput({ onGuessSubmit }) {
    const [guess, setGuess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onGuessSubmit(guess);
        setGuess(''); // Reset the input field after submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
            />
            <button type="submit">Guess</button>
        </form>
    );
}

export default GuessInput;
