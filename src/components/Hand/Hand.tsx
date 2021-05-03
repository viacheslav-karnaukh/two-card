import React from 'react';

import { Card, CardType } from '../Card/Card';

type HandPropsType = {
  cards: CardType[];
  colorsByCardIndex: Record<string, string>,
  sequenceNumber: number
};
export const Hand = ({cards = [], colorsByCardIndex, sequenceNumber}: HandPropsType) => {
  return cards.length ? (
    <div className="hand">
      {cards.map(({suite, rank}, i) => (
        <Card
          key={`${suite}-${rank}`}
          suite={suite}
          rank={rank}
          highlightColor={colorsByCardIndex[i]}
        />)
      )}
    </div>
  ) : <h2>Hand {sequenceNumber}. Waiting for deal...</h2>;
};
