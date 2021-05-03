import {
  addHand,
  AddHandAction,
  removeHand,
  RemoveHandAction,
  dealCards,
  DealCardsAction
} from './actions';
import { AppStateType,  } from './reducer';

let dispatchMock: jest.Mock<any, any>;
let state: AppStateType;

const getActionFromDispatchMock = (dispatch: jest.Mock<any, any>): AddHandAction | RemoveHandAction | DealCardsAction => {
  return dispatch.mock.calls[0][0];
};

beforeEach(() => {
  dispatchMock = jest.fn();
  state = {
    handsCount: 2,
    handsCards: [
      [{suite: 'diamond', rank: 'A'}],
      [{suite: 'spade', rank: 'A'}]
    ],
    colorsByCardIndex: {0: 'red'},
    bestScoreHands: [1],
    canAddHand: true,
    canRemoveHand: false
  };
});

describe('App actions', () => {
  describe('Add hand', () => {
    it('should not add hand if it is not allowed', () => {
      state.canAddHand = false;
      addHand(state, dispatchMock);
      expect(dispatchMock).not.toBeCalled();
    });

    it('should increase hands count', () => {
      addHand(state, dispatchMock);
      const action = getActionFromDispatchMock(dispatchMock) as AddHandAction;
      expect(action.payload.handsCount).toBe(3);
    });

    it('should not allow to add more than 4 hands', () => {
      state.handsCount = 3; // one more hand can be added
      addHand(state, dispatchMock);
      const action = getActionFromDispatchMock(dispatchMock) as AddHandAction;
      expect(action.payload.canAddHand).toBe(false);
    });

    it('should allow to remove hand if hands count > 2', () => {
      addHand(state, dispatchMock);
      const action = getActionFromDispatchMock(dispatchMock) as AddHandAction;
      expect(action.payload.canRemoveHand).toBe(true);
    });
  });

  describe('Remove hand', () => {
    it('should not remove hand if it is not allowed', () => {
      removeHand(state, dispatchMock);
      expect(dispatchMock).not.toBeCalled();
    });

    it('should decrease hands count', () => {
      state.handsCount = 4;
      state.canRemoveHand = true;
      removeHand(state, dispatchMock);
      const action = getActionFromDispatchMock(dispatchMock) as RemoveHandAction;
      expect(action.payload.handsCount).toBe(3);
    });

    it('should not allow to remove last 2 hands', () => {
      state.handsCount = 3;
      state.canRemoveHand = true;
      removeHand(state, dispatchMock);
      const action = getActionFromDispatchMock(dispatchMock) as RemoveHandAction;
      expect(action.payload.canRemoveHand).toBe(false);
    });

    it('should allow to add hand if hands count < 4', () => {
      state.handsCount = 4;
      state.canAddHand = false;
      state.canRemoveHand = true;
      removeHand(state, dispatchMock);
      const action = getActionFromDispatchMock(dispatchMock) as RemoveHandAction;
      expect(action.payload.canAddHand).toBe(true);
    });

    it('should remove cards from hand if hand was removed', () => {
      state.handsCount = 3;
      state.canRemoveHand = true;
      state.handsCards = [
        [{suite: 'diamond', rank: 'A'}],
        [{suite: 'spade', rank: 'A'}],
        [{suite: 'club', rank: 'A'}],
        [{suite: 'heart', rank: 'A'}]
      ];
      removeHand(state, dispatchMock);
      const action = getActionFromDispatchMock(dispatchMock) as RemoveHandAction;
      expect(action.payload.handsCards).toHaveLength(2);
    });
  });

  describe('Deal cards', () => {
    it('should deal cards for all the hands', () => {
      state.handsCards = [];
      state.handsCount = 4;
      dealCards(state, dispatchMock);
      const action = getActionFromDispatchMock(dispatchMock) as DealCardsAction;
      expect(action.payload.handsCards).toHaveLength(4);
    });

    it('should create card colors for each hand', () => {
      dealCards(state, dispatchMock);
      const action = getActionFromDispatchMock(dispatchMock) as DealCardsAction;
      expect(action.payload.colorsByCardIndex).toHaveLength(2);
    });

    it('should find hands with the best score', () => {
      dealCards(state, dispatchMock);
      const action = getActionFromDispatchMock(dispatchMock) as DealCardsAction;
      expect(action.payload.bestScoreHands).toBeDefined();
    });
  });
});
