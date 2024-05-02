class Hr {
  constructor(x, y, w, h, flip, ticker){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.flip = flip;
    this.ticker = ticker;

    this.pointCount = 2;
    this.points = [];

    this.res = 0;
    this.resMax = 50;
    this.col0 = colorSet[int(random(colorSet.length))];
    this.col1 = colorSet[int(random(colorSet.length))];

    this.strokeCount = int(random(1,3));

    this.tweak0 = -1 + int(random(2)) * 2;
    this.tweak1 = -1 + int(random(2)) * 2;

    this.makePoints();
  }

  run(){
    this.update();
    this.display();
    // this.displayDebug();
  }

  update(){
    this.ticker ++;

    if(this.ticker < 0){
      this.res = 0;

    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      this.res = map(stageAaccel(tk0), 0, 1, 0, this.resMax);

    } else if(this.ticker < stageB){
      this.res = this.resMax;

    } else if(this.ticker < stageC){
      var tk0 = map(this.ticker, stageB, stageC, 0, 1);
      this.res = map(stageBaccel(tk0), 0, 1, this.resMax, 0);

    } else {
      this.res = 0;

    }

    this.res = constrain(this.res, 0, this.resMax);
  }

  display(){
    push();
      translate(this.x, this.y);

      // translate(this.wActual, 0);

      for(var q = 0; q < this.strokeCount; q++){
        if(q == 0){
          stroke(this.col0);
          strokeWeight(6);
        } else {
          stroke(this.col1);
          strokeWeight(4);
        }

        for(var m = 1; m < this.res; m++){
          var t = m/this.resMax;
          var x = bezierPoint(this.points[0].x, this.points[0].x - this.tweak0 * this.points[0].xH, this.points[1].x - this.tweak1 * this.points[1].xH, this.points[1].x, t);
          var y = bezierPoint(this.points[0].y, this.points[0].y - this.tweak0 * this.points[0].yH, this.points[1].y - this.tweak1 * this.points[1].yH, this.points[1].y, t);
  
          var preT = (m-1)/this.resMax;
          var preX = bezierPoint(this.points[0].x, this.points[0].x - this.tweak0 * this.points[0].xH, this.points[1].x - this.tweak1 * this.points[1].xH, this.points[1].x, preT);
          var preY = bezierPoint(this.points[0].y, this.points[0].y - this.tweak0 * this.points[0].yH, this.points[1].y - this.tweak1 * this.points[1].yH, this.points[1].y, preT);
  
          line(x, y, preX, preY);
        }
      }

    pop();
  }

  displayDebug(){
    push();
      translate(this.x, this.y);

      stroke(this.col0);
      strokeWeight(2);
      noFill();
      beginShape();
        vertex(this.points[0].x, this.points[0].y);
        bezierVertex(
          this.points[0].x - this.tweak0 * this.points[0].xH, this.points[0].y - this.tweak0 * this.points[0].yH,
          this.points[1].x - this.tweak1 * this.points[1].xH, this.points[1].y - this.tweak1 * this.points[1].yH,
          this.points[1].x, this.points[1].y
          );
      endShape();
    pop();
  }

  makePoints(){
    var y_;
    var ang0_;
    var ang1_;

    var direct0 = -1 + int(random(2)) * 2;
    var direct1 = -1 + int(random(2)) * 2;
    var randomAng = random(PI/8);

    if(this.flip == 0){
      y_ = -this.h/8;
      ang0_ = -randomAng;
      ang1_ = -PI + randomAng;
    } else {
      y_ = -this.h * 7/8;
      ang0_ = randomAng;
      ang1_ = PI - randomAng;
    }

    this.points[0] = {
      x: -this.w,
      y: y_,
      xH: cos(direct0 * ang0_) * this.w,
      yH: sin(direct0 * ang0_) * this.w,
    }
    this.points[1] = {
      x: this.w,
      y: y_,
      xH: cos(direct1 * ang1_) * this.w,
      yH: sin(direct1 * ang1_) * this.w,
    }


    // for(var m = 0; m < this.pointCount; m++){
    //   var x_ = culmX;

    //   var thisY = random(unit/4, unit * 5/4);
    //   var y_ = -unit + (1 - ((m%2) * 2)) * thisY;

    //   if(this.flip){
    //     var ang = -PI * 3/8;
    //     if(m%2 == 1){
    //       ang = PI * 3/8;;
    //     }
    //   } else {
    //     var ang = PI + PI * 3/8;
    //     if(m%2 == 1){
    //       ang = PI - PI * 3/8;;
    //     }
    //   }

    //   var xH_ = cos(ang) * thisY/2;
    //   var yH_ = sin(ang) * thisY/2;

    //   this.points[m] = {
    //     x: x_,
    //     y: y_,
    //     xH: xH_,
    //     yH: yH_
    //   }

    //   culmX += random(5, 15);
    // }
  }
}
