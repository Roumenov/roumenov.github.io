//////////////////////////////////////////////
/////////////////////////////       GRADIENTS
//////////////////////////////////////////////

function drawGradient(p){   // straight text

  pg[p] = createGraphics(width, height);
  pg[p].background(colorSet[0]);

  for(var m = 0; m < height; m++){
    var gradColor;
    if(m < height/2){
      var lerper = map(m, 0, height/2, 0, 1);
      gradColor = lerpColor(colorSet[0], colorSet[1],lerper);
    } else {
      var lerper = map(m, height/2, height, 0, 1);
      gradColor = lerpColor(colorSet[1], colorSet[2],lerper);
    }

    pg[p].stroke(gradColor);
    pg[p].noFill();
    pg[p].line(0, m, width, m);
  }
}

function drawRadialGradient(p){   // straight text

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