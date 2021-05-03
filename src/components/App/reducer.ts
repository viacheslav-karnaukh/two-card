import { CardType } from '../Card/Card';
import { MIN_HANDS_COUNT } from '../../constants/app';
import { ADD_HAND, REMOVE_HAND, DEAL_CARDS } from './actions';

export type AppStateType = {
  handsCount: number;
  handsCards: CardType[][],
  colorsByCardIndex: Record<string, string>,
  bestScoreHands: number[],
  canAddHand: boolean,
  canRemoveHand: boolean
};

type ActionType = {
  type: string;
  payload?: any;
};

export const appState: AppStateType = {
  handsCount: MIN_HANDS_COUNT,
  handsCards: [],
  colorsByCardIndex: {},
  bestScoreHands: [],
  canAddHand: true,
  canRemoveHand: false
};

export const appReducer = (state: AppStateType, {type, payload}: ActionType) => {
  switch(type) {
    case DEAL_CARDS: {
      const { handsCards, colorsByCardIndex, bestScoreHands } = payload;
      return {
        ...state,
        handsCards,
        colorsByCardIndex,
        bestScoreHands
      };
    }
    case ADD_HAND: {
      const { handsCount, canAddHand, canRemoveHand } = payload;
      return {
        ...state,
        handsCount,
        canAddHand,
        canRemoveHand
      };
    }
    case REMOVE_HAND: {
      const { handsCards, handsCount, canAddHand, canRemoveHand, bestScoreHands } = payload;
      return {
        ...state,
        handsCards,
        handsCount,
        canAddHand,
        canRemoveHand,
        bestScoreHands
      };
    }
    default: return state;
  }
};
