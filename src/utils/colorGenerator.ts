const colors = [
  'tomato',
  'blueviolet',
  'yellow'
];

export const makeColorGenerator = () => {
  let colorIndex = 0;
  return () => {
    const isLastColor = colorIndex === colors.length;
    if(isLastColor) {
      colorIndex = 0;
    }
    return colors[colorIndex++];
  };
};

export const colorToCardIndex = (pairedIndexes: number[][]) => {
  const generateColor = makeColorGenerator();
  return pairedIndexes.reduce((colorsByIndex: Record<string, any>, pair: number[]) => {
    const color = generateColor();
    pair.forEach((index: number) => colorsByIndex[index] = color);
    return colorsByIndex;
  }, {});
};
