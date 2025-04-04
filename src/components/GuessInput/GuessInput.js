import React from 'react';
import { WORD_LENGTH } from '../../constants';

function GuessInput({ guess, updateGuess, updateGuesses }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (guess.length < WORD_LENGTH) {
      alert('Too short');
    }
    updateGuesses();
    updateGuess(''); // clear the input field
  };

  return (
    <form className='guess-input-wrapper' onSubmit={handleSubmit}>
      <label htmlFor='guess-input'>Enter guess:</label>
      <input
        id='guess-input'
        type='text'
        value={guess}
        onChange={(e) => updateGuess(e.target.value)}
      />
    </form>
  );
}

export default GuessInput;