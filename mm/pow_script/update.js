function setText(val){
  var enteredText = val;

  inputText = enteredText.match(/[^\r\n]+/g);

  if(enteredText == ""){
    inputText = [];
    inputText[0] = " ";
  }

  findMaxSize();
  buildIt();
}

function findMaxSize(){
  var testerSize = 100;
  textSize(testerSize);
  textFont(tFont[fontSelect]);
  
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
  // print("wWindow is: " + widthTest);

  let sizeHolder = 2;
  textSize(sizeHolder);
  let holdW = 0;

  while(holdW < widthTest){
    textSize(sizeHolder);
    holdW = textWidth(inputText[longestLine]);

    sizeHolder += 2;
  }
  pgTextSize = sizeHolder;
  // print("newPGtextSize is: " + pgTextSize);

  ///////// MAKE SURE THE HEIGHT DOESN'T BRAKE THE HEIGHT
  var heightTest = (height - 30);
  let holdH = inputText.length * sizeHolder * pgTextFactor[fontSelect];
  while(holdH > heightTest){
    holdH = inputText.length * sizeHolder * pgTextFactor[fontSelect];
    sizeHolder -= 2;
  }
  pgTextSize = sizeHolder;
}


function setwWindowScale(val){
  wWindowScale = map(val, 0, 100, 0, 1);

  wWindow = map(wWindowScale, 0, 1, wWindowMin, wWindowMax);
  findMaxSize();

  coreMousePop.refresh(orgX, orgY);
  coreSplode = null;
  coreSplode = new SplodeAll();

  coreTicker = 0;
}

function sizeSaveChange(val){
  saveMode = val;
  resizeForPreview();
}

function setFillColor(val){ fillColor = val; }
function setBkgdColor(val){ bkgdColor = val; }
function setStrokeColor(val){ strokeColor = val; }

function setCoreSW(val){
  coreSW = map(val, 1, 100, 0, 4);
}

function setDetailFactor(val){
  detailFactor = map(val, 1, 100, 1.5, 0.3);

  resetPop();
  coreSplode.refresh();
}

function setBlastFactor(val){
  blastFactor = map(val, 1, 100, 0.5, 3);

  resetPop();
  coreSplode.refresh();
}

function setRatioFactor(val){
  ratioFactor = map(val, 1, 100, 0.1, 4);

  resetPop();
  coreSplode.refresh();
}

function toggleMousePop(){
  if(document.getElementById('mousePop').checked){
    mousePopOn = true;
  } else {
    mousePopOn = false;
  }
}

function toggleSpurMessy(){
  if(document.getElementById('messySpur').checked){
    spurMessyToggle = true;
  } else {
    spurMessyToggle = false;
  }

  resetPop();
  coreSplode.refresh();
}

function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function resetPop(){
  orgX = width/2;
  orgY = height/2;

  coreMousePop.refresh(orgX, orgY);
}

function setFont(val){
  fontSelect = val;

  findMaxSize();
  resetPop();
  coreSplode.refresh();
}

function runJPGsave(){
  save("STGpowStatic.jpg");
}

function setBlastType(val){
  blastType = val;

  if(val == 0){
    document.getElementById('cloudOption1').style.display = "flex";
    document.getElementById('spurOption1').style.display = "none";
  } else {
    document.getElementById('cloudOption1').style.display = "none";
    document.getElementById('spurOption1').style.display = "flex";
  }

  orgX = width/2;
  orgY = height/2;

  buildIt();
}

document.addEventListener('DOMContentLoaded', function () {
  const popupOverlay = document.getElementById('popupOverlay');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');
  const emailInput = document.getElementById('emailInput');
  // Function to open the popup

  function openPopup() {
    popupOverlay.style.display = 'block';
  }

  // Function to close the popup

  function closePopupFunc() {
    popupOverlay.style.display = 'none';
  }

  // openPopup();
  // Close the popup when the close button is clicked
  closePopup.addEventListener('click', closePopupFunc);
  // Close the popup when clicking outside the popup content
  popupOverlay.addEventListener('click', function (event) {
      if (event.target === popupOverlay) {
        closePopupFunc();
      }
  });
  // You can customize and expand these functions based on your specific requirements.
});

function runShare(){
  // print("SHARE IT!");
  // var thisURL = "https://spacetypegenerator.com/" + frameCount;
  createExportURL();
  var thisURL = exportURL;
  print(thisURL);

  if(qrcode != null){
    qrcode.clear();
    qrcode.makeCode(thisURL);
  } else {
    qrcode = new QRCode(document.getElementById("qrcode"), {
      text: thisURL,
      width: 200,
      height: 200,
      colorDark : "#000000",
      colorLight : "#ffffff",
    });
  }

  document.getElementById('popupOverlay').style.display = 'block';
}

function createExportURL(){
  var url = "https://spacetypegenerator.com/mm/present";    
  url = url.split('?')[0];

  var tempString = '';
  for(var m = 0; m < inputText.length; m++){
    tempString += inputText[m] + '_*_';
  }
  url += '?01=' + tempString;
  url += '&02=' + fontSelect;
  url += '&03=' + round(wWindowScale, 2);
  url += '&04=' + color(fillColor);
  url += '&05=' + color(bkgdColor);
  url += '&06=' + color(strokeColor);
  url += '&07=' + round(coreSW, 2);
  url += '&08=' + round(detailFactor, 2);
  url += '&09=' + round(blastFactor, 2);
  url += '&10=' + round(ratioFactor, 2);
  url += '&11=' + blastType;
  url += '&12=' + spurMessyToggle;
  url += '&13=' + saveMode;
    
  exportURL = url;
}