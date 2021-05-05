import { Dispatch } from 'react';
import { AppStateType } from './reducer';
import { MAX_HANDS_COUNT, MIN_HANDS_COUNT, CARDS_PER_HAND } from '../../constants/app';
import { makeHands } from '../../utils/hands';
import { findPairedIndexes } from '../../utils/pairs';
import { findBestScoreIndexes } from '../../utils/bestScore';
import { colorToCardIndex } from '../../utils/colorGenerator';
import { CardType } from '../Card/Card';
import { deck } from './App';

export const ADD_HAND = 'ADD_HAND';
export const REMOVE_HAND = 'REMOVE_HAND';
export const DEAL_CARDS = 'DEAL_CARDS';

export type AddHandAction = {
  type: 'ADD_HAND',
  payload: {
    handsCount: number,
    canAddHand: boolean,
    canRemoveHand: boolean
  }
}

export type RemoveHandAction = {
  type: 'REMOVE_HAND',
  payload: {
    handsCards: CardType[][],
    handsCount: number,
    canAddHand: boolean,
    canRemoveHand: boolean,
    bestScoreHands: number[]
  }
}

export type DealCardsAction = {
  type: 'DEAL_CARDS',
  payload: {
    handsCards: CardType[][],
    colorsByCardIndex: Record<string, string>[],
    bestScoreHands: number[]
  }
}

export const addHand = ({ handsCount, canAddHand }: AppStateType, dispatch: Dispatch<AddHandAction>) => {
  if(!canAddHand) {
    return;
  }
  const newHandsCount = handsCount + 1;
  dispatch({
    type: ADD_HAND,
    payload: {
      handsCount: newHandsCount,
      canAddHand: MAX_HANDS_COUNT > newHandsCount,
      canRemoveHand: MIN_HANDS_COUNT < newHandsCount
    }
  });
};

export const removeHand = ({ handsCount, canRemoveHand, handsCards, bestScoreHands }: AppStateType, dispatch: Dispatch<RemoveHandAction>) => {
  if(!canRemoveHand) {
    return;
  }
  const newHandsCount = handsCount - 1;
  dispatch({
    type: REMOVE_HAND,
    payload: {
      handsCards: newHandsCount >= handsCards.length ? handsCards : handsCards.slice(0, newHandsCount),
      handsCount: newHandsCount,
      canAddHand: MAX_HANDS_COUNT > newHandsCount,
      canRemoveHand: MIN_HANDS_COUNT < newHandsCount,
      bestScoreHands: bestScoreHands.filter((bestScoreIndex) => bestScoreIndex !== newHandsCount)
    }
  });
};

export const dealCards = (state: AppStateType, dispatch: Dispatch<DealCardsAction>) => {
  const handsCards = makeHands(deck, state.handsCount, CARDS_PER_HAND);
  const pairedIndexesByHand = handsCards.map(findPairedIndexes);
  const handsScores = pairedIndexesByHand.map((pairs) => pairs.length);
  const bestScoreHands = findBestScoreIndexes(handsScores);
  const colorsByCardIndex = pairedIndexesByHand.map(colorToCardIndex);

  dispatch({
    type: 'DEAL_CARDS',
    payload: {
      handsCards,
      colorsByCardIndex,
      bestScoreHands
    }
  });
};
