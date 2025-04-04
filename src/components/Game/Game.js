import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED, WORD_LENGTH, KEBOARD_LETTERS } from '../../constants.js';
import GuessInput from '../GuessInput/GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import Banner from '../Banner/Banner.js';
import { checkGuess } from '../../game-helpers.js';
import Keyboard from '../Keyboard/Keyboard.js';

function Game() {
	const [answer, setAnswer] = React.useState(sample(WORDS));
	const [guess, setGuess] = React.useState('');
	const [guesses, setGuesses] = React.useState([]);
	const [gameState, setGameState] = React.useState('playing'); // playing, won, lost
	const [letters, setLetters] = React.useState([]);
	const [newGame, setNewGame] = React.useState(true);

	// Initialize the game
	React.useEffect(() => {
		if (newGame) {
			const newLetters = KEBOARD_LETTERS.map((letter) => {
				return { letter: letter, status: '' };
			});
			setAnswer(sample(WORDS));
			setGameState('playing');
			setGuess('');
			setGuesses([]);
			setLetters(newLetters);
			setNewGame(false);
		}
		console.log('answer', answer);
	}, [newGame, answer]);

	// Game state handling
	React.useEffect(() => {
		let state = guesses.length < NUM_OF_GUESSES_ALLOWED ? 'playing' : 'lost';
		const word = guesses[guesses.length - 1]?.word;
		state = word === answer ? 'won' : state;

		setGameState(state);
	}, [guesses, answer]);

	// Updates the guess state when the user types in the input field.
	// It also ensures that the guess is always in uppercase and no more than 5 characters.
	const updateGuess = (value) => {
		let nextGuess = value.toUpperCase();
		if (nextGuess.length > WORD_LENGTH) {
			nextGuess = guess;
		}
		setGuess(nextGuess);
	};

	// Updates the guesses state when the user submits a guess.
	// It makes sure that the guess is 5 characters long and the game is still in progress.
	const updateGuesses = () => {
		if (gameState !== 'playing') {
			alert('Game over! Start a new game.');
			return;
		}
		const nextList = [...guesses];
		if (guess.length === WORD_LENGTH && nextList.length < NUM_OF_GUESSES_ALLOWED) {
			const nextGuess = { word: guess, letters: checkGuess(guess, answer) };
			nextList.push(nextGuess);
			updateLetters(nextGuess.letters);
		}
		setGuesses(nextList);
	};

	const updateLetters = (guessLetters) => {
		let nextLetters = [...letters];
		nextLetters = nextLetters.map((entry) => {
			const status = entry.status;
			guessLetters.forEach((guessLetter) => {
				if (entry.letter === guessLetter.letter) {
					if (status === '' ||	(status === 'misplaced' && guessLetter.status === 'correct')) {
						entry.status = guessLetter.status;
					}
				}
			});

			return entry;
		});

		setLetters(nextLetters);
	};

	return (
		<>
			<GuessResults guesses={guesses} />
			<GuessInput
				guess={guess}
				updateGuess={updateGuess}
				updateGuesses={updateGuesses}
			/>
			<Keyboard
				letters={letters}
				guess={guess}
				updateGuess={updateGuess}
				updateGuesses={updateGuesses}
			/>
			<Banner gameState={gameState} answer={answer} restart={setNewGame} />
		</>
	);
}

export default Game;