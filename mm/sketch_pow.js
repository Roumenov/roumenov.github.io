var bkgdColor = '#35bdf0';
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
var widgetOn = true;

var blastFactor = 1;
var detailFactor = 0.7;
var ratioFactor = 2;
let spurMessyToggle = false;

var mousePopOn = true;

const frate = 30;
var numFrames = 300;
let recording = false;
let recordedFrames = 0;

let thisDensity = 2;
let recMessageOn = false;

let blastType = 0;

let coreTicker = 0;
let coreAnimWindow = 98;

let wWindow = 0;
let wWindowMax, wWindowMin;
let wWindowScale = 0.5;

var saveMode = 2;

var qrcode;

var p5Canvas;
var exportURL = "";

var read

function preload(){
  tFont[0] = loadFont("resources/FormulaCondensed-Bold.otf");
  pgTextFactor[0] = 0.85;

  tFont[1] = loadFont("resources/EditorialNew-Thin.otf");
  pgTextFactor[1] = 0.85;

  tFont[2] = loadFont("resources/NeueWorld-CondensedRegular.otf");
  pgTextFactor[2] = 0.75;

  tFont[3] = loadFont("resources/TT Bluescreens Trial Medium.otf");
  pgTextFactor[3] = 0.75;
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
  if(urlParams.has('starterText')){
    parseCustomUrl();
  }
  resizeForPreview();

  thisDensity = pixelDensity();

  orgX = width/2;
  orgY = height/2;
  if(mousePopOn){
    coreMousePop = new MousePop(orgX, orgY);
  }

  frameRate(frate);

  textFont(tFont[fontSelect]);
  textSize(pgTextSize);
  strokeJoin(ROUND);

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

function parseCustomUrl(){
  var convertText = urlParams.get('starterText');
  starterText = convertText.replaceAll("_*_", "\n");
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

    findMaxSize();
    setText();
  }
}

function parseCustomUrl(){
  var convertText = urlParams.get('01');
  starterText = convertText.replaceAll("_*_", "\n");

  fontSelect = urlParams.get('02');
  document.getElementById("fontChange").value = fontSelect;

  // pgTextSize = int(urlParams.get('pgTextSize'));
  // document.getElementById("pgTextSize").value = map(pgTextSize, 10, 400, 0, 100);
  // coreScale = pgTextSize/250;

  // fillColor = color(urlParams.get('fillColor'));
  // var returnFillColor = fillColor.toString('#rrggbb');
  // document.getElementById("fillColor").value = returnFillColor;

  // bkgdColor = color(urlParams.get('bkgdColor'));
  // var returnBkgdColor = bkgdColor.toString('#rrggbb');
  // document.getElementById("bkgdColor").value = returnBkgdColor;

  // strokeColor = color(urlParams.get('strokeColor'));
  // var returnstrokeColor = strokeColor.toString('#rrggbb');
  // document.getElementById("strokeColor").value = returnstrokeColor;

  // coreSW = urlParams.get('coreSW');
  // document.getElementById("coreSW").value = map(coreSW, 0, 4, 1, 100);

  // detailFactor = urlParams.get('detailFactor');
  // document.getElementById("detailFactor").value = map(detailFactor, 1.5, 0.3, 1, 100);

  // blastFactor = urlParams.get('blastFactor');
  // document.getElementById("blastFactor").value = map(blastFactor, 0.5, 3, 1, 100);

  // ratioFactor = urlParams.get('ratioFactor');
  // document.getElementById("ratioFactor").value = map(ratioFactor, 0.1, 4, 1, 100);
}