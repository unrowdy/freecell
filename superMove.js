
import {thegame} from './Game.js';

export default function superMove(source, target) { // test with #28269
  var targetType = target.region;
  var targetArr = thegame.board[target.region][target.zone];
  var sourceArr = thegame.board[source.region][source.zone];

  var i = sourceArr.length - 1
  var msg = 'invalid move'


  if (targetType === 'stacks') {
    if (targetArr.length === 0) {
      suit = sourceArr[i].suit
      rank = -1
    } else {
      suit = targetArr[targetArr.length -1].suit
      rank = targetArr[targetArr.length -1].rank
    }
    if (sourceArr[i].rank === rank + 1 && sourceArr[i].suit === suit) {
      //move sourceArr[i]
      msg = 'valid stack move';
    }

  } else if (targetType === 'cells') {
    if (targetArr.length === 0) {
      // move sourceArr[i]
      msg = 'valid cell move';
    }

  } else {
    var freeCells = getFree();
    var move = sourceArr.length - i;
    var lastCard = null;

    while(sourceArr[i]
      && (!lastCard
        || (sourceArr[i].rank === lastCard.rank + 1
          && sourceArr[i].color !== lastCard.color
        )
      )
      
    ) {
      lastCard = sourceArr[i];
      move = sourceArr.length - i;
      
      if (targetArr.length
        && targetArr[targetArr.length -1].rank === sourceArr[i].rank + 1
        && targetArr[targetArr.length -1].color !== sourceArr[i].color) {
        //move
        msg = 'valid column move ' + move;
        break;
      }
      if (move === freeCells) {
        break;
      }

      i--;
    }
    
    if (targetArr.length === 0) {
      //move
      msg = 'valid empty move ' + move;
    }

  }

  console.log(msg);

}

function getFree() {
  var emptyCells = 0;
  var emptyColumns = 0;

  for (var i = 0; i < thegame.board.cells.length; i++) {
    if (thegame.board.cells[i].length === 0) {
      emptyCells += 1;
    }
  }
  
  // you need to not count the one you are moving too though

  for (var i = 0; i < thegame.board.columns.length; i++) {
    if (thegame.board.columns[i].length === 0) {
      emptyColumns += 1;
    }
  }

  /*
    (1 + number of empty freecells) * 2 ^ (number of empty columns)
    Article Source: http://EzineArticles.com/104608

  */
  return (emptyCells + 1) * Math.pow(2, emptyColumns);
}