function setText(){
  var enteredText = document.getElementById("textArea").value;
  
  inputText = "";
  inputText = enteredText.match(/[^\r\n]+/g);

  if(enteredText == ""){
    // print("SHORT EXECUTED! and inputText is " + inputText);
    inputText = [];
    inputText[0] = " ";
  }

  coreBaseCount = inputText.length;

  findMaxSize();
  createAnimation();
}

function findMaxSize(){
  var testerSize = 100;
  textSize(testerSize);
  textFont(tFont[selFont]);
  
  ///////// FIND THE LONGEST LINE
  var longestLine = 0;
  var measurer = 0;

  for(var m = 0; m < inputText.length; m++){
    var tapeMeasurer = textWidth(inputText[m]);

    if(tapeMeasurer > measurer){
      longestLine = m;
      measurer = tapeMeasurer;
    }
  }
  // print("LONGLEST LINE IS:" + longestLine + " which reads: " + inputText[longestLine]);

  ///////// FIND THE SIZE THAT FILLS TO THE MAX WIDTH
  var widthTest = wWindow;

  let sizeHolder = 2;
  textSize(sizeHolder);
  let holdW = 0;

  while(holdW < widthTest){
    textSize(sizeHolder);
    holdW = textWidth(inputText[longestLine]);

    sizeHolder += 2;
  }
  pgTextSize = sizeHolder;

  ///////// MAKE SURE THE HEIGHT DOESN'T BRAKE THE HEIGHT
  var heightTest = (height - 30) - (inputText.length - 1) * leading;
  let holdH = inputText.length * sizeHolder * tFontFactor[selFont];
  while(holdH > heightTest){
    holdH = inputText.length * sizeHolder * tFontFactor[selFont];
    sizeHolder -= 2;
  }
  pgTextSize = sizeHolder;
  tracking = -pgTextSize/10;

  print("newPGtextSize is: " + pgTextSize);

  fullH = inputText.length * sizeHolder * tFontFactor[selFont];
  fullW = textWidth(inputText[longestLine]);
}

function createAnimation(){
  coreBase = [];

  configAdds();

  for(var p = 0; p < coreBaseCount; p++){
    xCulm[p] = 0;
    coreBase[p] = new Base(p);
  }

  lastSpot = 0;
  configTicker = 0;
  var lastMeasure = 0;
  for(var p = 0; p < coreBaseCount; p++){
    for(var m = 0; m < coreBase[p].lets.length; m++){
      if(coreBase[p].lets[m].ticker < lastMeasure){
        lastSpot = int(coreBase[p].lets[m].ticker);
        lastMeasure = lastSpot;
      }
    }
  }

  // print("Last Spot: " + lastSpot)
  configTicker = lastMeasure;
  animTicker = int(lastSpot/2);
}

function configAdds(){
  // print("CONFIGURE ADD!");

  for(var p = 0; p < coreBaseCount; p++){
    humpSpot[p] = int(random(inputText[p].length));
    // humpSpot[p] = [];
    // humpSpot[p][0] = int(random(inputText[p].length));
    // humpSpot[p][1] = int(random(inputText[p].length));

    // if(inputText[p].length > 1){
    //   while(humpSpot[p][0] == humpSpot[p][1]){
    //     humpSpot[p][1] = int(random(inputText[p].length));
    //   }
    // }

    zigSpot[p] = [];
    var rs0 = random(10);
    if(rs0 < 3){             //////////////////////// PLACE AT FIRST SPOT
      zigSpot[p][0] = 0;
    } else if(rs0 < 6){      //////////////////////// PLACE AT LAST SPOT
      zigSpot[p][0] = inputText[p].length - 1;
    } else {
      zigSpot[p][0] = -10000; /// don't run
    }
  }

  topScribSpot = int(random(inputText[0].length - 1));
  botScribSpot = int(random(inputText[coreBaseCount-1].length - 1));
}

function setFont(val){
  selFont = val;

  findMaxSize();
  createAnimation();
}

function setScaler(val){
  scaler = map(val, 0, 100, 0.1, 1);

  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);
  
  findMaxSize();
  createAnimation();
}

// var stageA = 90;
// var stageB = stageA + 90;
// var stageC = stageB + 90;
// var stageD = stageC + 60;

function setStageAlength(val){        /////////// ACTUALLY STAGEA
  stageAbase = round(map(val, 0, 100, 5, 180));

  setStages();
}

function setStageBlength(val){        /////////// ACTUALLY STAGEC
  stageCbase = round(map(val, 0, 100, 5, 180));

  setStages();
}

function setStageClength(val){        /////////// ACTUALLY STAGEB & STAGED
  pauseBase = round(map(val, 0, 100, 5, 180));
  
  setStages();
}

function setStages(){
  stageA = stageAbase;
  stageB = stageA + pauseBase;
  stageC = stageB + stageCbase;
  stageD = stageC + pauseBase;

  createAnimation();
}

function setStageAdirect(val){
  stageAdirect = val;
}

function setStageAstrength(val){
  stageAstrength = val;
}

function setStageBdirect(val){
  stageBdirect = val;
}

function setStageBstrength(val){
  stageBstrength = val;
}

function setOffsetCenter(val){
  offsetCenter = val;

  createAnimation();
}

function setOffsetAmount(val){
  offsetAmount = map(val, 0, 100, -100, 100);

  createAnimation();
}

function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}