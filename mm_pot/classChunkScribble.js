class ChunkScribble {
  constructor(){
    this.res = 70;

    this.ticker = 0;

    this.rX = random(-pgTextSize, pgTextSize);
    this.rY = random(-pgTextSize, pgTextSize);
    this.rR = random(-PI/8, PI/8);

    this.resStart = 0;
    this.resEnd = 0;

    this.pnt = [];

    this.buildScribble();
  }

  buildScribble(){
    var w = random(pgTextSize/2, pgTextSize * 2);
    var h = pgTextSize;
    var ang = random(0.1, 0.2);
    var rStart = random(-PI, PI);

    for(var n = 0; n < this.res + 2; n++){
      var noiseR = map(noise(n * ang/4), 0, 1, -pgTextSize/2, pgTextSize/2);

      var x = cos(n * ang + rStart) * (w + noiseR);
      var y = sin(n * ang + rStart) * (h + noiseR);
      
      this.pnt[n] = createVector(x, y);
    }
  }
  
  update(){
    this.ticker ++;

    if(this.ticker < 0){
      this.resStart = 0;
      this.resEnd = 0;
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      this.resStart = 0;
      this.resEnd = map(stageAaccel(tk0), 0, 1, 0, this.res);
    } else if(this.ticker < stageA + stageB){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      this.resStart = int(map(stageBaccel(tk0), 0, 1, 0, this.res));
      // this.resStart = 0;
      this.resEnd = this.res;
    } else {
      this.resStart = this.res;
      this.resEnd = this.res;
    }
    this.resStart = constrain(this.resStart, 0, this.res);
    this.resEnd = constrain(this.resEnd, 0, this.res);
  }

  display(){
    // noFill();
    // stroke(accentColor);
    // strokeWeight(1);
    //   push();
    //     translate(this.rX, this.rY);
    //     rotate(this.rR);

    //     beginShape();
    //       for(var n = this.resStart; n < this.resEnd; n++){
    //         vertex(this.pnt[n].x, this.pnt[n].y);
    //       }
    //     endShape();
    // pop();
  }
}