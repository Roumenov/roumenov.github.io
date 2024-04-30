class Confetti {
  constructor(x, y, w, h, wTarget, shearTarget, ticker){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.wTarget = wTarget;
    this.ticker = ticker;

    this.wActual = this.w/2;
    this.wStart = this.w/2;
    this.wTarget = (this.w * this.wTarget)/2;

    this.shearActual = 0
    this.shearStart = 0;
    this.shearTarget = shearTarget;

    this.pointCount = int(random(4,7));
    this.points = [];

    this.col0 = colorSet[int(random(colorSet.length))];
    this.col1 = colorSet[int(random(colorSet.length))];

    this.a0actual = 0;
    this.a0start = 0;
    this.a0target = 0;
    this.a1actual = 0;
    this.a1start = 0;
    this.a1target = 0;

    this.b0actual = 0;
    this.b0start = 0;
    this.b0target = 0;
    this.b1actual = 0;
    this.b1start = 0;
    this.b1target = 0;

    this.strokeCount = int(random(1,3));

    this.swActual = 0;
    this.swStart = 0;
    this.swTarget = 1;

    this.selectAnim();
  }

  run(){
    this.update();
    this.display();
    // this.displayDebug();
  }

  update(){
    this.ticker ++;

    if(this.ticker < 0){
      this.a0actual = this.a0start;
      this.a1actual = this.a1start;
      this.b0actual = this.b0start;
      this.b1actual = this.b1start;
      this.b1actual = this.b1start;
      this.swActual = this.swStart;
      this.wActual = this.wStart;
      this.shearActual = this.shearStart;

    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);

      this.a0actual = map(stageAaccel(tk0), 0, 1, this.a0start, this.a0target);
      this.a1actual = map(stageAaccel(tk0), 0, 1, this.a1start, this.a1target);
      this.b0actual = map(stageAaccel(tk0), 0, 1, this.b0start, this.b0target);
      this.b1actual = map(stageAaccel(tk0), 0, 1, this.b1start, this.b1target);
      this.swActual = map(stageAaccel(tk0), 0, 1, this.swStart, this.swTarget);
      this.wActual = map(stageAaccel(tk0), 0, 1, this.wStart, this.wTarget);
      this.shearActual = map(stageAaccel(tk0), 0, 1, this.shearStart, this.shearTarget);

    } else if(this.ticker < stageB){
      this.a0actual = this.a0target;
      this.a1actual = this.a1target;
      this.b0actual = this.b0target;
      this.b1actual = this.b1target;
      this.swActual = this.swTarget;
      this.wActual = this.wTarget;
      this.shearActual = this.shearTarget;

    } else if(this.ticker < stageC){
      var tk0 = map(this.ticker, stageB, stageC, 0, 1);

      this.a0actual = map(stageBaccel(tk0), 0, 1, this.a0target, this.a0start);
      this.a1actual = map(stageBaccel(tk0), 0, 1, this.a1target, this.a1start);
      this.b0actual = map(stageBaccel(tk0), 0, 1, this.b0target, this.b0start);
      this.b1actual = map(stageBaccel(tk0), 0, 1, this.b1target, this.b1start);
      this.swActual = map(stageBaccel(tk0), 0, 1, this.swTarget, this.swStart);
      this.wActual = map(stageBaccel(tk0), 0, 1, this.wTarget, this.wStart);
      this.shearActual = map(stageBaccel(tk0), 0, 1, this.shearTarget, this.shearStart);

    } else {
      this.a0actual = this.a0start;
      this.a1actual = this.a1start;
      this.b0actual = this.b0start;
      this.b1actual = this.b1start;
      this.swActual = this.swStart;
      this.wActual = this.wStart
      this.shearActual = this.shearStart;

    }

    this.swActual = constrain(this.swActual, 0, this.swTarget);


  }

  display(){
    push();
      translate(this.x, this.y);
      shearX(this.shearActual);

      translate(this.wActual, -this.h/2);

      for(var m = 0; m < this.strokeCount; m++){
        if(m == 0){
          stroke(this.col0);
          strokeWeight(6 * this.swActual);
        } else {
          stroke(this.col1);
          strokeWeight(4 * this.swActual);
        }

        noFill();
        arc(0, 0, 2 * this.wActual * 1.1, this.h * 1.2, this.a0actual, this.a1actual);
        arc(0, 0, 2 * this.wActual * 0.9, this.h * 1.0, this.b0actual, this.b1actual);        
      }

    pop();
  }

  displayDebug(){

  }

  selectAnim(){
    var startAng = random(PI);
    var direct = 1;
    if(random(10) < 5){
      direct *= 1;
    }
    this.a0start = startAng + direct * random(-PI/2, -PI/4);
    this.a0target = startAng + direct * random(PI, PI * 3/2);
    this.a1start = this.a0start;
    this.a1target = this.a0target + direct * random(PI/16, PI/4);

    var nudge = random(-PI/8, PI/8);
    this.b0start = nudge + this.a0start;
    this.b0target = nudge + this.a0target;
    this.b1start = nudge + this.a1start;
    this.b1target = nudge + this.a1target;
  }
}
