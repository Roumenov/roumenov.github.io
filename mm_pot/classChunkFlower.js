class ChunkFlower {
  constructor(coreNumber, index){
    this.coreNumber = coreNumber;
    this.index = index;

    this.res = 70;

    this.pntCount = 5;
    this.pnt = [];
    this.pntTarget = [];
    this.pntH = [];
    this.pntHtarget = [];

    this.ticker = 0;

    this.center = createVector(0,0);

    this.buildFlower();
  }

  buildFlower(){
    var ang = TWO_PI/this.pntCount;

    for(var m = 0; m < this.pntCount; m++){
      this.pnt[m] = createVector(0,0);
      this.pntH[m] = createVector(0,0);

      var rAng = random(-PI/8, PI/8);
      var rRad = random(pgTextSize/2);
      var rHan = rRad + random(pgTextSize/2, pgTextSize);
      var x = cos(m * ang + rAng) * rRad;
      var y = sin(m * ang + rAng) * rRad;
      var xH = cos(m * ang + rAng) * (rRad + rHan);
      var yH = sin(m * ang + rAng) * (rRad + rHan);

      this.pntTarget[m] = createVector(x, y);
      this.pntHtarget[m] = createVector(xH, yH);
    }
  }
  
  update(){
    this.ticker ++;

    for(var m = 0; m < this.pntCount; m++){
      if(this.ticker < 0){
        this.pnt[m] = this.center;
        this.pntH[m] = this.center;
      } else if(this.ticker < stageA){
        var tk0 = map(this.ticker, 0, stageA, 0, 1);
        var tk1 = stageAaccel(tk0);
        this.pnt[m] = p5.Vector.lerp(this.center, this.pntTarget[m], tk1);
        this.pntH[m] = p5.Vector.lerp(this.center, this.pntHtarget[m], tk1);
      } else if(this.ticker < stageA + stageB){
        var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
        var tk1 = stageBaccel(tk0);
        this.pnt[m] = p5.Vector.lerp(this.pntTarget[m], this.center, tk1);
        this.pntH[m] = p5.Vector.lerp(this.pntHtarget[m], this.center, tk1);
      } else {
        this.pnt[m] = this.center;
        this.pntH[m] = this.center;
      }
    }
  }

  display(){
    push();
      fill(bkgdColor);

      stroke(accentColor);
      strokeWeight(2);

      if(this.pntH[0].x > 2){
        beginShape();
          vertex(this.pnt[0].x, this.pnt[0].y);
          for(var m = 1; m < this.pntCount; m++){
            bezierVertex(
              this.pntH[m-1].x, this.pntH[m-1].y,
              this.pntH[m].x, this.pntH[m].y,
              this.pnt[m].x, this.pnt[m].y
            )
          }

          bezierVertex(
            this.pntH[this.pntCount - 1].x, this.pntH[this.pntCount - 1].y,
            this.pntH[0].x, this.pntH[0].y,
            this.pnt[0].x, this.pnt[0].y
          )
        endShape();
      }

    pop();
  }
}