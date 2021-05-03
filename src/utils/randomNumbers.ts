export const generateRandomNumbers = (count: number, range: number): number[] => {
  const randomNumbersSet = new Set();
  const generatedNumbersCount = Math.min(count, range) || 0;

  while(randomNumbersSet.size !== generatedNumbersCount) {
    randomNumbersSet.add(Math.floor(Math.random() * range));
  }

  return Array.from(randomNumbersSet) as number[];
};
