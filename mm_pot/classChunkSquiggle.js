class ChunkSquiggle {
  constructor(coreNumber, index){
    this.coreNumber = coreNumber;
    this.index = index;

    this.res = 120;

    this.pntCount = 5;
    this.pnt = [];
    this.pntH = [];
    this.fullWidth = 0;
    this.lenBumpMax = ((inputText[this.coreNumber].length - this.index) * pgTextSize)/this.pntCount;
    this.lenBumpMin = this.lenBumpMax/2;

    this.yBump = random(-pgTextSize, pgTextSize);

    this.resStage = this.res/this.pntCount;

    this.ticker = 0;

    this.resStart = 0;
    this.resEnd = 0;

    this.strokeW = 0;
    this.strokeWmax = pgTextSize/4;

    this.buildSquiggle();
  }

  buildSquiggle(){
    var culmDist = 0;
    for(var m = 0; m < this.pntCount; m++){
      this.pnt[m] = createVector(culmDist, random(-10, 10));

      var ang = PI/4 + random(-PI/8, PI/8);
      // var len = random(this.lenBumpMin, this.lenBumpMax); 
      var len = random(pgTextSize/2, pgTextSize * 2);
      var hX = cos(ang) * len;
      var hY = sin(ang) * len;
      this.pntH[m] = createVector(hX, hY);

      // culmDist += random(pgTextSize/2, pgTextSize * 3);
      culmDist += random(this.lenBumpMin, this.lenBumpMax); 
    }
    this.fullWidth = culmDist;
  }
  
  update(){
    this.ticker ++;

    if(this.ticker < 0){
      this.resStart = 0;
      this.resEnd = 0;
      this.strokeW = 0;
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      this.resStart = 0;
      this.resEnd = map(stageAaccel(tk0), 0, 1, 0, this.res);
      this.strokeW = map(stageAaccel(tk0), 0, 1, 0, this.strokeWmax);
    } else if(this.ticker < stageA + stageB){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      this.resStart = map(stageBaccel(tk0), 0, 1, 0, this.res);
      this.resEnd = this.res;
      this.strokeW = map(stageBaccel(tk0), 0, 1, this.strokeWmax, 0);
    } else {
      this.resStart = this.res;
      this.resEnd = this.res;
      this.strokeW = 0;
    }

    this.resStart = constrain(this.resStart, 0, this.res);
    this.resEnd = constrain(this.resEnd, 0, this.res);    
  }

  display(){
    push();
      translate(-this.fullWidth/4, this.yBump);
      for(var m = 0; m < 2; m++){
        noFill();

        if(m == 0){
          stroke(accentColor);
          strokeWeight(this.strokeW);
        } else {
          stroke(bkgdColor);
          strokeWeight(this.strokeW - 4);
        }
        beginShape();
          // vertex(this.pnt[this.resStart].x, this.pnt[this.resStart].y);
          for(var n = this.resStart; n < this.resEnd; n++){
            var x = 0;
            var y = 0;
            if(n < this.resStage){
              let t = n/this.resStage;
              x = bezierPoint(this.pnt[0].x, this.pnt[0].x + this.pntH[0].x, this.pnt[1].x - this.pntH[1].x, this.pnt[1].x, t);
              y = bezierPoint(this.pnt[0].y, this.pnt[0].y + this.pntH[0].y, this.pnt[1].y - this.pntH[1].y, this.pnt[1].y, t);
            } else if(n < 2 * this.resStage){
              let t = (n - this.resStage)/this.resStage;
              x = bezierPoint(this.pnt[1].x, this.pnt[1].x + this.pntH[1].x, this.pnt[2].x - this.pntH[2].x, this.pnt[2].x, t);
              y = bezierPoint(this.pnt[1].y, this.pnt[1].y + this.pntH[1].y, this.pnt[2].y - this.pntH[2].y, this.pnt[2].y, t);
            } else if(n < 3 * this.resStage){
              let t = (n - 2 * this.resStage)/this.resStage;
              x = bezierPoint(this.pnt[2].x, this.pnt[2].x + this.pntH[2].x, this.pnt[3].x - this.pntH[3].x, this.pnt[3].x, t);
              y = bezierPoint(this.pnt[2].y, this.pnt[2].y + this.pntH[2].y, this.pnt[3].y - this.pntH[3].y, this.pnt[3].y, t);
            } else if(n < 4 * this.resStage){
              let t = (n - 3 * this.resStage)/this.resStage;
              x = bezierPoint(this.pnt[3].x, this.pnt[3].x + this.pntH[3].x, this.pnt[4].x - this.pntH[4].x, this.pnt[4].x, t);
              y = bezierPoint(this.pnt[3].y, this.pnt[3].y + this.pntH[3].y, this.pnt[4].y - this.pntH[4].y, this.pnt[4].y, t);
            } else {
              x = this.pnt[4].x;
              y = this.pnt[4].y;
            }
    
            vertex(x,y);
          }
        endShape();
      }
    pop();
  }
}