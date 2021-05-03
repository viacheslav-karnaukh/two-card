import { CardType } from '../components/Card/Card';

export const findPairedIndexes = (cards: CardType[]): number[][] => {
  const { pairedIndexes } = cards.reduce((
    {seen, pairedIndexes}: {seen: Record<string,any>, pairedIndexes: number[][]},
    {rank}: CardType,
    i
  ) => {
    const { count, index } = seen[rank] || {};
    if(!count) {
        seen[rank] = {count: 1, index: i};
    } else if(count === 1) {
      pairedIndexes.push([index, i]);
      delete seen[rank];
    }
    return {seen, pairedIndexes};
  
  }, {seen: {}, pairedIndexes: [] });

  return pairedIndexes;
};
