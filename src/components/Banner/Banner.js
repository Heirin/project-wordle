import React from 'react';

function NewGameButton({ onClick }) {
	return (
		<button className='restart' onClick={onClick}>
			New Game
		</button>
	);
}

function Banner({ gameState, answer, restart }) {
	const handleRestart = () => {
		restart(true);
	};
	const winBanner = (
		<p className='happy banner'>
			You won! <NewGameButton onClick={handleRestart} />
		</p>
	);
	const lossBanner = (
		<p className='sad banner'>
			You lost. The answer is {answer}.{' '}
			<NewGameButton onClick={handleRestart} />
		</p>
	);
	const banner = gameState === 'won' ? winBanner : lossBanner;

	return gameState !== 'playing' && banner;
}

export default Banner;