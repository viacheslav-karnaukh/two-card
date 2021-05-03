# Cards Game

Mini game where clicking the button generate several hand cards

- a hand has seven cards
- the winner of the game will be defined by the amount of pairs a hand has
- each "deal" will create a brand new "game" with new hands
- hands can be added or removed (2-4)
- "pairs" are marked with different borders
- game has two hands by default

**Install dependencies**
```sh
yarn
```
**Start game**
```sh
yarn start
```
**Run tests**
```sh
yarn test
```
**Run tests in verbose mode**
```sh
yarn test:verbose
```
### Implementation notes
- TypeScript for static typing
- React.useReducer to manage component state
- Jest and React Testing Library for unit testing
- Image preloading for better UX