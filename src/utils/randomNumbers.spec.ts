import { generateRandomNumbers } from './randomNumbers';

describe('generateRandomNumbers', () => {
  it('should create array with proper size', () => {
    const randomNumbers = generateRandomNumbers(5, 100);
    expect(randomNumbers).toHaveLength(5);
  });

  it('should create unique numbers', () => {
    const randomNumbers = generateRandomNumbers(10, 10);
    const uniqueNumbers = new Set(randomNumbers);
    expect(randomNumbers).toHaveLength(uniqueNumbers.size);
  });

  it('should not break if range < count', () => {
    expect(() => generateRandomNumbers(5, 1)).not.toThrow();
  });
});
