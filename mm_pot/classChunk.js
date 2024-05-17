class Chunk {
  constructor(coreNumber, index){
    this.coreNumber = coreNumber;
    this.index = index;

    this.on;

    this.selectedChunk;

    this.selectAnim();
  }

  selectAnim(){
    var rs  = int(random(3));

    if(rs == 0){
      this.selectedChunk = new ChunkSquiggle(this.coreNumber, this.index);
    } else if(rs == 1){
      this.selectedChunk = new ChunkScribble();
    } else if(rs == 2){
      this.selectedChunk = new ChunkFlower();
    }

    if(random(10) < 2){
      this.on = true;
    } else {
      this.on = false;
    }

    if(rs == 0 && this.index > inputText[this.coreNumber].length/2){
      this.on = false;
    }
  }

  run(){
    this.selectedChunk.update();
    if(this.on){
      this.selectedChunk.display();
    }

    if(this.selectedChunk.ticker == stageA + stageB + stageC){
      this.selectAnim();
    }
  }
}