//////////////////////////////////////////////
/////////////////////////////       GRADIENTS
//////////////////////////////////////////////


//////////////////////////////////////////////
/////////////////////////////       foreground
//////////////////////////////////////////////


function drawGradient0(p){  
  var w = 500;
  var h = 500;

  pg[p] = createGraphics(w, h);
  pg[p].background(colorSet[0]);

  for(var m = 0; m <= h; m++){
    var gradColor;
    if(m < h/2){
      var lerper = map(m, 0, h/2, 0, 1);
      gradColor = lerpColor(colorSet[0], colorSet[1],lerper);
    } else {
      var lerper = map(m, h/2, h, 0, 1);
      gradColor = lerpColor(colorSet[1], colorSet[2],lerper);
    }

    pg[p].stroke(gradColor);
    pg[p].noFill();
    pg[p].line(0, m, w, m);
  }
}

function drawGradient1(p){  
  var w = 500;
  var h = 500;

  pg[p] = createGraphics(w, h);
  pg[p].background(colorSet[2]);

  for(var m = 0; m <= h; m++){
    var gradColor;

    var lerper = map(m, 0, h, 0, 1);
    gradColor = lerpColor(colorSet[2], colorSet[3], lerper);

    pg[p].stroke(gradColor);
    pg[p].noFill();
    pg[p].line(0, m, w, m);
  }
}

function drawGradient2(p){  
  var w = 500;
  var h = 500;

  pg[p] = createGraphics(w, h);
  pg[p].background(colorSet[4]);

  for(var m = 0; m <= h * 2; m++){
    var gradColor;

    var lerper = map(m, 0, h * 2, 0, 1);
    gradColor = lerpColor(colorSet[4], colorSet[5], lerper);

    pg[p].stroke(gradColor);
    pg[p].noFill();

    pg[p].push();
      pg[p].translate(0, m);
      pg[p].rotate(-PI/4);

      pg[p].line(0, 0, w * 2, 0);
    pg[p].pop();
  }
}

function drawGradient3(p){  
  var w = 500;
  var h = 500;

  pg[p] = createGraphics(w, h);
  pg[p].background(colorSet[2]);

  for(var m = 0; m <= w; m++){
    var gradColor;

    var lerper = map(m, 0, w, 0, 1);
    gradColor = lerpColor(colorSet[0], colorSet[3], lerper);

    pg[p].stroke(gradColor);
    pg[p].noFill();
    pg[p].line(m, 0, m, h);
  }
}

function drawRadialGradient(p){  

  pg[p] = createGraphics(width, height);
  pg[p].background(colorSet[0]);

  for(var m = 0; m < height; m++){
    var gradColor;
    if(m < height/2){
      var lerper = map(m, 0, height/2, 0, 1);
      gradColor = lerpColor(colorSet[0], colorSet[1],lerper);
      wRad = map(lerper, 0, 1, width, width/2);
      hRad = map(lerper, 0, 1, height, height/2);
    } else {
      var lerper = map(m, height/2, height, 0, 1);
      gradColor = lerpColor(colorSet[1], colorSet[2],lerper);
      wRad = map(lerper, 0, 1, width/2, 0);
      hRad = map(lerper, 0, 1, height/2, 0);
    }

    pg[p].noStroke();
    pg[p].fill(gradColor);
    pg[p].ellipse(width/2, height/2, wRad, hRad);
  }
}



//////////////////////////////////////////////
/////////////////////////////       bkgdGround
//////////////////////////////////////////////



function drawBkgdGradient0(p){  
  var w = width;
  var h = height;

  pgBkgd[p] = createGraphics(w, h);
  pgBkgd[p].background(colorSet[0]);

  for(var m = 0; m <= h; m++){
    var gradColor;
    if(m < h/2){
      var lerper = map(m, 0, h/2, 0, 1);
      gradColor = lerpColor(colorSet[0], colorSet[2],lerper);
    } else {
      var lerper = map(m, h/2, h, 0, 1);
      gradColor = lerpColor(colorSet[2], colorSet[4],lerper);
    }

    pgBkgd[p].stroke(gradColor);
    pgBkgd[p].noFill();
    pgBkgd[p].line(0, m, w, m);
  }
}

function drawBkgdGradient1(p){  
  var w = width;
  var h = height;

  pgBkgd[p] = createGraphics(w, h);
  pgBkgd[p].background(colorSet[2]);

  for(var m = 0; m <= h; m++){
    var gradColor;

    var lerper = map(m, 0, h, 0, 1);
    gradColor = lerpColor(colorSet[1], colorSet[5], lerper);

    pgBkgd[p].stroke(gradColor);
    pgBkgd[p].noFill();
    pgBkgd[p].line(0, m, w, m);
  }
}

function drawBkgdGradient2(p){  
  var w = width;
  var h = height;

  pgBkgd[p] = createGraphics(w, h);
  pgBkgd[p].background(colorSet[4]);

  for(var m = 0; m <= h * 3; m++){
    var gradColor;

    var lerper = map(m, 0, h * 3, 0, 1);
    gradColor = lerpColor(colorSet[5], colorSet[0], lerper);

    pgBkgd[p].stroke(gradColor);
    pgBkgd[p].noFill();

    pgBkgd[p].push();
    pgBkgd[p].translate(0, m);
    pgBkgd[p].rotate(-PI/4);

    pgBkgd[p].line(0, 0, w * 2, 0);
    pgBkgd[p].pop();
  }
}

function drawBkgdGradient3(p){  
  var w = width;
  var h = height;

  pgBkgd[p] = createGraphics(w, h);
  pgBkgd[p].background(colorSet[6]);

  for(var m = 0; m <= w; m++){
    var gradColor;

    var lerper = map(m, 0, w, 0, 1);
    gradColor = lerpColor(colorSet[6], colorSet[2], lerper);

    pgBkgd[p].stroke(gradColor);
    pgBkgd[p].noFill();
    pgBkgd[p].line(m, 0, m, h);
  }
}

function drawBkgdSolid0(p){  
  var w = width;
  var h = height;

  pgBkgd[p] = createGraphics(w, h);
  pgBkgd[p].background(bkgdColor);
}

function drawBkgdSolid1(p){  
  var w = width;
  var h = height;

  pgBkgd[p] = createGraphics(w, h);
  pgBkgd[p].background(foreColor);
}