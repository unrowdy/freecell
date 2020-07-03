export var queue = [];
var delay = 0;
var timer = new Date();

export function process() {
  var now = new Date();
  if(now - timer < delay) {
    window.requestAnimationFrame(process);
    return;
  }
  
  if (queue.length > 0) {
    var move = queue.shift();
    
    document.getElementById(move.id).style.transitionDuration = move.t;
    document.getElementById(move.id).style.zIndex = move.z;
    document.getElementById(move.id).style.left = move.x;
    document.getElementById(move.id).style.top = move.y;
    
    delay = parseInt(move.t);
    timer = now;
  }
  
  if (queue.length > 0) {
    window.requestAnimationFrame(process);
  }
}

export function speed(ax, ay, bx, by) {
  var a = Math.abs(parseInt(ax) - parseInt(bx));
  var b = Math.abs(parseInt(ay) - parseInt(by));
  var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

  var d = c; // pixels
  var v = 6; // pixels per millisecond // closest = 20, farthest = 171
  var t = d / v;
  
  return Math.round(t) + 'ms';
}
