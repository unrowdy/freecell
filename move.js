var move = {
  source: null,
  target: null,
  selected: null,
  select: function(address) {
    var area = thegame.board[address.region][address.zone];
    if(!this.source) {
      if(address.region === 'stacks') return;
      if(area.length === 0) return;
      this.source = address;
      
      this.selected = area[area.length - 1].id;
      document.getElementById(this.selected).classList.add('selected');
    } else {
      if(address.region === this.source.region && address.zone === this.source.zone) {
        this.reset();
      } else if(address.region === 'cells' && area.length > 0) {
        this.reset();
      } else {
        this.target = address;
        this.complete();
      }
    }
  },
  reset: function() {
    document.getElementById(this.selected).classList.remove('selected');
    this.source = null;
    this.target = null;
    this.selected = null;
  },
  complete: function() {
    document.getElementById(this.selected).classList.remove('selected');
    
    var sourceArea = thegame.board[this.source.region][this.source.zone];
    var targetArea = thegame.board[this.target.region][this.target.zone];

    // check rank difference
    // really need a better way to get rank/suit/color at this point
    var sourceItem = sourceArea[sourceArea.length - 1];
    var targetItem = targetArea[targetArea.length - 1] || null;

    var rankDiff = sourceItem.rank - (targetItem ? targetItem.rank : -1);
    var altColor = sourceItem.color !== (targetItem ? targetItem.color : -1);
    var sameSuit = sourceItem.suit === (targetItem ? targetItem.suit : sourceItem.suit);

    //console.log('rankDiff:', rankDiff, 'altColor:', altColor, 'sameSuit:', sameSuit);


    var valid = false;
    
    if((rankDiff === -1 || !targetItem) && altColor && this.target.region === 'columns') {
      valid = true;
    } else if(rankDiff === 1 && sameSuit && this.target.region === 'stacks') {
      valid = true;
    } else if (this.target.region === 'cells') {
      valid = true;
    } else {
      // not allowed
    }


    if(valid) {
      var newPosition = gps({
        region: this.target.region,
        zone: this.target.zone,
        number: targetArea.length
      });
      document.getElementById(this.selected).style.top = newPosition.top;
      document.getElementById(this.selected).style.left = newPosition.left;
      document.getElementById(this.selected).style.zIndex = newPosition.zIndex;
      
      targetArea.push(sourceArea.pop());
    }
    
    //console.log(this.source, this.target);
    this.reset();
  }
}