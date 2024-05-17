class Sprinkle {
  constructor(){
    this.on = true;

    this.x = 0;
    this.y = 0;

    this.ticker = 0;

    this.visible = false;

    this.mode;
    this.on;
    this.var1, this.var2, this.var3, this.var4;

    this.res = 10;
    this.ang = 1.5;

    this.selectAnim();
  }

  run(){
    this.update();
    if(this.on){
      this.display();
    }
  }

  selectAnim(){
    this.mode  = int(random(5));
    if(random(10) < 5){
      this.on = true;
    } else {
      this.on = false;
    }

    this.var1 = random(1);
    this.var2 = random(1);
    this.var3 = random(1);
    this.var4 = random(1);
  }

  update(){
    if(this.ticker >= stageA + stageB + stageC){
      this.ticker = 0;
    }
    this.ticker++;

    if(this.ticker > 0){
      this.visible = true;
    }

    if(this.ticker >= stageA + stageB + stageC){
      this.selectAnim();
    }
  }

  display(){
    if(this.visible){
      if(this.mode == 0){
        this.spinCross();
      } else if(this.mode == 1){
        this.rectGrow();
      } else if(this.mode == 2){
        this.bubbleGrow();
      } else if(this.mode == 3){
        this.starGrow();
      } else if(this.mode == 4){
        this.circGrow();
      }
    }
  }

  spinCross(){
    var yAnim = 0;
    var yMax = map(this.var1, 0, 1, -pgTextSize * 2, pgTextSize * 2);
    var rAnim = 0;
    var rAnim2 = 0;
    var sAnim = 0;
    var sMax = map(this.var2, 0, 1, 0.25, 1.5);

    if(this.ticker < 0){
      yAnim = 0;
      rAnim = 0;
      rAnim2 = 0;
      sAnim = 0;
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      yAnim = map(stageAaccel(tk0), 0, 1, 0, yMax);
      rAnim = map(stageAaccel(tk0), 0, 1, 0, PI/2);
      rAnim2 = map(stageAaccel(tk0), 0, 1, 0, PI/2);
      sAnim = map(stageAaccel(tk0), 0, 1, 0, sMax);
    } else if(this.ticker < stageA + stageB){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      yAnim = map(stageBaccel(tk0), 0, 1, yMax, 0);
      rAnim = map(stageBaccel(tk0), 0, 1, PI/2, PI);
      rAnim2 = map(stageBaccel(tk0), 0, 1, PI/2, PI);
      sAnim = map(stageBaccel(tk0), 0, 1, sMax, 0);
    } else {
      yAnim = 0;
      rAnim = 0;
      rAnim2 = 0;
      sAnim = 0;
    }

    if(yAnim > 5 || yAnim < -5){
      push();
        translate(this.x, this.y);

        translate(0, yAnim);
        rotate(rAnim)

        noFill();
        stroke(accentColor);
        strokeWeight(2);

        var crossD = sAnim * 12;

        line(-crossD, -crossD, crossD, crossD);
        rotate(rAnim2);
        line(-crossD, -crossD, crossD, crossD);
      pop();
    }
  }

  rectGrow(){
    var wAnim = 0;
    var wAnimMax = map(this.var1, 0, 1, 0, pgTextSize * 2);
    // var sizeFactor = map(this.var2, 0, 1, 1.25, 3);
    // var rFactor = map(this.var3, 0, 1, -PI/8, PI/8);
    var yFactor = map(this.var4, 0, 0.5, -1.5 * pgTextSize, -2 * pgTextSize);
    if(this.var4 < 0.5){
      yFactor = map(this.var4, 0.5, 1, 1.5 * pgTextSize, 2 * pgTextSize);
    }

    if(this.ticker < 0){
      wAnim = 0;
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      wAnim = map(stageAaccel(tk0), 0, 1, 0, wAnimMax);
    } else if(this.ticker < stageA + stageB){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      wAnim = map(stageBaccel(tk0), 0, 1, wAnimMax, 0);
    } else {
      wAnim = 0;
    }

    if(wAnim > 2){
      push();
        translate(this.x, this.y);
        translate(0, yFactor);
        fill(bkgdColor);
        stroke(accentColor);
        strokeWeight(2);
        
        rect(0, 0, wAnim, pgTextSize * 0.7);
      pop();
    }
  }

  circGrow(){
    var wAnim = 0;
    var wAnimMax = map(this.var1, 0, 1, 0, pgTextSize * 2);
    // var sizeFactor = map(this.var2, 0, 1, 1.25, 3);
    // var rFactor = map(this.var3, 0, 1, -PI/8, PI/8);
    var yFactor = map(this.var4, 0, 0.5, -1.5 * pgTextSize, -2 * pgTextSize);
    if(this.var4 < 0.5){
      yFactor = map(this.var4, 0.5, 1, 1.5 * pgTextSize, 2 * pgTextSize);
    }

    if(this.ticker < 0){
      wAnim = 0;
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      wAnim = map(stageAaccel(tk0), 0, 1, 0, wAnimMax);
    } else if(this.ticker < stageA + stageB){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      wAnim = map(stageBaccel(tk0), 0, 1, wAnimMax, 0);
    } else {
      wAnim = 0;
    }

    if(wAnim > 2){
      push();
        translate(this.x, this.y);
        translate(0, yFactor);
        fill(bkgdColor);
        stroke(accentColor);
        strokeWeight(2);
        
        ellipse(0, 0, wAnim, pgTextSize * 0.7);
      pop();
    }
  }

  bubbleGrow(){
    var dAnim = 0;
    var dAnimMax = map(this.var1, 0, 1, 0, pgTextSize * 2);
    var yAnim = 0;
    var yAnimMax = map(this.var2, 0, 1, -2 * pgTextSize, 2 * pgTextSize);
    var swAnim = 2;

    if(this.ticker < 0){
      dAnim = 0;
      yAnim = 0; 
      swAnim = 0.1;     
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      dAnim = map(stageAaccel(tk0), 0, 1, 0, dAnimMax);
      yAnim = map(stageAaccel(tk0), 0, 1, 0, yAnimMax);
      swAnim = map(stageAaccel(tk0), 0, 1, 0.1, 1);
    } else if(this.ticker < stageA + stageB){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      dAnim = map(stageBaccel(tk0), 0, 1, dAnimMax, dAnimMax * 2);
      yAnim = yAnimMax;
      swAnim = map(stageBaccel(tk0), 0, 1, 1, 0.1);
    } else {
      dAnim = 0;
      yAnim = 0; 
      swAnim = 0.1;
    }

    if(yAnim > 5 || yAnim < -5){
      push();
        translate(this.x, this.y);
        translate(0, yAnim);
        noFill();
        stroke(accentColor);
        strokeWeight(swAnim);
        
        ellipse(0, 0, dAnim, dAnim);
      pop();
    }
  }

  starGrow(){
    var pointCount = round(map(this.var1, 0, 1, 4, 7));
    var ang = TWO_PI/pointCount;

    var radAnim = 0;
    var radAnimMax = map(this.var2, 0, 1, 0, pgTextSize * 1.5);
    var yAnim = 0;
    var yAnimMax = map(this.var3, 0, 1, -pgTextSize * 1, pgTextSize * 1);

    if(this.ticker < 0){
      radAnim = 0;
      yAnim = 0;
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      radAnim = map(stageAaccel(tk0), 0, 1, 0, radAnimMax);
      yAnim = map(stageAaccel(tk0), 0, 1, 0, yAnimMax);
    } else if(this.ticker < stageA + stageB){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      radAnim = map(stageBaccel(tk0), 0, 1, radAnimMax, 0);
      yAnim = map(stageBaccel(tk0), 0, 1, yAnimMax, 0);
    } else {
      radAnim = 0;
      yAnim = 0;
    }

    push();
      translate(this.x, this.y);
      translate(0, yAnim);
      fill(accentColor);
      noStroke();
      // stroke(colorSet[1]);
      // strokeWeight(2);

      if(yAnim > 5 || yAnim < -5){
        beginShape();
          vertex(cos(0) * radAnim, sin(0) * radAnim);
          for(var m = 1; m <= pointCount; m++){
            var xPreH = cos((m-1) * ang) * 0;
            var yPreH = sin((m-1) * ang) * 0;
            var xH = cos((m) * ang) * 0;
            var yH = sin((m) * ang) * 0;
            var x = cos((m) * ang) * radAnim;
            var y = sin((m) * ang) * radAnim;
            bezierVertex(xPreH, yPreH, xH, yH, x, y);
          }
        endShape();
      }
    pop();
  }
}