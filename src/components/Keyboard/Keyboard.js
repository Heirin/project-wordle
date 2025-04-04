import React from 'react';
import { range } from '../../utils';

function KeyButton({ letter, status, clickHandler }) {
  return (
    <button className={`key ${status}`} onClick={clickHandler}>
      {letter}
    </button>
  );
}

function Keyboard({ letters, guess, updateGuess, updateGuesses }) {
  const handleKeyClick = (event) => {
    const letter = event.target.innerText;
    updateGuess(guess + letter);
    console.log('clicked', letter);
  };

  const handleDelete = () => {
    const nextGuess = guess.slice(0, guess.length - 1);
    updateGuess(nextGuess);
  };

  const handleEnter = (event) => {
    event.preventDefault();
    updateGuesses();
    updateGuess('');
  };

  return (
    <div className='keyboard'>
      <div className='key-row'>
        {range(0, 10).map((index) => {
          const letter = letters[index];
          return (
            <KeyButton
              key={Math.random()}
              letter={letter?.letter}
              status={letter?.status}
              clickHandler={handleKeyClick}
            />
          );
        })}
      </div>
      <div className='key-row'>
        {range(10, 20).map((index) => {
          const letter = letters[index];
          return (
            <KeyButton
              key={Math.random()}
              letter={letter?.letter}
              status={letter?.status}
              clickHandler={handleKeyClick}
            />
          );
        })}
      </div>
      <div className='key-row'>
        <KeyButton letter='ENTER' status='enter' clickHandler={handleEnter} />
        {range(20, letters.length).map((index) => {
          const letter = letters[index];
          return (
            <KeyButton
              key={Math.random()}
              letter={letter?.letter}
              status={letter?.status}
              clickHandler={handleKeyClick}
            />
          );
        })}
        <KeyButton letter='<' status='delete' clickHandler={handleDelete} />
      </div>
    </div>
  );
}

export default Keyboard;