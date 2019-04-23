const algoliasearch = require('algoliasearch');

const client = algoliasearch('5E0AQ9NLML', 'de6a6a13700df41d6feffe0064fc3f09');
const index = client.initIndex('cards');
console.log('run script?');

const cards = require('./cards.json');

index.addObjects(cards);
