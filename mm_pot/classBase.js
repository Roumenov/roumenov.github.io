class Base {
  constructor(coreNumber){
    this.coreNumber = coreNumber;
    this.lets = [];
    this.sprinkles = [];
    this.chunks = [];

    this.build();

    this.yMin = -pgTextSize * 0.7/2;
    this.yMax = pgTextSize * 0.7/2;
  }

  build(){
    for(var m = 0; m < inputText[this.coreNumber].length; m++){
      this.lets[m] = new Let(this.coreNumber, m);
      this.sprinkles[m] = new Sprinkle();
      this.chunks[m] = new Chunk(this.coreNumber, m);
    }
  }

  run(){
    culmLength[this.coreNumber] = 0;
    this.yMin = -pgTextSize * 0.7/2;
    this.yMax = pgTextSize * 0.7/2;

    for(var m = 0; m < this.lets.length; m++){
      this.lets[m].run();
      this.sprinkles[m].run();
      this.chunks[m].run();

      if(this.lets[m].yAnim - this.lets[m].h/2 < this.yMin){
        this.yMin = this.lets[m].yAnim - this.lets[m].h/2;
      }

      if(this.lets[m].yAnim + this.lets[m].h/2 > this.yMax){
        this.yMax = this.lets[m].yAnim + this.lets[m].h/2;
      }
    }

    // noFill();
    // strokeWeight(1);
    // stroke(0,0,255);
    // line(0,0, 100, 0);
    // stroke(255,0,0);
    // line(-500, this.yMin, 0, this.yMin);
    // line(-500, this.yMax, 0, this.yMax);
  }
}