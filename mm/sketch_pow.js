var bkgdColor = '#5080bf';
var strokeColor = '#000000';
var fillColor = '#ffffff';

var pg = [];
var pgTextSize = 250;

var tFont = [];
var pgTextFactor = [];
var fontSelect = 0;

// var starterText = "SPACE\n& TIME";
var starterText = "NEVER\nPERFECT\nENOUGH";
// var starterText = "AND\nBEGIN\nAGAIN";

var inputText;
var coreSplode;
var coreMousePop;

var orgX, orgY;
var coreScale = 1;
var coreSW = 2;
var coreSWfac = 2;
var widgetOn = true;

var blastFactor = 1;
var detailFactor = 0.7;
var ratioFactor = 2;
let spurMessyToggle = false;

var mousePopOn = true;

let thisDensity = 2;
let recMessageOn = false;

let blastType = 0;

let coreTicker = 0;
let coreAnimWindow = 98;

const frate = 30;
var numFrames = coreAnimWindow * 3;
let recording = false;
let recordedFrames = 0;

let wWindow = 0;
let wWindowMax, wWindowMin;
let wWindowScale = 0.5;

var saveMode = 2;

var qrcode;

var p5Canvas;
var exportURL = "";

function preload(){
  tFont[0] = loadFont("resources/FormulaCondensed-Bold.otf");
  pgTextFactor[0] = 0.85;

  tFont[1] = loadFont("resources/EditorialNew-Thin.otf");
  pgTextFactor[1] = 0.85;

  tFont[2] = loadFont("resources/NeueWorld-CondensedRegular.otf");
  pgTextFactor[2] = 0.75;

  tFont[3] = loadFont("resources/TT Bluescreens Trial Medium.otf");
  pgTextFactor[3] = 0.75;

  tFont[4] = loadFont("resources/Milligram-Heavy.otf");
  pgTextFactor[4] = 0.75;

  tFont[5] = loadFont("resources/IBMPlexMono-Italic.otf");

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
  urlParams = new URLSearchParams(window.location.search);
  if(urlParams.has('01')){
    parseCustomUrl();
  } else {
    selectRandom();
  }

  resizeForPreview();

  thisDensity = pixelDensity();

  orgX = width/2;
  orgY = height/2;
  if(mousePopOn){
    coreMousePop = new MousePop(orgX, orgY);
  }

  noSmooth();
  frameRate(frate);

  textFont(tFont[fontSelect]);
  textSize(pgTextSize);
  strokeJoin(ROUND);

  scaleValues();

  if(document.getElementById("text0") != null){
    document.getElementById("text0").value = starterText;
    setText(starterText);
  } else {
    setText(starterText);
  }
}

function draw(){
  background(bkgdColor);

  // stroke(0);
  // line(0, 0, width, height);

  push();
    if(brightness(bkgdColor) > 90){
      fill(0, 200);
    } else {
      fill(255, 200);
    }
    noStroke();
    textAlign(CENTER);
    textSize(height/100);
    textFont(tFont[5]);
    translate(width/2, height-10);
    // rotate(PI/2);
    text("CREATED @ MOTION MOTION", 0, 0);
    // translate(0, -height + 20);
    // rotate(PI);
    // text("CREATED @ MOTION MOTION", 0, 0);
  pop();

  if(mousePopOn){ coreMousePop.runBottom(); }
  coreSplode.run();
  if(mousePopOn){ coreMousePop.runTop();}

  runRecording();

  if(coreTicker == coreAnimWindow){
    coreSplode.refresh();
    coreMousePop.refresh(orgX, orgY);
    coreTicker = 0;
  }
  coreTicker++;
}

function scaleValues(){
  // print("RESCALED!");

  coreSW = coreSWfac * width/1080;
  coreScale = width/1080;
}

function mousePressed(){
  // if(mouseY < height - 100){
  if(mouseY > 0 && mouseY < height && mouseX > 0 && mouseX < width){
    orgX = mouseX;
    orgY = mouseY;
  
    coreSplode.refresh();
    coreMousePop.refresh(orgX, orgY);
    coreTicker = 0;
  }
}

function buildIt(){
  coreSplode = new SplodeAll();

  orgX = width/2;
  orgY = height/2;

  coreMousePop.refresh(orgX, orgY);
}

function windowResized(){
  resizeForPreview();
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

  wWindowMin = width/2;
  wWindowMax = width;
  wWindow = map(wWindowScale, 0, 1, wWindowMin, wWindowMax);

  if(inputText != null){
    coreSplode.refresh();
    coreMousePop.refresh(orgX, orgY);

    scaleValues();
    findMaxSize();
    setText(starterText);
    coreTicker = 0;
  }
}

function resizeForSave(){
  p5Div = document.getElementById("mainCanvas");

  var baseWidth = Utils.elementWidth(p5Div)
  var baseHeight = Utils.elementHeight(p5Div);

  if(saveMode == 0){
    resizeCanvas(baseWidth, baseHeight);
  } else if(saveMode == 1){
    resizeCanvas(1080, 1920);
  } else if(saveMode == 2){
    resizeCanvas(1080, 1080);
  }

  var dx = (baseWidth - width)/2;
  var dy = (baseHeight - height)/2;

  p5Canvas.position(dx,dy);

  cwidth = width;
  cheight = height;

  wWindowMin = width/2;
  wWindowMax = width;
  wWindow = map(wWindowScale, 0, 1, wWindowMin, wWindowMax);

  if(inputText != null){
    coreSplode.refresh();
    coreMousePop.refresh(orgX, orgY);

    scaleValues();
    findMaxSize();
    setText(starterText);
    coreTicker = 0;
  }
}

function parseCustomUrl(){
  var convertText = urlParams.get('01');
  starterText = convertText.replaceAll("_*_", "\n");
  fontSelect = urlParams.get('02');
  wWindowScale = urlParams.get('03');
  fillColor = color(urlParams.get('04'));
  bkgdColor = color(urlParams.get('05'));
  strokeColor = color(urlParams.get('06'));
  coreSWfac = urlParams.get('07');
  detailFactor = urlParams.get('08');
  blastFactor = urlParams.get('09');
  ratioFactor = urlParams.get('10');
  blastType = urlParams.get('11');
  spurMessyToggle = urlParams.get('12');
  saveMode = urlParams.get('13');

  document.getElementById("window").checked = false;
  document.getElementById("vert").checked = false;
  document.getElementById("squa").checked = false;
  if(saveMode == 0){
    document.getElementById("window").checked = true;
  } else if(saveMode == 1){
    document.getElementById("vert").checked = true;
  } else if(saveMode == 2){
    document.getElementById("squa").checked = true;
  }

  resizeForPreview();
  scaleValues();
}

function selectRandom(){
  var rs0 = random(60);

  if(rs0 < 10){
    // DEFAULT
  } else if(rs0 < 20){
    starterText = "OK";
    fontSelect = 1;
    wWindowScale = 0.25;
    bkgdColor = color(0,0,0);
    coreSWfac = 0;
    detailFactor = 1.22;
    blastFactor = 3;
    blastType = 1;
  } else if(rs0 < 30){
    starterText = "I WANT\nTIME\nI WANT\nSPACE";
    fontSelect = 3;
    wWindowScale = 0.6;
    bkgdColor = color(242,70,53);
    fillColor = color(242,175,199);
    coreSWfac = 0;
    detailFactor = 0.3;
    blastFactor = 2.293;
    ratioFactor = 2.385;
    saveMode = 1;
  } else if(rs0 < 40){
    starterText = "AND\nBEGIN\nAGAIN";
    bkgdColor = color(255,255,255);
    fillColor = color(255,255,255);
    coreSWfac = 3;
  } else if(rs0 < 50){
    starterText = "ALL\nTHIS\nAND\nMORE";
    bkgdColor = color(80,128,191);
    strokeColor = color(242,175,199);
    fillColor = color(255,255,255);
    fontSelect = 4;
    coreSWfac = 2.5;
    detailFactor = 1.003;
    blastFactor = 1.864;
    ratioFactor = 1.006;
  } else if(rs0 < 60){
    starterText = "AND\nBEGIN\nAGAIN";
    bkgdColor = color(0,0,0);
    fillColor = color(242,181,65);
    fontSelect = 0;
    coreSWfac = 0;
    detailFactor = 0.5666;
    blastFactor = 3;
    blastType = 1;
    saveMode = 0;
  }

  document.getElementById("text0").value = starterText;
  document.getElementById("fontChange").value = fontSelect;
  document.getElementById("pgTextSize").value = map(wWindowScale, 0, 1, 0, 100);
  var returnFillColor = fillColor.toString('#rrggbb');
  document.getElementById("fillColor").value = returnFillColor;
  var returnBkgdColor = bkgdColor.toString('#rrggbb');
  document.getElementById("bkgdColor").value = returnBkgdColor;
  var returnstrokeColor = strokeColor.toString('#rrggbb');
  document.getElementById("strokeColor").value = returnstrokeColor;
  document.getElementById("coreSW").value = map(coreSWfac, 0, 4, 1, 100);
  document.getElementById("blastType").value = blastType;
  document.getElementById("detailFactor").value = map(detailFactor, 1.5, 0.3, 1, 100);
  document.getElementById("blastFactor").value = map(blastFactor, 0.5, 3, 1, 100);
  document.getElementById("ratioFactor").value = map(ratioFactor, 0.1, 4, 1, 100);
  document.getElementById("messySpur").checked = spurMessyToggle;
   
  document.getElementById("window").checked = false;
  document.getElementById("vert").checked = false;
  document.getElementById("squa").checked = false;
  if(saveMode == 0){
    document.getElementById("window").checked = true;
  } else if(saveMode == 1){
    document.getElementById("vert").checked = true;
  } else if(saveMode == 2){
    document.getElementById("squa").checked = true;
  }

  if(blastType == 0){
    document.getElementById('cloudOption1').style.display = "flex";
    document.getElementById('spurOption1').style.display = "none";
  } else {
    document.getElementById('cloudOption1').style.display = "none";
    document.getElementById('spurOption1').style.display = "flex";
  }
}