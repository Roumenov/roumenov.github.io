class Scribble {
  constructor(x, y, ticker){
    this.x = x;
    this.y = y;
    this.ticker = ticker;

    this.pointCount = int(random(4,7));
    this.points = [];

    this.res = 0;
    this.resMax = 60;
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
      this.res = map(stageAaccel(tk0), 0, 1, 0, this.resMax);
    } else if(this.ticker < stageB){
      this.res = this.resMax;
    } else if(this.ticker < stageC){
      var tk0 = map(this.ticker, stageB, stageC, 0, 1);
      this.res = map(stageBaccel(tk0), 0, 1, this.resMax, 0);
    } else {
      this.res = 0;
    }
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
          var x = bezierPoint(this.points[p-1].x, this.points[p - 1].x - this.points[p - 1].xH, this.points[p].x + this.points[p].xH, this.points[p].x, t);
          var y = bezierPoint(this.points[p-1].y, this.points[p - 1].y - this.points[p - 1].yH, this.points[p].y + this.points[p].yH, this.points[p].y, t);
  
          var preP = floor((m-1)/this.resStep) + 1;
          var preT = ((m-1) - ((preP-1) * this.resStep))/this.resStep;
          var preX = bezierPoint(this.points[preP-1].x, this.points[preP - 1].x - this.points[preP - 1].xH, this.points[preP].x + this.points[preP].xH, this.points[preP].x, preT);
          var preY = bezierPoint(this.points[preP-1].y, this.points[preP - 1].y - this.points[preP - 1].yH, this.points[preP].y + this.points[preP].yH, this.points[preP].y, preT);
  
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
    var unit = cH/2;
    var scribbleYaxis = -unit;
    var angCulm = random(PI);

    for(var m = 0; m < this.pointCount; m++){
      var ranDia = random(unit/2, unit);
      var x_ = cos(angCulm) * ranDia;
      var y_ = scribbleYaxis + sin(angCulm) * ranDia;

      var ranInflu = random(unit/4, unit/2)
      var xH_ = cos(angCulm + PI/2) * ranInflu;
      var yH_ = sin(angCulm + PI/2) * ranInflu;

      this.points[m] = {
        x: x_,
        y: y_,
        xH: xH_,
        yH: yH_
      }

      angCulm += random(PI * 7/8, PI * 9/8);
    }
  }
}

// makePoints(){
//   var cH = pgTextSize * tFontFactor[selFont];
//   var unit = pgTextSize/2;
//   var culmX = 0;
//   var scribbleYaxis = -random(cH/3, cH * 2/3);

//   for(var m = 0; m < this.pointCount; m++){
//     var x_ = culmX;
//     culmX += random(-unit/2, unit/2);

//     var y_ = scribbleYaxis + (-1 + ((m%2) * 2)) * random(cH/8, cH/4);

//     var ranAng = random(-PI/8, PI/8);
//     var ranInflu = random(unit * 1/2, unit * 3/2)
//     var xH_ = cos(ranAng + ((m + 1)%2) * PI) * ranInflu;
//     var yH_ = sin(ranAng + ((m + 1)%2) * PI) * ranInflu;

//     this.points[m] = {
//       x: x_,
//       y: y_,
//       xH: xH_,
//       yH: yH_
//     }
//   }
// }