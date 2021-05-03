import React, { useReducer } from 'react';
import './App.css';
import { appReducer, appState } from './reducer';
import { addHand, removeHand, dealCards } from './actions';
import { Hand } from '../Hand/Hand';
import { createDeck, preloadImages } from '../../utils/deck';

export const deck = createDeck();

const App = () => {
  preloadImages(deck);

  const [state, dispatch] = useReducer(appReducer, appState);
  const {
    canAddHand,
    canRemoveHand,
    handsCards,
    colorsByCardIndex,
    handsCount,
    bestScoreHands
  } = state;

  const handleDealCards = () => dealCards(state, dispatch);
  const handleAddHand = () => addHand(state, dispatch);
  const handleRemoveHand = () => removeHand(state, dispatch);

  return (
    <main>
      <aside>
        <button className="play-button" onClick={handleDealCards}>
          Deal Cards
        </button>
        <button className="play-button" onClick={handleAddHand} disabled={!canAddHand}>
          Add Hand
        </button>
        <button className="play-button" onClick={handleRemoveHand} disabled={!canRemoveHand}>
          Remove Hand
        </button>
      </aside>
      {(Array.from({length: handsCount})).map((_, i) => {
        return (
          <div className={'hand-wrapper'.concat(bestScoreHands.includes(i) ? ' best-score' : '')} key={i}>
            <Hand cards={handsCards[i]} colorsByCardIndex={colorsByCardIndex[i]} sequenceNumber={i + 1} />
          </div>
        );
      })}
    </main>
  );
};

export default App;
