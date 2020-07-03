var globalZ = 0;

function gps(address) {
  var margin = 10;
  var width = 107;
  var height = 144;
  var reveal = 27;
  var x = 0;
  var y = 0;
  var z = 0;
  
  y += margin;
  
  switch (address.region) {
    case 'cells':
      x += address.zone * (width + margin / 2);
      break;
    case 'stacks':
      x += ((width + margin) * 4);
      x += (margin - (margin / 2)) * 3;
      x += address.zone * (width + margin / 2);
      break;
    case 'columns':
      x += address.zone * (width + margin);
      y += height + margin;
      break;
  }
  
  // return height width, also for full zones
  
  
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
  };
}

export default gps;