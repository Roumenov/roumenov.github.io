class Base {
  constructor(coreNumber){
    this.coreNumber = coreNumber;
    this.lets = [];

    this.build();
  }

  build(){
    for(var m = 0; m < inputText[this.coreNumber].length; m++){
      var nextW = textWidth(inputText[this.coreNumber].substring(0, m + 1));
      var thisW = textWidth(inputText[this.coreNumber].charAt(m));
      
      // if(this.coreNumber == 0 && m == 0){
      //   print("NextW: " + nextW + " and thisW: " + thisW);
      // }

      var x = nextW - thisW;
      var y = this.coreNumber * pgTextSize * tFontFactor[selFont];
      
      x -= (textWidth(inputText[this.coreNumber]) + (inputText[this.coreNumber].length - 1) * tracking)/2;
      x += (m - 1) * tracking;
      y -= -pgTextSize * tFontFactor[selFont] + inputText.length * pgTextSize * tFontFactor[selFont]/2;

      this.lets[m] = new Let(x, y, this.coreNumber, m);
    }
  }

  run(){
    xCulm[this.coreNumber] = 0;
    for(var m = 0; m < this.lets.length; m++){
      this.lets[m].run();
    }
  }

  displayBkgd(){
    for(var m = 0; m < this.lets.length - 1; m++){
      if(this.lets[m].l == " "){
        // DO NOTHING
      } else if(this.lets[m + 1].l == " " && m + 2 < this.lets.length){
        this.lets[m].displayBkgd(m + 2);
      } else {
        this.lets[m].displayBkgd(m + 1);
      }
    }
  }

  displayDebug(){
    for(var m = 0; m < this.lets.length; m++){
      this.lets[m].displayDebug();
    }
  }
}