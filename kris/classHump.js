class Hump {
  constructor(x, y, outside, ticker){
    this.x = x;
    this.y = y;
    this.outside = outside;
    this.ticker = ticker;

    this.pointCount = int(random(4,7));
    this.points = [];

    this.res = 0;
    this.resMax = 80;
    this.resStep = this.resMax/this.pointCount;
    this.col0 = colorSet[int(random(colorSet.length))];
    this.col1 = colorSet[int(random(colorSet.length))];

    this.strokeCount = int(random(1,3));

    this.pointDown = true;
    if(random(10) < 5){
      this.pointDown = false;
    }

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
    var cH = pgTextSize * tFontFactor[selFont];
    var unit = pgTextSize/2;
    var culmX = 0;
    var culmAng = PI;
    var scribbleYaxis = -cH/16;
    var direct = 1;
    
    if(this.outside == 0){
      if(this.pointDown){
        scribbleYaxis = -cH * 15/16;
        direct *= -1; 
      }
    } else if(this.outside == 1){
      scribbleYaxis = -cH * 17/16;
    } else if(this.outside == 2){
      scribbleYaxis = cH/16;
      direct *= -1; 
    }


    for(var m = 0; m < this.pointCount; m++){
      var x_ = culmX;
      culmX += random(10, unit);

      var y_ = scribbleYaxis;

      culmAng += direct * random(PI/32, PI/4);
      var ranInflu = random(unit * 1/2, unit * 3/2)
      var xH_ = cos(culmAng) * ranInflu;
      var yH_ = sin(culmAng) * ranInflu;

      if(m == this.pointCount - 2){
        x_ += random(20, 40);
        var xH_ = cos(0) * ranInflu;
        var yH_ = sin(0) * ranInflu;
      } else if(m == this.pointCount - 1){
        x_ += random(20, 40);
        var xH_ = 0;
        var yH_ = 0;
      }

      this.points[m] = {
        x: x_,
        y: y_,
        xH: xH_,
        yH: yH_
      }
    }
  }
}