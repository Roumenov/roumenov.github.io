class MousePop {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.origVec = createVector(this.x, this.y);

    this.debrisCount;
    this.currentVec = [];
    this.targetVec = [];
    this.animWindowDebris1 = [];
    this.animWindowDebris2 = [];
    this.tickerDebris = [];
    this.w = [];
    this.h = [];
    this.ang = [];

    this.lineCount;
    this.p1 = [];
    this.p1target = [];
    this.p2 = [];
    this.p2target = [];
    this.tickerLine = [];
    this.animWindowLine1 = [];
    this.animWindowLine2 = [];

    this.refresh(this.x, this.y);
  }

  runBottom(){
    this.update();
    this.displayLine();
  }

  runTop(){
    this.displayDebris();
  }

  update(){
    for(var m = 0; m < this.debrisCount; m++){
      if(this.tickerDebris[m] < 0){
        this.currentVec[m] = this.origVec;
      } else if(this.tickerDebris[m] < this.animWindowDebris1[m]){
        var tk0 = map(this.tickerDebris[m], 0, this.animWindowDebris1[m], 0, 1);

        this.currentVec[m] = p5.Vector.lerp(this.origVec, this.targetVec[m], easeOutQuart(tk0))
      } else if(this.tickerDebris[m] < this.animWindowDebris2[m]){
        var tk0 = map(this.tickerDebris[m], this.animWindowDebris1[m], this.animWindowDebris2[m], 0, 1);

        this.currentVec[m] = p5.Vector.lerp(this.targetVec[m], this.origVec, easeInQuart(tk0))
      }
      this.tickerDebris[m] ++;
    }

    for(var m = 0; m < this.lineCount; m++){
      if(this.tickerLine[m] < 0){
        this.p1[m] = this.origVec;
        this.p2[m] = this.origVec;
      } else if(this.tickerLine[m] < this.animWindowLine1[m]){
        var tk0 = map(this.tickerLine[m], 0, this.animWindowLine1[m], 0, 1);

        this.p1[m] = p5.Vector.lerp(this.origVec, this.p1target[m], easeOutQuart(tk0));
        this.p2[m] = p5.Vector.lerp(this.origVec, this.p2target[m], easeOutQuart(tk0));
      } else if(this.tickerLine[m] < this.animWindowLine2[m]){
        var tk0 = map(this.tickerLine[m], this.animWindowLine1[m], this.animWindowLine2[m], 0, 1);

        this.p1[m] = p5.Vector.lerp(this.p1target[m], this.origVec, easeInQuart(tk0))
        this.p2[m] = p5.Vector.lerp(this.p2target[m], this.origVec, easeInQuart(tk0))
      }
      this.tickerLine[m] ++;
    }
  }

  displayDebris(){
    fill(fillColor);
    stroke(strokeColor);
    strokeWeight(coreSW);

    if(coreTicker > 0){
      for(var m = 0; m < this.debrisCount; m++){
        push();
          translate(this.currentVec[m].x, this.currentVec[m].y);
          rotate(this.ang[m]);
          ellipse(0, 0, this.w[m], this.h[m]);
        pop();
      }
    }
  }

  displayLine(){
    fill(bkgdColor);
    stroke(strokeColor);
    strokeWeight(coreSW);

    for(var m = 0; m < this.lineCount; m++){
      line(this.p1[m].x, this.p1[m].y, this.p2[m].x, this.p2[m].y);
    }
  }

  refresh(x, y){
    this.origVec.set(x, y);

    this.debrisCount = int(random(12, 25));
    this.currentVec = [];
    this.targetVec = [];
    this.animWindowDebris1 = [];
    this.animWindowDebris2 = [];
    this.tickerDebris = [];
    this.w = [];
    this.h = [];
    this.ang = [];

    this.lineCount = int(random(40, 70));
    this.p1 = [];
    this.p1target = [];
    this.p2 = [];
    this.p2target = [];
    this.tickerLine = [];
    this.animWindowLine1 = [];
    this.animWindowLine2 = [];

    var culmAng = 0;
    for(var m = 0; m < this.debrisCount; m++){
      var rAng = random(PI/4, PI/2);
      culmAng += rAng
      var rDist = random(10, width/2);

      var x_ = this.origVec.x + cos(culmAng) * rDist;
      var y_ = this.origVec.y + sin(culmAng) * rDist;
      this.targetVec[m] = createVector(x_, y_);

      this.animWindowDebris1[m] = random(30, 60);
      this.animWindowDebris2[m] = 100;
      this.tickerDebris[m] = 0;

      this.w[m] = random(7, 15) * coreScale;
      this.h[m] = this.w[m] * random(1, 2);
      this.ang[m] = culmAng + PI/2;
    }

    this.lineCount = int(random(10, 30));
    this.p1 = [];
    this.p1target = [];
    this.p2 = [];
    this.p2target = [];

    for(var m = 0; m < this.lineCount; m++){
      var rRad1 = random(60, 200);
      var rRad2 = rRad1 + random(100, 500);
      var rAng = random(PI/4, PI/2);
      culmAng += rAng;

      var x1_ = this.origVec.x + cos(culmAng) * rRad1;
      var y1_ = this.origVec.y + sin(culmAng) * rRad1;
      this.p1target[m] = createVector(x1_, y1_);

      var x2_ = this.origVec.x + cos(culmAng) * rRad2;
      var y2_ = this.origVec.y + sin(culmAng) * rRad2;
      this.p2target[m] = createVector(x2_, y2_);

      this.animWindowLine1[m] = random(30, 60);
      this.animWindowLine2[m] = 100;
      this.tickerLine[m] = 0;
    }
  }
}