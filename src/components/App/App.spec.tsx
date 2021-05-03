import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MIN_HANDS_COUNT, CARDS_PER_HAND } from '../../constants/app';

let appContainer: HTMLElement;

beforeEach(() => {
  appContainer = render(<App />).container;
});

describe('App screen', () => {
  describe('Initial screen state', () => {
    it('should contain "Deal Cards" button', () => {
      const button = screen.getByText('Deal Cards');
      expect(button).toBeInstanceOf(HTMLButtonElement);
    });
  
    it('should contain "Add Hand" button', () => {
      const button = screen.getByText('Add Hand');
      expect(button).toBeInstanceOf(HTMLButtonElement);
    });
  
    it('should contain "Remove Hand" button', () => {
      const button = screen.getByText('Remove Hand');
      expect(button).toBeInstanceOf(HTMLButtonElement);
    });
  
    it('should contain 2 hands with proper text', () => {
      const handsTexts = screen.queryAllByText(/Hand \d. Waiting for deal.../);
      expect(handsTexts).toHaveLength(MIN_HANDS_COUNT);
    });

    it('should not contain cards in hands', () => {
      const cards = appContainer.getElementsByClassName('card-wrapper');
      expect(cards).toHaveLength(0);
    });
  });

  describe('Action buttons', () => {
    it('should deal cards', () => {
      fireEvent.click(screen.getByText('Deal Cards'));
      const cards = appContainer.getElementsByClassName('card-wrapper');
      expect(cards).toHaveLength(MIN_HANDS_COUNT * CARDS_PER_HAND);
    });

    it('should add hand', () => {
      fireEvent.click(screen.getByText('Add Hand'));
      const hands = appContainer.getElementsByClassName('hand-wrapper');
      expect(hands).toHaveLength(3);
    });

    it('should remove hand', () => {
      fireEvent.click(screen.getByText('Add Hand'));
      fireEvent.click(screen.getByText('Remove Hand'));
      const hands = appContainer.getElementsByClassName('hand-wrapper');
      expect(hands).toHaveLength(2);
    });
  });
});
