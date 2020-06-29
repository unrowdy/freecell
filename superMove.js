function superMove() { // test with #25379 ok
  var targetType
  var targetArr
  var sourceArr

  var i = sourceArr.length - 1


  if (targetType === 'stacks')
    if (targetArr.length === 0)
      suit = sourceArr[i].suit
      rank = -1
    else
      suit = targetArr[targetArr.length -1].suit
      rank = targetArr[targetArr.length -1].rank
      
    if (sourceArr[i].rank === rank + 1 && sourceArr[i].suit === suit)
      move sourceArr[i]
      
  else if (targetType === 'cells')
    if (targetArr.length === 0)
      move sourceArr[i]
      
  else
    var freeCells = 2 + 1
    var move = sourceArr.length - i
    var lastCard = null

    while(sourceArr[i] && (last card is alternate || !lastCard)) {
      lastCard = sourceArr[i]
      
      if target and matches target
        move
        break
      if out of space
        if (targetArr.length === 0)
          move
        break;
      
      i--
    }

}