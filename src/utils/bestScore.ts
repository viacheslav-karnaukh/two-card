export const findBestScoreIndexes = (scores: number[]) => {
  const bestScore = Math.max(...scores);

  if (!bestScore) {
    return [];
  }

  return scores.reduce((bestScoreIndexes: number[], score: number, i: number) => {
    return bestScore === score ? bestScoreIndexes.concat(i) : bestScoreIndexes;
  }, []);
};
