var bkgdColor, foreColor, alphaColor;
var colorSet = [];

var inputText = [];
// var starterText = "THE\nBRIDGE\nTO BUILD\nA BRIDGE";
var starterText = "THE\nMEANING\nOF ALL\nMOTIONS\nSHAPES &\nSOUNDS";
// var starterText = "MMMM\nMMMM\nMMMM\nMMMM\nMMMM"
// var starterText = "XXX";

var tFont = [];
var tFontFactor = [];
var pgTextSize = 10;
var pg = [];
var pgBkgd = [];
var pgGrad = [];
var leading = 0;
var tracking = 0;

var coreBase = [];
var coreBaseCount = 1;

var culmLength = [];
var xCulm = [];

var wWindow;

var offsetArrang = 0;
var lineOffset = 10;
var letterOffset = 3;

var stageAbase = 90;
var pauseBase = 90;
var stageCbase = 90;

var stageA = stageAbase;
var stageB = stageA + pauseBase;
var stageC = stageB + stageCbase;
var stageD = stageC + pauseBase;

var stageAdirect = 2;
var stageAstrength = 3;
var stageBdirect = 2;
var stageBstrength = 3;

var fullH = 0;
var fullW = 0;
var offsetCenter = 4;
var offsetAmount = -50;

var selFont = 0;

var lastSpot = 0;
var topScribSpot, botScribSpot;
var humpSpot = [];
var zigSpot = [];
var hrAddSpot = [];
var configTicker = 0;

var animTicker = 0;
var animAlpha = 255;
var animBkgdSelect = 0;

var wWindowMin, wWindowMax;
var scaler = 0.75;

var marksOn = true;
var bkgdAnimOn = true;

function preload(){
  tFont[0] = loadFont("resources/FuturaStd-ExtraBold.otf");
  tFont[1] = loadFont("resources/Inter-Medium.ttf");
  tFont[2] = loadFont("resources/EditorialNew-Regular.ttf");

  pgGrad[0] = loadImage("resources/grad0.png");
  pgGrad[1] = loadImage("resources/grad1.png");
  pgGrad[2] = loadImage("resources/grad2.png");
  pgGrad[3] = loadImage("resources/grad3.png");
  pgGrad[4] = loadImage("resources/grad4.png");
  pgGrad[5] = loadImage("resources/grad5.png");

  tFontFactor[0] = 0.752;
  tFontFactor[1] = 0.725;
  tFontFactor[2] = 0.8; 
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  foreColor = color('#ffffff');
  bkgdColor = color('#2a2a2a');
  alphaColor = color(0,0,0,0);

  // colorSet[0] = color('#c4fe0e');
  // colorSet[1] = color('#fc5b56');
  // colorSet[2] = color('#6d0dfd');
  // colorSet[3] = color('#fe95c2');
  // colorSet[4] = color('#056afc');
  // colorSet[5] = color('#fd7835');
  // colorSet[6] = color('#ffffff');

  colorSet[0] = color('#dbff06');
  colorSet[1] = color('#33ff00');
  colorSet[2] = color('#6803fa');
  colorSet[3] = color('#ff83e2');
  colorSet[4] = color('#3939ff');
  colorSet[5] = color('#ff5400');
  colorSet[6] = color('#ffffff');
  
  document.getElementById("textArea").value = starterText;
  setText(starterText);

  // SET UP DELAY
  // createAnimation();

  strokeCap(ROUND);
  strokeJoin(ROUND);

  drawGradient0(0);
  drawGradient1(1);
  drawGradient2(2);
  drawGradient3(3);
  drawBkgdGradient0(0);
  drawBkgdGradient1(1);
  drawBkgdGradient2(2);
  drawBkgdGradient3(3);
  drawBkgdSolid0(4);
  drawBkgdSolid1(5);
}

function draw(){
  background(30);
  if(bkgdAnimOn){
    if(animBkgdSelect < 6){
      image(pgGrad[animBkgdSelect], 0, 0, width, height);
    } else {
      image(pgBkgd[animBkgdSelect - 6], 0, 0, width, height);
    }
  }

  fill(30, animAlpha)
  rect(0, 0, width, height);

  push();
    translate(width/2 + tracking, height/2);

    // for(var p = 0; p < coreBaseCount; p++){
    //   push();
    //     stroke(255);
    //     noFill();
    //     rect(-wWindow/2, (p - coreBaseCount/2)* pgTextSize * tFontFactor[selFont], wWindow, pgTextSize * tFontFactor[selFont]);
    //   pop();
    // }

    for(var p = 0; p < coreBaseCount; p++){
      push();
        translate(-xCulm[p]/2, 0);
        coreBase[p].displayBkgd();
      pop();
    }

    for(var p = 0; p < coreBaseCount; p++){
      push();
        translate(-xCulm[p]/2, 0);
        coreBase[p].run();
      pop();
    }

    // image(pg[3], 0, 0);
  pop();

  // fill(foreColor);
  // noStroke();
  // textSize(20);
  // text(round(frameRate()), 20, height - 20);
  // textSize(pgTextSize);

  if(((configTicker - lastSpot)%stageD - 1) == 0){
    configAdds();
  }
  configTicker ++;

  runAnim();
}

function runAnim(){
  if(animTicker >= stageD){
    resetAnim();
  } else {
    animTicker ++;
  }

  if(animTicker < 0){
    animAlpha = 255;

  } else if(animTicker < stageA){
    var tk0 = map(animTicker, 0, stageA, 0, 1);
    animAlpha = map(stageAaccel(tk0), 0, 1, 255, 0);

  } else if(animTicker < stageB){
    animAlpha = 0;

  } else if(animTicker < stageC){
    var tk0 = map(animTicker, stageB, stageC, 0, 1);
    animAlpha = map(stageBaccel(tk0), 0, 1, 0, 255);

  } else {
    animAlpha = 255;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  findMaxSize();
  createAnimation();
}

function resetAnim(){
  animTicker = 0;

  var newBkgd = int(random(pgBkgd.length  + 6));
  animBkgdSelect = newBkgd;
}