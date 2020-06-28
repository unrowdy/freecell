function Deck() {
  this.cards = [];
  for(var i = 0; i < ranks.length; i++) {
    for(var j = 0; j < suits.length; j++) {
      var n = i * suits.length + j;
      this.cards[n] = {
        id: ranks[i].id + suits[j].id,
        rank: i,
        suit: j,
        color: (j % 3) ? 1 : 0
      };
    }
  }
  
  this.shuffle = function(seed) {
    for(var i = this.cards.length; i > 0; i--) {
      seed = (seed * 214013 + 2531011) & 0x7FFFFFFF;
      var r = (seed >> 16) & 0x7fff;
      
      var selected = this.cards.splice(r % i, 1, this.cards[i - 1]);
      this.cards.splice(i - 1, 1, selected[0]);
    }
    this.cards.reverse();
  }
}
