class Let {
  constructor(coreNumber, index){
    this.coreNumber = coreNumber;
    this.index = index;
    this.l = inputText[coreNumber].charAt(this.index);

    this.xAnim = 0;
    this.xShuffle = 0;
    this.yAnim = 0;
    this.yShuffle = 0;    
    this.yShuffleMin, this.yShuffleMax;
    this.shearAnim = 0;

    textSize(pgTextSize);
    textFont(tFont[fontSelect]);

    this.wBase = textWidth(this.l)
    this.w = this.wBase;
    this.wScale = 1;

    if(coreBaseCount == 1){
      this.yShuffleMin = -this.w;
      this.yShuffleMax = this.w;
    } else if(this.coreNumber == 0){
      this.yShuffleMin = -this.w;
      this.yShuffleMax = 0;
    } else if(this.coreNumber == coreBaseCount - 1){
      this.yShuffleMin = 0;
      this.yShuffleMax = this.w;
    } else {
      this.yShuffleMin = 0;
      this.yShuffleMax = 0;
    }

    this.mode;
    this.debrisMode;
    this.debrisMode2;
    this.ticker;
    this.maxFactor;
    this.selectAnim();
  }

  run(){
    this.update();
    this.display();
  }

  update(){
    this.h = pgTextSize * pgTextFactor[fontSelect];

    this.ticker++;

    if(this.mode == 0){
      // no anim
    } else if(this.mode == 1){
      this.animXshift();
    } else if(this.mode == 2){
      this.animXYshift();
    } else if(this.mode == 3){
      this.animShuffle();
    } else if(this.mode == 4){
      this.animShearShift();
    }

    if(this.ticker >= stageA + stageB + stageC){
      this.selectAnim();
    }

    if(this.index < inputText[this.coreNumber].length-1){
      culmLength[this.coreNumber] += this.w;
    }
  }

  display(){    
    textSize(pgTextSize);
    textFont(tFont[fontSelect]);

    push();
      this.debris();

      translate(this.xAnim, this.yAnim);
      translate(this.xShuffle, this.yShuffle);
      shearX(this.shearAnim);
      noStroke();
      fill(foreColor);
      text(this.l, 0, this.h/2);
    pop();

    // ellipse(this.x, this.y, 5, 5);
    // stroke(foreColor);
    // noFill();
    // rect(0, 0, this.w, -this.h);
    
    translate(this.w, 0);
  }

  selectAnim(){
    this.xAnim = 0;
    this.yAnim = 0;

    this.ticker = 0;
    this.maxFactor = random(1,2);

    this.mode = round(random(4));
    this.debrisMode = round(random(1));
    this.debrisMode2 = round(random(3));
  }

  animXshift(){
    var wMax = this.wBase * this.maxFactor;

    if(this.ticker < 0){
      this.w = this.wBase;
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      this.w = map(stageAaccel(tk0), 0, 1, this.wBase, wMax);
    } else if(this.ticker < stageA + stageB){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      this.w = map(stageBaccel(tk0), 0, 1, wMax, this.wBase);
    } else {
      this.w = this.wBase;
    }
  }

  animXYshift(){
    var wMax = this.wBase * this.maxFactor;
    var yMoveMax = 1.5 * this.h - this.h * this.maxFactor;

    if(this.ticker < 0){
      this.w = this.wBase;
      this.yAnim = 0;
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      this.w = map(stageAaccel(tk0), 0, 1, this.wBase, wMax);
      this.yAnim = map(stageAaccel(tk0), 0, 1, 0, yMoveMax);
    } else if(this.ticker < stageA + stageB){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      this.w = map(stageBaccel(tk0), 0, 1, wMax, this.wBase);
      this.yAnim = map(stageBaccel(tk0), 0, 1, yMoveMax, 0);
    } else {
      this.w = this.wBase;
      this.yAnim = 0;
    }

    this.xAnim = (this.w - this.wBase)/2;
  }

  animShuffle(){
    if(this.ticker < 0){
      this.xAnim = 0;
      this.yAnim = 0;
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      var tk0pre = map(this.ticker-1, 0, stageA, 0, 1);
      var tkNow = stageAaccel(tk0);
      var tkPre = stageAaccel(tk0pre);

      var prob = map(abs(tkNow - tkPre), 0, 0.25, 0, 10);

      if(random(10) < prob && frameCount%4 == 0){
        if(random(10) < 5){
          this.yShuffle = this.yShuffleMax * random(-0.5, 0.5);
        } else {
          this.yShuffle = this.yShuffleMin * random(-0.5, 0.5);
        }
        this.xShuffle = this.wBase * random(-0.5, 0.5);
      }
    } else if(this.ticker < stageA + stageB/2){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      var tk0pre = map(this.ticker-1, stageA, stageA + stageB, 0, 1);
      var tkNow = map(stageBaccel(tk0), 0, 1, 10, 0);
      var tkPre = map(stageBaccel(tk0pre), 0, 1, 10, 0);

      var prob = map(abs(tkNow - tkPre), 0, 0.25, 0, 10);
      
      if(random(10) < prob && frameCount%4 == 0){
        if(random(10) < 5){
          this.yShuffle = this.yShuffleMax * random(-0.5, 0.5);
        } else {
          this.yShuffle = this.yShuffleMin * random(-0.5, 0.5);
        }
        this.xShuffle = this.wBase * random(-0.5, 0.5);
      }
    } else {
      this.xShuffle = 0;
      this.yShuffle = 0;
    }
  }

  animShearShift(){
    var wMax = this.wBase * this.maxFactor;
    var shearMax = -PI/8;

    if(this.ticker < 0){
      this.w = this.wBase;
      this.xAnim = 0;
      this.shearAnim =  0;
    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      this.w = map(stageAaccel(tk0), 0, 1, this.wBase, wMax);
      this.xAnim = map(stageAaccel(tk0), 0, 1, 0, wMax/2);
      this.shearAnim = map(stageAaccel(tk0), 0, 1, 0, shearMax);
    } else if(this.ticker < stageA + stageB){
      var tk0 = map(this.ticker, stageA, stageA + stageB, 0, 1);
      this.w = map(stageBaccel(tk0), 0, 1, wMax, this.wBase);
      this.xAnim = map(stageBaccel(tk0), 0, 1, wMax/2, 0);
      this.shearAnim = map(stageBaccel(tk0), 0, 1, shearMax, 0);
    } else {
      this.w = this.wBase;
      this.xAnim = 0;
      this.shearAnim =  0;
    }
  }

  debris(){
    if(this.debrisMode == 1){
      if(this.mode == 0){
        // no anim
      } else if(this.mode == 1){
        if(this.w - this.wBase > 2){
          if(this.debrisMode2 == 0){
            noFill();
            stroke(accentColor);
            strokeWeight(2);

            push();
              translate(this.wBase, 0);
              line(0, this.h/2, this.w - this.wBase, -this.h/2);
              line(0, -this.h/2, this.w - this.wBase, this.h/2);
            pop();
          } else if(this.debrisMode2 == 1){
            noFill();
            stroke(accentColor);
            strokeWeight(2);

            push();
              translate(this.wBase, 0);
              ellipse((this.w - this.wBase)/2, 0, (this.w - this.wBase), this.h);
            pop();
          } else if(this.debrisMode2 == 2){
            noFill();
            stroke(accentColor);
            strokeWeight(2);

            push();
              translate(this.wBase, 0);
              rect((this.w - this.wBase)/2, 0, (this.w - this.wBase), this.h);
            pop();
          } else {
            noFill();
            stroke(accentColor);
            strokeWeight(2);
            
            push();
              translate(this.wBase, 0);
              arc((this.w - this.wBase)/2, this.h/2, (this.w - this.wBase), this.h*2, PI, 2*PI, PIE);
            pop();
          }
        }
      } else if(this.mode == 2){
        if(this.w - this.wBase > 2){
          noFill();
          stroke(accentColor);
          strokeWeight(2);

          if(this.maxFactor > 1.5){
            line(0, this.h/2, 2 * (this.w - this.wBase), this.h/2);
          } else {
            line(0, -this.h/2, 2 * (this.w - this.wBase), -this.h/2);            
          }
        }
      }
    }

  }
}