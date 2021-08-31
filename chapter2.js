function resetBackground(){
  if (restLife > 50)
    background(0,42,127);
  else
    background(91,0,0);
}
function printChapter(){
  strokeWeight(3);
  stroke("orange");
  fill("white");
  textSize(100);
  textAlign(CENTER, CENTER); // CONTAINED IN CHAPTER 1!!!!
  text("CHAPTER 2", width*0.5, height*0.5);
  
  textSize(20);
  fill("black");
  strokeWeight(1);
}
function drawGround() {
  rectMode(CORNER);
  stroke("white");
  strokeWeight(3);
  fill("black");
  rect(-5, 380, 810, 125);
}

// main character
var mainX2 = 400, mainCH2 = -10, mainH2 = 60;
var mainSpeed2 = 3, mainStroke2, mainColor2;
var toPos = 0;
function drawMC(){
  mainStroke2 = color("black");
  mainColor2 = color(239,176,28);
  stroke(mainStroke2);
  fill(mainColor2);
  strokeWeight(1);
  ellipse(mainX2, mainCH2-(mainH2/2), 50, mainH2);
  
  // looking up
  noStroke();
  fill("white");
  circle(mainX2-10, mainCH2-10-(mainH2/2), 15);
  circle(mainX2+10, mainCH2-10-(mainH2/2), 15);
  fill("black");
  circle(mainX2-10, mainCH2-13-(mainH2/2), 8);
  circle(mainX2+10, mainCH2-13-(mainH2/2), 8);
  
  if (mainCH2 < 380 && !toPos)
    mainCH2 += mainSpeed2;
  else
    toPos += (toPos>30)?0:1;
}

// text control ////////////////////////////////////////////////////////////////
function textControl(num, xC, yC){
  switch(num) {
    case 1:
      text("FAILURE", xC, yC);
      break;
    case 2:
      text("LACK OF\nKNOWLEDGE", xC, yC);
      break;
    case 3:
      text("FEAR", xC, yC);
      break;
    case 4:
      text("LOW\nSLEF-CONFIDENCE", xC, yC);
      break;
    case 5:
      text("CHALLENGES", xC, yC);
      break;
    case 6:
      test("PRESSURE", xC, yC);
      break;
  }
}

// random object
var numRandom = 100;
var objColor;
var objX = [],objY = [],objW = [], objH = [], objStroke = [], objTextColor = [];
var objText = [], objFallSpeed = [];
var energyColor;

function genObj(){
  objColor = color("black");
  for (var i = 0; i < numRandom; i++){
    //if (i % 420 == 0){
    objW[i] = random(110,150);
    objH[i] = random(50, 70);
    objX[i] = random(0, width-100);
    objY[i] = -10;
    objText[i] = int(random(1,6));
    objFallSpeed[i] = random(1.5, 3.5);
    objStroke[i] = color(random(255), random(255), random(255));
    objTextColor[i] = color(random(255), random(255), random(255));
  }
}

function drawObj(){
  for (var j = 0; j < numRandom; j++){
    //if (j % 420 == 0){
      stroke(objStroke[j]);
      fill("black")
      rect(objX[j], objY[j], objW[j], objH[j]);
      
      noStroke();
      textSize(15);
      fill(objTextColor[j]); // fill(random) to strok so looks strong
      textControl(objText[j], objX[j]+objW[j]/2, objY[j]+objH[j]/2);
      
    
    if (objY[15]>= height){
      objFallSpeed[j] = 2;
      objY[j] += (objY[j] >= height)?0:objFallSpeed[j];
    } else {
      if (j == 0)
        objY[j] += (objY[j] >= height)?0:objFallSpeed[j];
      else {
        if (objY[j-1] - objY[j] > 100)
          objY[j] += (objY[j] >= height)?0:objFallSpeed[j];
        else if (objY[j-1] >= height)
          objY[j] += (objY[j] >= height)?0:objFallSpeed[j];
        
      }
      // else if (j%2)
      //   objY[j] += (objY[j] >= height)?0:objFallSpeed[j];
    } 
    
    strokeWeight(3);
    stroke("black");
    // line(mainX2-15, mainCH2-(mainH2/2)-15,mainX2+15,mainCH2-(mainH2/2)-15);
    // line(mainX2-15, mainCH2-(mainH2/2)-15,mainX2-15,mainCH2-(mainH2/2)+15);
    // line(mainX2+15, mainCH2-(mainH2/2)-15,mainX2+15,mainCH2-(mainH2/2)+15);
    // line(mainX2-15, mainCH2-(mainH2/2)+15,mainX2+15,mainCH2-(mainH2/2)+15);
    
    if ( (mainX2-15 < objX[j]+objW[j]/2 && mainX2-15 > objX[j]-objW[j]/2 &&
        mainCH2-(mainH2/2)-15 < objY[j]+objH[j]/2 && mainCH2-(mainH2/2)-15 > objY[j]-objH[j]/2) || (mainX2+15 < objX[j]+objW[j]/2 && mainX2+15 > objX[j]-objW[j]/2 &&
        mainCH2-(mainH2/2)-15 < objY[j]+objH[j]/2 && mainCH2-(mainH2/2)-15 > objY[j]-objH[j]/2) ){
      restLife -= 1;
    }
    
  }
}

function checkCollusion(){
  fill("green");
  noStroke();
  if (restLife > 50){
    energyColor = color("green");
  } else {
    energyColor = color("red");
  }
  fill(energyColor);
  textSize(15);
  text("Energy Level:", 50, 400);
  textSize(80);
  if (restLife < 0){
    text("FAILED", width*0.5, 450);
    FAILED++;
  } else
    text(restLife, 100, 450);
}

// timer var
var timer = 5, restLife = 100;

// control var
var canControl = 0, FAILED = 0;

// handle chapter 2 animation //////////////////////////////////////////////////
function chapter2(){
  // reset background 
  resetBackground();

  if (chaTwoFrame <= 3){
    // generate random object
    genObj();
  }
  
  // print chapter title for 100 frames 
  if (chaTwoFrame <= 150)
    printChapter();
  
  else if (FAILED < 150) { // draw the rest of stuff 
    // draw main character and movement control
    drawMC();
    
    if (toPos > 20 && timer >= 0){
      stroke("orange");
      strokeWeight(1);
      fill("yellow");
      textSize(60);
      text("!Show Me What You Got!",width*0.5, height*0.1);
      textSize(120);
      text(timer, width*0.5, height*0.25);
      if (timer >= 0 && frameCount % 60 == 0)
        timer--;
      
    } else if (toPos > 20 && timer == -1){
      canControl = 1;
    }
    
    if (canControl && FAILED < 150){
      keyControl();
      drawObj();
      
    }
    
    // draw ground 
    drawGround();
    
    if (toPos > 20 && timer >= 0){
      textSize(35);
      fill("green");
      noStroke();
      text("Use [Left_Arrow_Key] and [Right_Arrow_Key]\nTo Control Character Dodging Falling Objects", width*0.5, 450);
    }
    
    if (canControl){
      checkCollusion();
    }
  }
  
  // ending chapter 2
  if (FAILED >= 150)
    chapter3Start = 1;
  
  // frame control for chapter 2
  chaTwoFrame++;
}

// key control /////////////////////////////////////////////////////////////////
function keyControl(){
  if (keyIsDown(LEFT_ARROW)){
    //if (!keyReleased)
      mainX2 -= (mainX2-25 <= 0)?0:5;
  }
  if (keyIsDown(RIGHT_ARROW)){
    //if (!keyReleased)
      mainX2 += (mainX2+25 >= width)?0:5;
  }
}

// chapter 3 variables /////////////////////////////////////////////////////////
var chapter3Start = 0, chaTwoFrame = 0;

function chapterControl2(){
  print(chapter3Start);
  // if chapter 2 ends, chapter 3 
  if (chapter3Start){
    chapter3Control();
  } else
    chapter2();
}




