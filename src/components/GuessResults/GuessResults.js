import React from 'react';
import { NUM_OF_GUESSES_ALLOWED, WORD_LENGTH } from '../../constants.js';
import { range } from '../../utils.js';

function Cell({ letter, status }) {
	const className = status ? `cell ${status}` : 'cell';
	return <span className={className}>{letter || ''}</span>;
}

function Row({ letters }) {
	return (
		<p className='guess'>
			{range(0, WORD_LENGTH).map((cellIndex) => {
				return (
					<Cell
						key={Math.random()}
						letter={letters[cellIndex]?.letter}
						status={letters[cellIndex]?.status}
					/>
				);
			})}
		</p>
	);
}

function GuessResults({ guesses }) {
	return (
		<div className='guess-results'>
			{range(0, NUM_OF_GUESSES_ALLOWED).map((rowIndex) => {
				const wordData = guesses[rowIndex];
				const letters = wordData ? wordData.letters : [];

				return <Row key={Math.random()} letters={letters} />;
			})}
		</div>
	);
}

export default GuessResults;