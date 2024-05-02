class Let {
  constructor(x, y, coreNumber, index){
    textSize(pgTextSize);
    textFont(tFont[selFont]);

    this.x = x;
    this.y = y;
    this.coreNumber = coreNumber;
    this.index = index;

    this.l = inputText[coreNumber].charAt(this.index);

    this.w = textWidth(this.l);
    this.h = pgTextSize * tFontFactor[selFont];

    this.configureVecFac();

    this.botVec = createVector(this.x + this.w * this.vecFac, this.y);
    this.topVec = createVector(this.x + this.w * this.vecFac, this.y - this.h);

    ////// ANIMATORS
    this.wActual = 1;
    this.wStart = 1;
    this.wTarget = 1;

    this.shearActual = 0;
    this.shearStart = 0;
    this.shearTarget = 0;

    this.colActual = foreColor;
    this.colStart = foreColor;
    this.colTarget = foreColor;

    this.boxActual = 0;
    this.boxStart = 0.0001;
    this.boxTarget = 1;

    this.boxOn = false;

    // this.boxColActual = alphaColor;
    // this.boxColStart = alphaColor;
    // this.boxColTarget = bkgdColor;
    this.boxFill = int(random(colorSet.length)) + 4;

    this.bkgdColActual = alphaColor;
    this.bkgdColStart = alphaColor;
    this.bkgdColTarget = bkgdColor;

    var delayCenterX, delayCenterY;
    if(offsetCenter == 0){
      delayCenterX = -fullW/2; delayCenterY = -fullH/2; 
    } else if(offsetCenter == 1){
      delayCenterX = 0; delayCenterY = -fullH/2; 
    } else if(offsetCenter == 2){
      delayCenterX = fullW/2; delayCenterY = -fullH/2; 
    } else if(offsetCenter == 3){
      delayCenterX = -fullW/2; delayCenterY = 0; 
    } else if(offsetCenter == 4){
      delayCenterX = 0; delayCenterY = 0; 
    } else if(offsetCenter == 5){
      delayCenterX = fullW/2; delayCenterY = 0; 
    } else if(offsetCenter == 6){
      delayCenterX = -fullW/2; delayCenterY = fullH/2; 
    } else if(offsetCenter == 7){
      delayCenterX = 0; delayCenterY = fullH/2; 
    } else if(offsetCenter == 8){
      delayCenterX = fullW/2; delayCenterY = fullH/2; 
    }

    var delayDist = dist(this.x, this.y, delayCenterX, delayCenterY);
    var delay = map(delayDist, 0, width/2, 0, offsetAmount);
    this.ticker = delay;
    // this.ticker = this.index * -5 + this.coreNumber * -5;

    this.postWpush = 0;
    this.postShearPush = 0;
    this.preShearPush = 0;

    this.preCulm = 0;

    this.scribble;
    this.scribbleOn;
    this.hump;
    this.humpOn;
    this.confetti;
    this.confettiOn;
    this.zig;
    this.zigOn;

    this.hrAdd;
    this.hrAddOn;

    this.scribAdd;
    this.scribAddOn;

    this.selectAnim();
  }

  run(){
    this.update();

    translate(this.preShearPush, 0);

    if(this.boxOn){
      this.displayBox();
    }
    if(marksOn){
      if(this.scribbleOn){
        this.scribble.run();
      }
    }

    this.displayType();

    if(marksOn){
      if(this.humpOn){
        this.hump.run();
      }
      if(this.scribAddOn){
        this.scribAdd.run();
      }
      if(this.confettiOn){
        this.confetti.run();
      }
      if(this.zigOn){
        this.zig.run();
      }
      if(this.hrAddOn){
        this.hrAdd.run();
      }
    }
    // this.displayDebug();

    translate(this.postWpush, 0);
    translate(this.postShearPush, 0);
  }

  update(){
    if(this.ticker > stageD){
      this.ticker = 0;
      this.selectAnim();
    } else {
      this.ticker++;
    }

    if(this.ticker < 0){
      this.wActual = this.wStart;
      this.shearActual = this.shearStart;
      this.colActual = this.colStart;

      this.boxActual = this.boxStart;
      // this.boxColActual = this.boxColStart;
      this.bkgdColActual = this.bkgdColStart;

    } else if(this.ticker < stageA){
      var tk0 = map(this.ticker, 0, stageA, 0, 1);
      this.wActual = map(stageAaccel(tk0), 0, 1, this.wStart, this.wTarget);
      this.shearActual = map(stageAaccel(tk0), 0, 1, this.shearStart, this.shearTarget);
      this.colActual = lerpColor(this.colStart, this.colTarget, stageAaccel(tk0));

      this.boxActual = map(stageAaccel(tk0), 0, 1, this.boxStart, this.boxTarget);
      // this.boxColActual = lerpColor(this.boxColStart, this.boxColTarget, stageAaccel(tk0));
      this.bkgdColActual = lerpColor(this.bkgdColStart, this.bkgdColTarget, stageAaccel(tk0));

    } else if(this.ticker < stageB){
      this.wActual = this.wTarget;
      this.shearActual = this.shearTarget;
      this.colActual = this.colTarget;

      this.boxActual = this.boxTarget;
      // this.boxColActual = this.boxColTarget;
      this.bkgdColActual = this.bkgdColTarget;

    } else if(this.ticker < stageC){ 
      var tk0 = map(this.ticker, stageB, stageC, 0, 1);
      this.wActual = map(stageBaccel(tk0), 0, 1, this.wTarget, this.wStart);
      this.shearActual = map(stageBaccel(tk0), 0, 1, this.shearTarget, this.shearStart);
      this.colActual = lerpColor(this.colTarget, this.colStart, stageBaccel(tk0));

      this.boxActual = map(stageBaccel(tk0), 0, 1, this.boxTarget, this.boxStart);
      // this.boxColActual = lerpColor(this.boxColTarget, this.boxColStart, stageBaccel(tk0));
      this.bkgdColActual = lerpColor(this.bkgdColTarget, this.bkgdColStart, stageBaccel(tk0));

    } else {
      this.wActual = this.wStart;
      this.shearActual = this.shearStart;
      this.colActual = this.colStart;

      this.boxActual = this.boxStart;
      // this.boxColActual = this.boxColStart;
      this.bkgdColActual = this.bkgdColStart;
    }

    this.postWpush = this.wActual * this.w - this.w;
    this.postShearPush = tan(-this.shearActual) * this.h;

    this.preCulm = xCulm[this.coreNumber];
    xCulm[this.coreNumber] += this.postWpush;
    xCulm[this.coreNumber] += this.postShearPush;

    if(this.index > 0){
      if(this.postShearPush > coreBase[this.coreNumber].lets[this.index - 1].postShearPush){
        this.preShearPush = -coreBase[this.coreNumber].lets[this.index - 1].postShearPush;
      } else {
        this.preShearPush = -this.postShearPush;
      }
      xCulm[this.coreNumber] += this.preShearPush;
    }

    var newBotX = this.x + (this.w * this.vecFac) * this.wActual + this.preCulm + this.preShearPush;
    var newTopX = this.x + (this.w * this.vecFac) * this.wActual + this.preCulm + this.preShearPush + this.postShearPush;

    this.botVec.set(newBotX, this.y);
    this.topVec.set(newTopX, this.y - this.h);
  }

  displayBox(){
    push();
      translate(this.x, this.y);

      shearX(this.shearActual);
      scale(this.wActual, 1);

      noStroke();
      // this.boxFill = int(random(colorSet.length)) + 4;

      if(this.boxFill < colorSet.length){
        fill(colorSet[this.boxFill]);
        rect(this.w/2 - this.w * this.boxActual/2, 0, this.w * this.boxActual, -this.h);
      } else {
        image(pg[this.boxFill - colorSet.length], this.w/2 - this.w * this.boxActual/2, 0, this.w * this.boxActual, -this.h);
      }
    pop();
  }

  displayType(){
    push();
      translate(this.x, this.y);

      shearX(this.shearActual);
      scale(this.wActual, 1);

      fill(this.colActual);
      text(this.l, 0, 0);

      // shearX(-this.shearActual);
      // rect(-2, 0, 4, -this.h);
      // ellipse(0, 0, 6, 6);
    pop();
  }

  displayBkgd(next){
    var nextBotVec = coreBase[this.coreNumber].lets[next].botVec;
    var nextTopVec = coreBase[this.coreNumber].lets[next].topVec;

    noStroke();
    fill(this.bkgdColActual);

    beginShape();
      vertex(this.botVec.x, this.botVec.y);
      vertex(this.topVec.x, this.topVec.y);
      vertex(nextTopVec.x, nextTopVec.y);
      vertex(nextBotVec.x, nextBotVec.y);
    endShape(CLOSE);
  }

  displayDebug(){
    noStroke();
    fill(255, 0, 0);
    ellipse(this.botVec.x, this.botVec.y, 5,5);
    ellipse(this.topVec.x, this.topVec.y, 5,5);

    noFill();
    stroke(255, 0, 0);
    line(this.botVec.x, this.botVec.y, this.topVec.x, this.topVec.y);
  }

  selectAnim(){
    var targetWidth = wWindow/inputText[this.coreNumber].length;
    var wTargetFactor = targetWidth/this.w;

    // this.wTarget = random(0.25, 1.75);
    this.wTarget = random(wTargetFactor - 0.2, wTargetFactor + 0.2);

    if(this.l == " "){
      this.shearTarget = 0;
    } else {
      this.shearTarget = random(-PI/6, PI/6);
    }

    // this.boxColTarget = colorSet[int(random(colorSet.length))];
    // while(this.boxColTarget == this.colTarget){
    //   this.boxColTarget = colorSet[int(random(colorSet.length))]
    // }
    this.boxOn = false;
    if(random(10) < 5){
      this.boxOn = true;
    }
    this.boxFill = int(random(colorSet.length)) + 4;
    var boxTester;
    if(this.boxFill <= colorSet.length){
      boxTester = colorSet[this.boxFill];
    }

    this.bkgdColTarget = colorSet[int(random(colorSet.length))];
    while(this.bkgdColTarget == this.colTarget){
      this.bkgdColTarget = colorSet[int(random(colorSet.length))];
    }

    this.colTarget = colorSet[int(random(colorSet.length))];
    while( this.colTarget == boxTester ){
      this.colTarget = colorSet[int(random(colorSet.length))];
    }

    this.scribbleOn = false;
    this.scribble = null;
    this.humpOn = false;
    this.hump = null;
    this.confettiOn = false;
    this.confetti = null;
    this.zigOn = false;
    this.zig = null;
    this.hrAddOn = false;
    this.hrAdd = null;
    this.scribAddOn = false;
    this.scribAdd = null;
    
    if(zigSpot[this.coreNumber] == this.index){
      this.zigOn = true;

      var flip = false;
      if(zigSpot[this.coreNumber][0] == inputText[this.coreNumber].length - 1){
        flip = true;
      } 
      this.zig = new Zig(this.x, this.y, this.w, this.h, this.wTarget, this.shearTarget, flip, this.ticker);
    }

    if(humpSpot[this.coreNumber] == this.index){
      this.humpOn = true;
      this.hump = new Hump(this.x, this.y, 0, this.ticker);
    }

    if(this.humpOn && this.zigOn){
      this.humpOn = false;
    }

    if(this.humpOn && this.index == inputText[this.coreNumber].length - 1){
      this.humpOn = false;
    }

    if(random(10) < 4){
      this.confettiOn = true;
      this.confetti = new Confetti(this.x, this.y, this.w, this.h, this.wTarget, this.shearTarget, this.ticker);
    }


    if(this.coreNumber == 0 && this.index == topScribSpot){
      this.scribAddOn = true;
      this.scribAdd = new Hump(this.x, this.y, 1, this.ticker);
    }
    if(this.coreNumber == inputText.length-1 && this.index == botScribSpot){
      this.scribAddOn = true;
      this.scribAdd = new Hump(this.x, this.y, 2, this.ticker);
    }
    
    if(hrAddSpot[this.coreNumber] == this.index){
      // print("HR added! at: " + this.coreNumber);
      this.hrAddOn = true;
      this.hrAdd = new Hr(this.x, this.y, this.w, this.h, int(random(2)), this.ticker);
    }
    if(this.humpOn){
      this.confettiOn = false;
      this.hrAddOn = false;
    }

    if(this.l == "S" ||
       this.l == "C" ||
       this.l == "G" ||
       this.l == "O" ||
       this.l == "Q" ||
       this.l == "S" ||
       this.l == "&"){
      this.boxOn = true;
    }
    if(this.l == "M" ||
       this.l == "L" ||
       this.l == "E" ||
       this.l == "H" ||
       this.l == " "){
      this.boxOn = false;
    }

    if(this.colTarget == this.bkgdColTarget){
      this.boxOn = true;
    }
  }

  configureVecFac(){
    this.vecFac = 0.5;

    if(this.l == "T" || this.l == "I"){
      this.vecFac = 0.5;
    } else if(this.l == "B" ||
              this.l == "C" ||
              this.l == "D" ||
              this.l == "E" ||
              this.l == "F" ||
              this.l == "H" ||
              this.l == "K" ||
              this.l == "L" ||
              this.l == "M" ||
              this.l == "N" ||
              this.l == "P" ||
              this.l == "R" ){
      this.vecFac = 0.25;
    } else if(this.l == "A" ||
              this.l == "O" ||
              this.l == "Q" ||
              this.l == "G" ||
              this.l == "C" ||
              this.l == "U"){
      this.vecFac = 0.35;
    } else if(this.l == "S"){
      this.vecFac = 0.5;
    } 
  }
  
}