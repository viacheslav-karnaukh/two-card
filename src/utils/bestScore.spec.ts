import { findBestScoreIndexes } from './bestScore';

describe('findBestScoreIndexes', () => {
  it('should return empty array if no scores', () => {
    expect(findBestScoreIndexes([0, 0])).toEqual([]);
  });

  it('should return array with indexes of the highest scores', () => {
    expect(findBestScoreIndexes([3, 3])).toEqual([0, 1]);
    expect(findBestScoreIndexes([0, 2, 1, 2])).toEqual([1, 3]);
  });
});
