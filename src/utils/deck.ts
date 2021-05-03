const suites = [
  'spade',
  'heart',
  'club',
  'diamond',
];

const ranks = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A'
];

export const createDeck = () => suites.flatMap((suite) => ranks.map((rank) => ({ suite, rank })));

export const preloadImages = (deck: {suite: string, rank: string}[]) => {
  deck.forEach(({ suite, rank }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = `http://h3h.net/images/cards/${suite}_${rank}.svg`;
    document.head.appendChild(link);
  })
};
