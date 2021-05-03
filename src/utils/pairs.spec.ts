import { findPairedIndexes } from './pairs';

describe('findPairedIndexes', () => {
  it('should return empty array if no pairs', () => {
    const data = [
      {suite: 'club', rank: '2'},
      {suite: 'club', rank: '3'},
    ];
    expect(findPairedIndexes(data)).toEqual([]);
  });

  it('should return correct paired indexes', () => {
    const data = [
      {suite: 'club', rank: '2'},
      {suite: 'heart', rank: '2'},
      {suite: 'club', rank: '3'},
      {suite: 'heart', rank: '3'},
    ];
    expect(findPairedIndexes(data)).toEqual([
      [0, 1],
      [2, 3]
    ]);
  });
});
