var suits = [{
  id: 'C',
  color: 'black',
  snippet: '<circle cx="46" cy="22" r="21" />\
    <circle cx="22" cy="58" r="21" />\
    <circle cx="70" cy="58" r="21" />\
    <circle cx="46" cy="50" r="16" />\
    <polygon points="46,50 56,92 36,92" />'
}, {
  id: 'D',
  color: 'red',
  snippet: '<polygon points="46,0 84,46 46,92 8,46" />'
}, {
  id: 'H',
  color: 'red',
  snippet: '<ellipse cx="25" cy="28" rx="24" ry="27" />\
    <ellipse cx="67" cy="28" rx="24" ry="27" />\
    <polygon points="46,28 86,45 46,92 6,45" />'
}, {
  id: 'S',
  color: 'black',
  snippet: '<polygon points="46,0 86,44 46,50 6,44" />\
    <circle cx="22" cy="58" r="21" />\
    <circle cx="70" cy="58" r="21" />\
    <circle cx="46" cy="50" r="16" />\
    <polygon points="46,50 56,92 36,92" />'
}];

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

var ranks = [{
  id: 'A',
  positions: ['A', 'R', 'S', 'T', 'U'],
  snippet: '<path d="M8 66L28 6h4l20 60M16 46h28M0 66h20m20 0h20" />'
}, {
  id: '2',
  positions: ['B', 'C', 'R', 'S', 'T', 'U'],
  snippet: '<path d="M14 20v-4A10 10 0 0124 6h12a10 10 0 0110 10v6L14 54v12h32V48" />'
}, {
  id: '3',
  positions: ['A', 'B', 'C', 'R', 'S', 'T', 'U'],
  snippet: '<path d="M14 16V6h32v2L22 32v2h14a10 10 0 0110 10v12a10 10 0 01-10 10H24a10 10 0 01-10-10v-4" />'
}, {
  id: '4',
  positions: ['D', 'E', 'F', 'G', 'R', 'S', 'T', 'U'],
  snippet: '<path d="M42 66V6h-2L10 36v6h46M32 66h20" />'
}, {
  id: '5',
  positions: ['A', 'D', 'E', 'F', 'G', 'R', 'S', 'T', 'U'],
  snippet: '<path d="M48 6H14v24h22a10 10 0 0110 10v16a10 10 0 01-10 10H24a10 10 0 01-10-10v-8" />'
}, {
  id: '6',
  positions: ['D', 'E', 'F', 'G', 'H', 'I', 'R', 'S', 'T', 'U'],
  snippet: '<path d="M44 6H32a18 18 0 00-18 18v32a10 10 0 0010 10h12a10 10 0 0010-10V40a10 10 0 00-10-10H24a10 10 0 00-10 10v4" />'
}, {
  id: '7',
  positions: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'R', 'S', 'T', 'U'],
  snippet: '<path d="M14 16V6h32v4a140 140 0 00-20 50v12" />'
}, {
  id: '8',
  positions: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'R', 'S', 'T', 'U'],
  snippet: '<path d="M36 6H24a10 10 0 00-10 10v8a10 10 0 0010 10h12a10 10 0 0110 10v12a10 10 0 01-10 10H24a10 10 0 01-10-10V44a10 10 0 0110-10h12a10 10 0 0010-10v-8A10 10 0 0036 6h-4" />'
}, {
  id: '9',
  positions: ['A', 'D', 'E', 'F', 'G', 'L', 'M', 'N', 'O', 'R', 'S', 'T', 'U'],
  snippet: '<path d="M46 32V16A10 10 0 0036 6H24a10 10 0 00-10 10v16a10 10 0 0010 10h12a10 10 0 0010-10v-4 20a18 18 0 01-18 18H16" />'
}, {
  id: 'T',
  positions: ['D', 'E', 'F', 'G', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'],
  snippet: '<path d="M10 0v72m40-52v-4A10 10 0 0040 6h-4a10 10 0 00-10 10v40a10 10 0 0010 10h4a10 10 0 0010-10V16" />'
}, {
  id: 'J',
  positions: ['R', 'S', 'T', 'U'],
  snippet: '<path d="M42 6v50a10 10 0 01-10 10h-4a10 10 0 01-10-10v-8M32 6h20" />'
}, {
  id: 'Q',
  positions: ['R', 'S', 'T', 'U'],
  snippet: '<path d="M46 20v-4A10 10 0 0036 6H24a10 10 0 00-10 10v40a10 10 0 0010 10h12a10 10 0 0010-10V16M34 66a12 12 0 0012 12h6" />'
}, {
  id: 'K',
  positions: ['R', 'S', 'T', 'U'],
  snippet: '<path d="M14 6v60M50 6v2L14 44v2m8-10l28 28v2M4 6h20m12 0h20M4 66h20m12 0h20" />'
}];


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
      temp.href = '#' + rankref
    }
    if (temp.href === '#suit') {
      temp.href = '#' + suitref
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
  }
  
  this.render = function() {
    return this.svg;
  }
}

// need to cleanup defs
// also so far you are not using the actual card for anything
// just dropping svg in dom
