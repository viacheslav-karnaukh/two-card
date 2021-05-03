import { createDeck, preloadImages } from './deck';
import { screen } from '@testing-library/react';

const deck = createDeck();;

describe('createDeck', () => {
  it('should create deck with 52 cards', () => {
    expect(deck).toHaveLength(52);
  });

  it('should create "spade", "heart", "club", "diamond" suites for all ranks', () => {
    expect(deck[0]).toEqual({ suite: 'spade', rank: '2' });
    expect(deck[51]).toEqual({ suite: 'diamond', rank: 'A' });
  });
});

describe('preloadImages', () => {
  it('should append preload links to head', () => {
    const initialChildrenCount = document.head.children.length;
    preloadImages(deck);
    expect(document.head.children.length).toBeGreaterThan(initialChildrenCount);
  });

  it('should create preload links with proper attributes', () => {
    preloadImages(deck);
    expect(document.head.lastChild).toMatchObject({
      rel: 'preload',
      as: 'image',
      href: 'http://h3h.net/images/cards/diamond_A.svg'
    });
  });
});
