class Hr {
  constructor(x, y, w, ticker){
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
    this.resStep = this.resMax/this.pointCount;
    this.col0 = colorSet[int(random(colorSet.length))];
    this.col1 = colorSet[int(random(colorSet.length))];

    this.strokeCount = int(random(1,3));

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
      this.res = map(stageAaccel(tk0), 0, 1, 0, this.resMax - this.resStep/2);

    } else if(this.ticker < stageB){
      this.res = this.resMax - this.resStep/2;

    } else if(this.ticker < stageC){
      var tk0 = map(this.ticker, stageB, stageC, 0, 1);
      this.res = map(stageBaccel(tk0), 0, 1, this.resMax - this.resStep/2, 0);

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

        for(var m = 1; m < this.res - this.resStep; m++){
          var p = floor(m/this.resStep) + 1;
          var t = (m - ((p-1) * this.resStep))/this.resStep;
          var x = bezierPoint(this.points[p-1].x, this.points[p - 1].x + this.points[p - 1].xH, this.points[p].x + this.points[p].xH, this.points[p].x, t);
          var y = bezierPoint(this.points[p-1].y, this.points[p - 1].y + this.points[p - 1].yH, this.points[p].y + this.points[p].yH, this.points[p].y, t);
  
          var preP = floor((m-1)/this.resStep) + 1;
          var preT = ((m-1) - ((preP-1) * this.resStep))/this.resStep;
          var preX = bezierPoint(this.points[preP-1].x, this.points[preP - 1].x + this.points[preP - 1].xH, this.points[preP].x + this.points[preP].xH, this.points[preP].x, preT);
          var preY = bezierPoint(this.points[preP-1].y, this.points[preP - 1].y + this.points[preP - 1].yH, this.points[preP].y + this.points[preP].yH, this.points[preP].y, preT);
  
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
        for(var m = 1; m < this.pointCount; m++){
          bezierVertex(
            this.points[m - 1].x - this.points[m - 1].xH, this.points[m - 1].y - this.points[m - 1].yH,
            this.points[m].x + this.points[m].xH, this.points[m].y + this.points[m].yH,
            this.points[m].x, this.points[m].y
            );
        }
      endShape();
    pop();
  }

  makePoints(){
    this.points[0] = {

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
