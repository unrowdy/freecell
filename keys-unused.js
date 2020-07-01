document.addEventListener('keypress', function(e) {
  var map = {
    'a': {region: 'cells', zone: 0},
    's': {region: 'cells', zone: 1},
    'd': {region: 'cells', zone: 2},
    'f': {region: 'cells', zone: 3},
    'h': {region: 'stacks', zone: 0},
    'j': {region: 'stacks', zone: 1},
    'k': {region: 'stacks', zone: 2},
    'l': {region: 'stacks', zone: 3},
    '1': {region: 'columns', zone: 0},
    '2': {region: 'columns', zone: 1},
    '3': {region: 'columns', zone: 2},
    '4': {region: 'columns', zone: 3},
    '5': {region: 'columns', zone: 4},
    '6': {region: 'columns', zone: 5},
    '7': {region: 'columns', zone: 6},
    '8': {region: 'columns', zone: 7}
  };
  
  if(map[e.key]) {
    move.select(map[e.key]);
  }
});

document.addEventListener('keydown', function(e) {
  if(e.key === 'Escape') {
    move.reset();
  }
});
