function setText(){
  var enteredText = document.getElementById("text0").value;
  
  inputText = enteredText.match(/[^\r\n]+/g);

  if(enteredText == ""){
    print("SHORT EXECUTED! and inputText is " + inputText);
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
  var heightTest = (height - 50);
  let holdH = inputText.length * sizeHolder * pgTextFactor[fontSelect];
  while(holdH > heightTest){
    holdH = inputText.length * sizeHolder * pgTextFactor[fontSelect];
    sizeHolder -= 2;
  }
  pgTextSize = sizeHolder;
}


function setwWindowScale(val){
  wWindowScale = map(val, 0, 100, 0, 1);
  print("wWindowScale: " + wWindowScale);

  wWindow = map(wWindowScale, 0, 1, wWindowMin, wWindowMax);
  findMaxSize();
  createAnimation();
}

function setFont(val){
  fontSelect = [val];

  findMaxSize();
  createAnimation();
}

// function setPGtextSize(val){
//   pgTextSize = map(val, 0, 100, 10, 200);

//   createAnimation();
// }

function setStageAlength(val){
  stageA = round(map(val, 0, 100, 1, 200));
}

function setStageAdirect(val){
  stageAdirect = val;
}

function setStageAstrength(val){
  stageAstrength = val;
}

function setStageBlength(val){
  stageB = round(map(val, 0, 100, 1, 200));
}

function setStageBdirect(val){
  stageBdirect = val;
}

function setStageBstrength(val){
  stageBstrength = val;
}

function setStageClength(val){
  stageC = round(map(val, 0, 100, 1, 200));
}

function setOffsetCenter(val){
  offsetCenter = val;

  createAnimation();
}

function setOffsetAmount(val){
  offsetAmount = map(val, 0, 100, -100, 100);

  createAnimation();
}

function sizeSaveChange(val){
  saveMode = val;
  resizeForPreview();
}

function setForeColor(val){ foreColor = val; }
function setBkgdColor(val){ bkgdColor = val; }
function setAccentColor(val){ accentColor = val; }

// document.addEventListener('DOMContentLoaded', function () {
//   const popupOverlay = document.getElementById('popupOverlay');
//   const popup = document.getElementById('popup');
//   const closePopup = document.getElementById('closePopup');
//   const emailInput = document.getElementById('emailInput');
//   // Function to open the popup

//   function openPopup() {
//     popupOverlay.style.display = 'block';
//   }

//   // Function to close the popup

//   function closePopupFunc() {
//     popupOverlay.style.display = 'none';
//   }

//   // openPopup();
//   // Close the popup when the close button is clicked
//   closePopup.addEventListener('click', closePopupFunc);
//   // Close the popup when clicking outside the popup content
//   popupOverlay.addEventListener('click', function (event) {
//       if (event.target === popupOverlay) {
//         closePopupFunc();
//       }
//   });
//   // You can customize and expand these functions based on your specific requirements.
// });

// function runShare(){
//   // print("SHARE IT!");
//   // var thisURL = "https://spacetypegenerator.com/" + frameCount;
//   createExportURL();
//   var thisURL = exportURL;
//   print(thisURL);

//   if(qrcode != null){
//     qrcode.clear();
//     qrcode.makeCode(thisURL);
//   } else {
//     qrcode = new QRCode(document.getElementById("qrcode"), {
//       text: thisURL,
//       width: 200,
//       height: 200,
//       colorDark : "#000000",
//       colorLight : "#ffffff",
//     });
//   }

//   document.getElementById('popupOverlay').style.display = 'block';
// }

// function createExportURL(){
//   var url = "https://spacetypegenerator.com/mmPotpourri/present";    
//   url = url.split('?')[0];

//   var tempString = '';
//   for(var m = 0; m < inputText.length; m++){
//     tempString += inputText[m] + '_*_';
//   }
//   url += '?01=' + tempString;
//   url += '&02=' + fontSelect;
//   url += '&03=' + round(wWindowScale, 2);
//   url += '&04=' + color(foreColor);
//   url += '&05=' + color(bkgdColor);
//   url += '&06=' + color(accentColor);
//   // url += '&07=' + round(coreSWfac, 2);
//   // url += '&08=' + round(detailFactor, 2);
//   // url += '&09=' + round(blastFactor, 2);
//   // url += '&10=' + round(ratioFactor, 2);
//   // url += '&11=' + blastType;
//   // url += '&12=' + spurMessyToggle;
//   // url += '&13=' + saveMode;
    
//   exportURL = url;
// }