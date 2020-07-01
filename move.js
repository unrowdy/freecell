
import {thegame} from './Game.js';
import superMove from './superMove.js';
import gps from './gps.js';
import {speed, queue} from './queue.js';
import postMove from './postMove.js';

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

    superMove(this.source, this.target);
    
    var sourceArea = thegame.board[this.source.region][this.source.zone];
    var targetArea = thegame.board[this.target.region][this.target.zone];

    var sourceItem = sourceArea[sourceArea.length - 1];
    var targetItem = targetArea[targetArea.length - 1] || null;

    var rankDiff = sourceItem.rank - (targetItem ? targetItem.rank : -1);
    var altColor = sourceItem.color !== (targetItem ? targetItem.color : -1);
    var sameSuit = sourceItem.suit === (targetItem ? targetItem.suit : sourceItem.suit);


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

      var ay = document.getElementById(this.selected).style.top;
      var ax = document.getElementById(this.selected).style.left;
      var t = speed(ax, ay, newPosition.left, newPosition.top);

      queue.push({
        id: this.selected,
        x: newPosition.left,
        y: newPosition.top,
        z: newPosition.zIndex,
        t: t
      });
      
      targetArea.push(sourceArea.pop());
    }
    
    this.reset();
    
    // had to be after reset
    if(valid) {
      postMove();
    }
  }
}

export default move;