import React from 'react';

export type CardType = {
  suite: string;
  rank: string;
};

export const Card = ({ suite, rank, highlightColor }: CardType & {highlightColor?: string}) => {
  return (
    <div className="card-wrapper" style={{outline: highlightColor ? `5px solid ${highlightColor}`: 'none'}}>
      <img src={`http://h3h.net/images/cards/${suite}_${rank}.svg`} alt={`${rank} of ${suite}`} className="card" />
    </div>
  );
};
