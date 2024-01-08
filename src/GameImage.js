import React from 'react';

function GameImage({ imageUrl }) {
    return (
        <div className="game-image-container">
            {imageUrl && <img src={imageUrl} alt="Game Cover" />}
        </div>
    );
}


export default GameImage;
