var thegame = null;

function getHash() {
  var hash = null;

  if(location.hash) {
    var temp = location.hash.replace('#', '');
    temp = parseInt(temp);
    if(!isNaN(temp)) {
      hash = temp;
    }
  }
  
  if(hash) {
    //start a game
    thegame = new Game(hash);
  } else {
    location.hash = Math.floor(Math.random() *  32000);
  }
}

window.addEventListener('load', function() {
  getHash();
});

window.addEventListener('hashchange', function() {
  getHash();
});