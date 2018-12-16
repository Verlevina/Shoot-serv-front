
install:
	npm install

start:
	npx babel-node -- src/bin/brain-games.js

publish:
	npm publish

lint:
	npx eslint .

game-even:
	npx babel-node -- src/bin/brain-even.js

game-calc:
	npx babel-node -- src/bin/brain-calc.js

game-gcd:
	npx babel-node -- src/bin/brain-gcd.js

game-progression:
	npx babel-node -- src/bin/brain-progression.js

game-prime:
	npx babel-node -- src/bin/brain-prime.js