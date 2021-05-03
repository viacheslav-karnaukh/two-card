import { generateRandomNumbers } from './randomNumbers';
import { CardType } from '../components/Card/Card';

export const makeHands = (deck: CardType[], handsCount: number, cardsPerHand: number): CardType[][] => {
  const randomIndexes = generateRandomNumbers(handsCount * cardsPerHand, deck.length);

  return randomIndexes.reduce((hands, randomIndex) => {
    let [currentHand] = hands.slice(-1) as Array<any>;
    const shouldCreateNewHand = !currentHand || currentHand.length === cardsPerHand;

    if(shouldCreateNewHand) {
      currentHand = [];
      hands.push(currentHand);
    }

    const card = deck[randomIndex];
    currentHand.push(card);
    return hands;
  }, [] as CardType[][]);
};
