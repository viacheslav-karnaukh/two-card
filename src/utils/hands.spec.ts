import { makeHands } from './hands';
import { createDeck } from './deck';

const hands = makeHands(createDeck(), 2, 7);

describe('makeHands', () => {
  it('should create correct count of hands', () => {
    expect(hands).toHaveLength(2);
  });

  it('should create correct count of cards in each hand', () => {
    expect(hands.flat()).toHaveLength(2 * 7);
  });
});
