import { makeColorGenerator } from './colorGenerator';

const colorGenerator = makeColorGenerator();

describe('makeColorGenerator', () => {
  it('should create correct colors', () => {
    const colors = [
      colorGenerator(),
      colorGenerator(),
      colorGenerator()
    ];
    expect(colors).toEqual([
      'tomato',
      'blueviolet',
      'yellow'
    ]);
  });

  it('should generate colors from the beginning when finished', () => {
    const colors = [
      colorGenerator(),
      colorGenerator(),
      colorGenerator(),
      colorGenerator()
    ];
    expect(colors[3]).toEqual(colors[0]);
  });
});
