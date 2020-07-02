
import Deck from './Deck.js';
import {createElement} from './element.js';
import gps from './gps.js';
import Card from './Card.js';
import move from './move.js';

export var thegame = null;

function Game(number) {
  this.board = {
    cells: [[], [], [], []],
    stacks: [[], [], [], []],
    columns: [[], [], [], [], [], [], [], []]
  };

  document.getElementById('board').innerHTML = '';
  this.deck = new Deck();
  this.deck.shuffle(number);

  //deal
  for (var i = 0; i < this.deck.cards.length; i++) {
    var card = this.deck.cards[i];
    this.board.columns[i % 8].push(card);
  }
  
  //render
  for (var region in this.board) {
    for (var zone in this.board[region]) {

      var elem = createElement('div', {
        parent: document.getElementById('board'),
        class: region,
        attributes: {
          'data-region': region,
          'data-zone': zone
        },
        styles: gps({
          region: region,
          zone: parseInt(zone)
        })
      });
      
      elem.addEventListener('click', function() {
        move.select({
          region: this.getAttribute('data-region'),
          zone: parseInt(this.getAttribute('data-zone'))
        });
      });

      elem.addEventListener('dblclick', function() {
        move.free({
          region: this.getAttribute('data-region'),
          zone: parseInt(this.getAttribute('data-zone'))
        });
      });

      for (var number in this.board[region][zone]) {
        var thecard = this.board[region][zone][number];
        var position = gps({
          region: region,
          zone: parseInt(zone),
          number: parseInt(number)
        });
        
        // should change ranks suits back to array in Card then
        var div = new Card(thecard.rank, thecard.suit).render();
        div.style.top = position.top;
        div.style.left = position.left;
        div.style.zIndex = position.zIndex;

        document.getElementById('board').appendChild(div);
      }
    }
  }
  thegame = this;
}

export default Game;