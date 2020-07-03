import ranks from './ranks.js';
import suits from './suits.js';
import {createSVGElement} from './element.js';

// could make these calculations
var positions = {
  'R': { href: '#rank', x: '12',  y: '24' }, // topLeftRank
  'T': { href: '#suit', x: '12',  y: '112', width: '60', height: '60', }, // topLeftSuit
  'D': { href: '#suit', x: '92',  y: '60'  }, // topLeft
  'B': { href: '#suit', x: '168', y: '60'  }, // topCenter
  'E': { href: '#suit', x: '244', y: '60'  }, // topRight
  'P': { href: '#suit', x: '168', y: '120' }, // oneSixthCenter
  'J': { href: '#suit', x: '168', y: '150' }, // oneQuarterCenter
  'L': { href: '#suit', x: '92',  y: '180' }, // oneThirdLeft
  'M': { href: '#suit', x: '244', y: '180' }, // oneThirdRight
  'H': { href: '#suit', x: '92',  y: '240' }, // oneHalfLeft
  'A': { href: '#suit', x: '168', y: '240' }, // oneHalfCenter
  'I': { href: '#suit', x: '244', y: '240' }, // oneHalfRight
  'N': { href: '#suit', x: '92',  y: '300', transform: 'rotate(180, 138, 346)' }, // twoThirdLeft
  'O': { href: '#suit', x: '244', y: '300', transform: 'rotate(180, 290, 346)' }, // twoThirdRight
  'K': { href: '#suit', x: '168', y: '330', transform: 'rotate(180, 214, 376)' }, // threeQuarterCenter
  'Q': { href: '#suit', x: '168', y: '360', transform: 'rotate(180, 214, 406)' }, // fiveSixthCenter
  'F': { href: '#suit', x: '92',  y: '420', transform: 'rotate(180, 138, 466)' }, // bottomLeft
  'C': { href: '#suit', x: '168', y: '420', transform: 'rotate(180, 214, 466)' }, // bottomCenter
  'G': { href: '#suit', x: '244', y: '420', transform: 'rotate(180, 290, 466)' }, // bottomRight
  'U': { href: '#suit', x: '356', y: '400', width: '60', height: '60', transform: 'rotate(180, 386, 430)' }, // bottomRightSuit
  'S': { href: '#rank', x: '356', y: '464', transform: 'rotate(180, 386, 506)' }, // bottomRightRank
  'V': {} // face border?
};

function makeSvg(rank, suit) {
  var rankref = 'r' + ranks[rank].id;
  var suitref = 's' + suits[suit].id;
  
  var svg = createSVGElement('svg', {
    attributes: {
      xmlns: 'http://www.w3.org/2000/svg',
      id: ranks[rank].id + suits[suit].id,
      viewBox: '0 0 428 576',
      color: suits[suit].color
    }
  });

  var defs = createSVGElement('defs', {
    parent: svg
  });

  createSVGElement('symbol', { // suit symbol
    parent: defs,
    content: suits[suit].snippet,
    attributes: {
      id: suitref,
      width: '92',
      height: '92',
      viewBox: '0 0 92 92',
      fill: 'currentColor',
      stroke: 'none'
    }
  });

  createSVGElement('symbol', { // rank symbol
    parent: defs,
    content: ranks[rank].snippet,
    attributes: {
      id: rankref,
      width: '60',
      height: '84',
      viewBox: '0 0 60 84',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '12'
    }
  });

  createSVGElement('rect', { // border
    parent: svg,
    attributes: {
      x: '2',
      y: '2',
      rx: '20',
      ry: '20',
      width: '424',
      height: '572',
      fill: '#fff',
      stroke: '#000',
      'stroke-width': '4'
    }
  });
  
  if(['J', 'Q', 'K'].indexOf(ranks[rank].id) > -1) {
    createSVGElement('rect', { // face card border
      parent: svg,
      attributes: {
        x: '78',
        y: '70',
        width: '272',
        height: '432',
        fill: '#eee',
        stroke: '#000',
        'stroke-width': '4'
      }
    });
  }

  for (var position of ranks[rank].positions) {
    // damn defs are not scoped
    // will have to make them all unique
    // or reuse them
    // or don't use defs
    var temp = JSON.parse(JSON.stringify(positions[position]));
    if (temp.href === '#rank') {
      temp.href = '#' + rankref;
    }
    if (temp.href === '#suit') {
      temp.href = '#' + suitref;
    }
    // efficient would be make all the defs in a hidden svg
    // then just use them
    
    createSVGElement('use', {
      parent: svg,
      attributes: temp
    });
  }

  return svg;
}

function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.color = suits[suit].color;
  this.svg = makeSvg(rank, suit);
  
  this.log = function() {
    return this.rank + this.suit;
  };
  
  this.render = function() {
    return this.svg;
  };
}

// need to cleanup defs
// also so far you are not using the actual card for anything
// just dropping svg in dom

export default Card;