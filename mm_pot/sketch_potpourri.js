var accentColor = '#ffffff';
var foreColor = '#F280BF';
var bkgdColor = '#000000';

var colorSet = [];

var inputText = [];
// var starterText = "GOOD\nNIGHT\nNOISES\nEVERY\nWHERE";
var starterText = "A THING\nCAN TRAVEL\nEVERYWHERE\nJUST BY\nSTANDING\nSTILL";
// var starterText = "IT IS\nMUCH\nWORSE\nTHEN WE\nTHINK";

var tFont = [];
var fontSelect;
var pgTextSize = 60;
var pgTextFactor = [];

var coreBase = [];
var coreBaseCount = 1;

var culmLength = [];

var offsetArrang = 0;
var lineOffset = 10;
var letterOffset = 3;

var stageA = 120;
var stageB = 60;
var stageC = 60;

var stageAdirect = 2;
var stageAstrength = 3;
var stageBdirect = 2;
var stageBstrength = 3;

let thisDensity = 2;

var yCulm = 0;

var p5Canvas;
var saveMode = 0;
let wWindow = 0;
let wWindowMax, wWindowMin;
let wWindowScale = 0.5;

var offsetAmount = 100;
var offsetCenter = 4;

var qrcode;

var fontSelect = 0;

function preload(){
  tFont[0] = loadFont("resources/Inter-Medium.ttf");
  tFont[1] = loadFont("resources/TT Bluescreens Trial Medium.otf");
  tFont[2] = loadFont("resources/EditorialNew-Thin.otf");
  tFont[3] = loadFont("resources/Milligram-Heavy.otf");
  tFont[4] = loadFont("resources/NeueMontreal-Light.otf");

  pgTextFactor[0] = 0.7;
  pgTextFactor[1] = 0.7;
  pgTextFactor[2] = 0.7;
  pgTextFactor[3] = 0.7;
  pgTextFactor[4] = 0.7;
}

class Utils {
  // Calculate the Width in pixels of a Dom element
  static elementWidth(element) {
    return (
      element.clientWidth -
      parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-left")) -
      parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-right"))
    )
  }

  // Calculate the Height in pixels of a Dom element
  static elementHeight(element) {
    return (
      element.clientHeight -
      parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-top")) -
      parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-bottom"))
    )
  }
}

function setup(){
  randomStart();

  resizeForPreview();

  thisDensity = pixelDensity();

  // accentColor = '#f2ebdc';
  // foreColor = '#d971c7';
  // bkgdColor = '#000000';

  document.getElementById("text0").value = starterText;
  setText(starterText);

  // SET UP DELAY
  createAnimation();

  strokeCap(ROUND);
  strokeJoin(ROUND);
  rectMode(CENTER);
}

function draw(){
  background(bkgdColor);

  push();
    translate(width/2, height/2);

    translate(0, -yCulm/2);
    // translate(-textWidth("I"), 0);

    yCulm = 0;
    for(var p = 0; p < coreBaseCount; p++){
      translate(0, -coreBase[p].yMin);
      push();
        translate(-textWidth(inputText[p].charAt(0))/2, 0)
        translate(-culmLength[p]/2, 0);
        coreBase[p].run();
      pop();
      translate(0, coreBase[p].yMax + 10);

      yCulm += abs(coreBase[p].yMin) + abs(coreBase[p].yMax) + 10;
    }

  pop();
}

function createAnimation(){
  coreBase = [];
  for(var p = 0; p < coreBaseCount; p++){
    coreBase[p] = new Base(p);

    for(var m = 0; m < coreBase[p].lets.length; m++){      
      if(offsetArrang == 0){
        var thisDelay = m * -letterOffset + p * -lineOffset;
        coreBase[p].lets[m].ticker = thisDelay;
        coreBase[p].sprinkles[m].ticker = thisDelay;
        coreBase[p].chunks[m].ticker = thisDelay;
      } else if(offsetArrang == 1){
        if(m < coreBase[p].lets.length/2){
          var thisDelay = (coreBase[p].lets.length/2 - m) * -letterOffset + p * -lineOffset;
          coreBase[p].lets[m].ticker = thisDelay;
          coreBase[p].sprinkles[m].ticker = thisDelay;
          coreBase[p].chunks[m].selectedChunk.ticker = thisDelay;
        } else {
          var thisDelay = (m - coreBase[p].lets.length/2) * -letterOffset + p * -lineOffset;
          coreBase[p].lets[m].ticker = thisDelay;
          coreBase[p].sprinkles[m].ticker = thisDelay;
          coreBase[p].chunks[m].selectedChunk.ticker = thisDelay;
        }
      }
    }
  }
}

function resizeForPreview(){
  p5Div = document.getElementById("mainCanvas");

  var baseWidth = Utils.elementWidth(p5Div)
  var baseHeight = Utils.elementHeight(p5Div);

  // const p5Canvas = createCanvas(Utils.elementWidth(p5Div), Utils.elementHeight(p5Div));
  // const p5Canvas = createCanvas(baseHeight, baseHeight);
  // p5Canvas.parent(p5Div);

  var tempWidth, tempHeight;

  if(saveMode == 0){
    if(p5Canvas == null){
      p5Canvas = createCanvas(baseWidth, baseHeight);
    } else {
      resizeCanvas(baseWidth, baseHeight);
    }
  } else if(saveMode == 1){
    if(baseWidth > baseHeight * 9/16){
      tempHeight = baseHeight;
      tempWidth = baseHeight * 9/16;
    } else {
      tempWidth = baseWidth;
      tempHeight = baseWidth * 16/9;
    }
    if(p5Canvas == null){
      p5Canvas = createCanvas(tempWidth, tempHeight);
    } else {
      resizeCanvas(tempWidth, tempHeight);
    }
  } else if(saveMode == 2){
    if(baseWidth < baseHeight){
      tempWidth = baseWidth;
      tempHeight = baseWidth;
    } else {
      tempHeight = baseHeight;
      tempWidth = baseHeight;
    }
    if(p5Canvas == null){
      p5Canvas = createCanvas(tempWidth, tempHeight);
    } else {
      resizeCanvas(tempWidth, tempHeight);
    }
  }

  var dx = (baseWidth - width)/2;
  var dy = (baseHeight - height)/2;

  p5Canvas.position(dx,dy);

  cwidth = width;
  cheight = height;

  wWindowMin = width/4;
  wWindowMax = width;
  wWindow = map(wWindowScale, 0, 1, wWindowMin, wWindowMax);

}

function stageAaccel(val){
  if(stageAdirect == 0){
    if(stageAstrength == 0){ return easeInSine(val); }
    else if(stageAstrength == 1){ return easeInCubic(val); }
    else if(stageAstrength == 2){ return easeInCirc(val); }
    else if(stageAstrength == 3){ return easeInExpo(val); }
    else if(stageAstrength == 4){ return easeInBack(val); }
    else if(stageAstrength == 5){ return easeInBounce(val); }
    else if(stageAstrength == 6){ return easeInElastic(val); }
  } else if(stageAdirect == 1){
    if(stageAstrength == 0){ return easeOutSine(val); }
    else if(stageAstrength == 1){ return easeOutCubic(val); }
    else if(stageAstrength == 2){ return easeOutCirc(val); }
    else if(stageAstrength == 3){ return easeOutExpo(val); }
    else if(stageAstrength == 4){ return easeOutBack(val); }
    else if(stageAstrength == 5){ return easeOutBounce(val); }
    else if(stageAstrength == 6){ return easeOutElastic(val); }
  } else if(stageAdirect == 2){
    if(stageAstrength == 0){ return easeInOutSine(val); }
    else if(stageAstrength == 1){ return easeInOutCubic(val); }
    else if(stageAstrength == 2){ return easeInOutCirc(val); }
    else if(stageAstrength == 3){ return easeInOutExpo(val); }
    else if(stageAstrength == 4){ return easeInOutBack(val); }
    else if(stageAstrength == 5){ return easeInOutBounce(val); }
    else if(stageAstrength == 6){ return easeInOutElastic(val); }
  }
}

function stageBaccel(val){
  if(stageBdirect == 0){
    if(stageBstrength == 0){ return easeInSine(val); }
    else if(stageBstrength == 1){ return easeInCubic(val); }
    else if(stageBstrength == 2){ return easeInCirc(val); }
    else if(stageBstrength == 3){ return easeInExpo(val); }
    else if(stageBstrength == 4){ return easeInBack(val); }
    else if(stageBstrength == 5){ return easeInBounce(val); }
    else if(stageBstrength == 6){ return easeInElastic(val); }
  } else if(stageBdirect == 1){
    if(stageBstrength == 0){ return easeOutSine(val); }
    else if(stageBstrength == 1){ return easeOutCubic(val); }
    else if(stageBstrength == 2){ return easeOutCirc(val); }
    else if(stageBstrength == 3){ return easeOutExpo(val); }
    else if(stageBstrength == 4){ return easeOutBack(val); }
    else if(stageBstrength == 5){ return easeOutBounce(val); }
    else if(stageBstrength == 6){ return easeOutElastic(val); }
  } else if(stageBdirect == 2){
    if(stageBstrength == 0){ return easeInOutSine(val); }
    else if(stageBstrength == 1){ return easeInOutCubic(val); }
    else if(stageBstrength == 2){ return easeInOutCirc(val); }
    else if(stageBstrength == 3){ return easeInOutExpo(val); }
    else if(stageBstrength == 4){ return easeInOutBack(val); }
    else if(stageBstrength == 5){ return easeInOutBounce(val); }
    else if(stageBstrength == 6){ return easeInOutElastic(val); }
  }
}

function randomStart(){
  var rs0 = random(60);

  if(rs0 < 10){
    // DEFAULT
  } else if(rs0 < 20){
    starterText = "LET ME SING\nTO YOU NOW\nABOUT HOW\nPEOPLE TURN\nINTO OTHER\nTHINGS";
    fontSelect = 3;
    wWindowScale = 0.1;
    bkgdColor = color(255, 255, 255);
    foreColor = color(0,0,0);
    accentColor = color(189,189,189);

    stageAdirect = 1;
    stageAstrength = 6;
    stageBdirect = 0;
    stageBstrength = 6;

  } else if(rs0 < 30){
    starterText = "GOOD\nNIGHT\nNOISES\nEVERY\nWHERE";
    fontSelect = 2;
    wWindowScale = 0.01;
    bkgdColor = color(0,0,0);
    foreColor = color(255, 255, 255);
    accentColor = color(255,241,148);

    stageA = 50;
    stageAdirect = 0;
    stageAstrength = 3;
    stageBdirect = 1;
    stageBstrength = 3;
  } else if(rs0 < 40){
    starterText = "AN OLD\nFUTURE";
    wWindowScale = 0.5;

    bkgdColor = color(73, 191, 136);
    foreColor = color(0,0,0);
    accentColor = color(255,255,255);

    stageA = 25;
    stageAdirect = 1;
    stageAstrength = 3;
    stageB = 25;
    stageBdirect = 0;
    stageBstrength = 3;

    stageC = 60;
  } else if(rs0 < 50){
    starterText = "FANATICS\nHAVE THEIR\nDREAMS";
    wWindowScale = 0.5;
    fontSelect = 1;

    bkgdColor = color(242, 100, 87);
    foreColor = color(0,0,0);
    accentColor = color(255,255,255);

    stageA = 25;
    stageAdirect = 0;
    stageAstrength = 5;
    stageB = 120;
    stageBdirect = 1;
    stageBstrength = 5;
  } else if(rs0 < 60){
    starterText = "YOU'RE\nGOING\nTO HAVE\nTO MAKE\nIT UP";
    fontSelect = 4;

    bkgdColor = color(242, 116, 87);
    foreColor = color(0,0,0);
    accentColor = color(0,0,0);

    stageA = 120;
    stageAdirect = 1;
    stageAstrength = 5;
    stageB = 60;
    stageBdirect = 2;
    stageBstrength = 5;
  }

  document.getElementById("text0").value = starterText;
  document.getElementById("fontChange").value = fontSelect;
  document.getElementById("pgTextSize").value = map(wWindowScale, 0, 1, 0, 100);
  document.getElementById("stagAlength").value = map(stageA, 1, 200, 0, 100);;
  document.getElementById("stageAdirect").value = stageAdirect;
  document.getElementById("stageAstrength").value = stageAstrength;
  document.getElementById("stagBlength").value = map(stageB, 1, 200, 0, 100);;
  document.getElementById("stageBdirect").value = stageBdirect;
  document.getElementById("stageBstrength").value = stageBstrength;

  document.getElementById("stagClength").value = map(stageC, 1, 200, 0, 100);;

  var returnForeColor = foreColor.toString('#rrggbb');
  document.getElementById("foreColor").value = returnForeColor;
  var returnBkgdColor = bkgdColor.toString('#rrggbb');
  document.getElementById("bkgdColor").value = returnBkgdColor;
  var returnAccentColor = accentColor.toString('#rrggbb');
  document.getElementById("accentColor").value = returnAccentColor;
  

}