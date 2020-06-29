function findNext(current) { // test with #6095
  var found = null;
  var safe = 0;
  
  for (var i = 0; i < thegame.board.cells.length; i++) {
    var c = thegame.board.cells[i];
    if (c.length) {
      if (!current && c[c.length - 1].rank === 0) {
        found = {
          region: 'cells',
          zone: i
        };
        break;
      } else if (current && c[c.length - 1].rank === current.rank + 1 && c[c.length - 1].suit === current.suit) {
        found = {
          region: 'cells',
          zone: i
        };
        break;
      }
    }
  };
  
  for (var j = 0; j < thegame.board.columns.length; j++) {
    var c = thegame.board.columns[j];
    if (c.length) {
      if (!current && c[c.length - 1].rank === 0) {
        found = {
          region: 'columns',
          zone: j
        };
        break;
      } else if (current && c[c.length - 1].rank === current.rank + 1 && c[c.length - 1].suit === current.suit) {
        found = {
          region: 'columns',
          zone: j
        };
        break;
      }
    }
  };
  
  if (!current || current.rank === 0) {
    safe = 2;
  } else {
    thegame.board.stacks.forEach(function(s) {
      if (s.length && s[s.length - 1].rank >= current.rank - 1 && s[s.length - 1].color !== current.color) {
        safe += 1;
      }
    });
  }

  return {
    found: found,
    safe: safe > 1 ? true : false
  };
}

function postMove() {
  for (var i = 0; i < thegame.board.stacks.length; i++) {
    var stack = thegame.board.stacks[i];
    var res = findNext(stack[stack.length - 1] || null);
    if (res.found && res.safe) {

      // would rather move directly
      move.select(res.found);
      move.select({region: 'stacks', zone: i});

      // commented to not double up cause it runs after every regular move
      //setTimeout(postMove, 100);
      break;
    }
  };
}