var globalZ = 0;

function gps(address) {
  var margin = 10;
  var width = 107;
  var height = 144;
  var reveal = 27;
  var x = 0;
  var y = 0;
  var z = 0;
  
  switch (address.region) {
    case 'cells':
      x += margin;
      y += margin;
      break;
    case 'stacks':
      x += margin + ((width + margin) * 4);
      y += margin;
      break;
    case 'columns':
      x += margin;
      y += margin + height + margin;
      break;
  }
  
  // return height width, also for full zones
  
  x += address.zone * (width + margin);
  
  if(address.number && address.region !==  'stacks') {
    y += address.number * reveal;
  }

  // maybe not always, applies to backgrounds too
  z = globalZ.toString();
  globalZ += 1;
  
  return {
    top: y + 'px',
    left: x + 'px',
    zIndex: z
  }
}