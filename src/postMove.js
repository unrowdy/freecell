
import {thegame} from './Game.js';
import gps from './gps.js';
import {speed, queue, process} from './queue.js';

function findNext(current) { // test with #4061 or #6095
  var found = null;
  var safe = 0;
  
  for (var i = 0; i < thegame.board.cells.length; i++) {
    var f = thegame.board.cells[i];
    if (f.length) {
      if (!current && f[f.length - 1].rank === 0) {
        found = {
          region: 'cells',
          zone: i,
          id: f[f.length - 1].id
        };
        break;
      } else if (current && f[f.length - 1].rank === current.rank + 1 && f[f.length - 1].suit === current.suit) {
        found = {
          region: 'cells',
          zone: i,
          id: f[f.length - 1].id
        };
        break;
      }
    }
  }
  
  for (var j = 0; j < thegame.board.columns.length; j++) {
    var c = thegame.board.columns[j];
    if (c.length) {
      if (!current && c[c.length - 1].rank === 0) {
        found = {
          region: 'columns',
          zone: j,
          id: c[c.length - 1].id
        };
        break;
      } else if (current && c[c.length - 1].rank === current.rank + 1 && c[c.length - 1].suit === current.suit) {
        found = {
          region: 'columns',
          zone: j,
          id: c[c.length - 1].id
        };
        break;
      }
    }
  }
  
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

export default function postMove() {
  var done = true;
  for (var i = 0; i < thegame.board.stacks.length; i++) {
    var stack = thegame.board.stacks[i];
    var res = findNext(stack[stack.length - 1] || null);
    if (res.found && res.safe) {
      localMove(res.found, {region: 'stacks', zone: i});
      done = false;
      break;
    }
  }
  if(!done) {
    postMove();
  } else {
    process();
  }
}


export function localMove(source, target) {
  var sourceArea = thegame.board[source.region][source.zone];
  var targetArea = thegame.board[target.region][target.zone];

  var newPosition = gps({
    region: target.region,
    zone: target.zone,
    number: targetArea.length
  });

  var ay = document.getElementById(source.id).style.top;
  var ax = document.getElementById(source.id).style.left;
  var t = speed(ax, ay, newPosition.left, newPosition.top);

  queue.push({
    id: source.id,
    x: newPosition.left,
    y: newPosition.top,
    z: newPosition.zIndex,
    t: t
  });

  targetArea.push(sourceArea.pop());
}