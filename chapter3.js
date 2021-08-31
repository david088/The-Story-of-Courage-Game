// helper functions ////////////////////////////////////////////////////////////
function resetBackground3(color){
  background(color);
}
function printChapter3(){
  textAlign(CENTER, CENTER)
  stroke("orange");
  fill("white");
  textSize(100);
  text("CHAPTER 3", width*0.5, height*0.5);
}
function drawGround3() {
  rectMode(CORNER);
  stroke(0,72,216);
  strokeWeight(3);
  fill("black");
  rect(-5, 380, 810, 125);
}

// draw MC /////////////////////////////////////////////////////////////////////
var mainX3 = 400, mainCH3 = 380, mainH3 = 60;
var mainSpeed3 = 3, mainStroke3, mainColor3, mainStrokeW3;
var isSad = 1;
function drawMC3(){
  if (isSad){
    mainStroke3 = color("black");
    mainStrokeW3 = 1;
  } else {
    mainStroke3 = color(random(255), random(255),random(255));
    mainStrokeW3 = 3;
  }
  mainColor3 = color(239,176,28);
  stroke(mainStroke3);
  fill(mainColor3);
  strokeWeight(mainStrokeW3);
  ellipse(mainX3, mainCH3-(mainH3/2), 50, mainH3);
  if (isSad){
    strokeWeight(2);
    line(mainX3-5, mainCH3-(mainH3*2/3), mainX3-15, mainCH3-(mainH3*2/3)+5);
    line(mainX3+5, mainCH3-(mainH3*2/3), mainX3+15, mainCH3-(mainH3*2/3)+5);
  } else {
    fill("white")
    circle(mainX3-10, mainCH3-(mainH3*2/3), 15);
    circle(mainX3+10, mainCH3-(mainH3*2/3), 15);
    line(mainX3-3, mainCH3-(mainH3*2/3), mainX3-15, mainCH3-(mainH3*2/3)-8);
    line(mainX3+3, mainCH3-(mainH3*2/3), mainX3+15, mainCH3-(mainH3*2/3)-8);
    fill("black")
    circle(mainX3-10, mainCH3-(mainH3*2/3)-1, 5);
    circle(mainX3+10, mainCH3-(mainH3*2/3)-1, 5);
  }
  
  
  
  
}

// chapter 3 ///////////////////////////////////////////////////////////////////
var chaThreeFrame = 0, canChooseMid = 0, noGUFrame = 0; 

function chapter3(){
  // generate the eye and textBox data at the beginning
  if (chaThreeFrame <= 1){
    genEyePos3();
    genTextBox3();
  }
  
  // draw background
  if (chaThreeFrame <= 150){ // CHANGE IT TO 150 LATER
    resetBackground3(color("black"));
    printChapter3();
  } else {
    resetBackground3(color(202,202,202));
    
    // draw MC
    drawMC3();
    
    // draw dark shadow
    if (isSad)
      shadowControl3();
    
    // character text boxes
    if (chaThreeFrame > 190 && chaThreeFrame <= 290) { // CHNAGE TO 190 / 270
      rectMode(CENTER);
      strokeWeight(1);
      fill("white");
      rect(width*0.5, height*0.6-50, 170, 100, 25);
      textControl3(1, width*0.5, height*0.6-50);
      
    } else if (chaThreeFrame > 290) { // CHNAGE To 290
      
      // generate eyes and textboxes  
      if (chaThreeFrame % 60 == 0){
        genEyePos3();
        genTextBox3();
      }
      eyeControl3();
    }
    
    // draw ground
    drawGround3();
    
    // print extra text
    if (chaThreeFrame > 420 && numEyes >= 0){
      textAlign(CENTER);
      if (numTap > 50)
        stroke(random(255), random(255), random(255));
      else 
        stroke(eyeStroke[0]);
      text("LooKLooKLooKLooKLooKLooK", width*0.15+20, 400);
      text("LooKLooKLooKLooKLooKLooK", width-140, 400);
    }
    
    if (chaThreeFrame > 420) { // CHNAGE To 290
      // show choice
      canChooseMid = 1;
      choiceControl3();
    }
    
    
    if (noGUFrame > 150){
      mainCH3 -= (mainCH3 <= -10)?0:5;
      if (mainCH3 <= -10)
        endChapter = 1;
    }
  }
  
  
  
  // frame control
  chaThreeFrame++;
}

// choice control //////////////////////////////////////////////////////////////
var numTap = 0, midClicked = 0, boxStroke3 = 3;
var midBox3;
function choiceControl3(){
  // handle choices
  if (mouseX > width*0.5-100 && mouseX < width*0.5+100 && mouseY > 380+60-45 && mouseY < 380+60+45){
    if (numTap > 15 && numTap <= 30) {
      midBox = color("blue");
      
    } else if (numTap > 30 && numTap <= 50) {
      midBox = color("red");
      
    } else if (numTap > 50 ) {
      midBox = color(random(255), random(255),random(255));
      
    } else {
      midBox = color("orange");
    }
    
    if (midClicked){
      numTap++;
      midClicked = 0;
    }
  } else {
    midBox = color("white");
  }
  
  // choice
  fill("white");
  strokeWeight(boxStroke3);
  stroke(midBox);
  textAlign(CENTER);
  rectMode(CENTER);
  rect(width*0.5, 380+60, 200, 90);
  noStroke();
  if (isSad){
    textSize(10);
    fill("red");
    text("keep clicking this button", width*0.5, 380+100);
    textSize(20);
  }
  if (numTap <= 15){
    fill("orange");
    text("I should give up", width*0.5, 380+60);
  } else if (numTap > 15 && numTap <= 30) {
    fill("blue");
    boxStroke3 = 5;
    numEyes = 20;
    text("? Should I Give Up ?", width*0.5, 380+60);  
  } else if (numTap > 30 && numTap <= 50) {
    fill("red");
    boxStroke3 = 7;
    numEyes = 10;
    text("I Don't Want To\nGive Up", width*0.5, 380+60);    
  } else if (numTap > 50 ) {
    isSad = 0;
    numEyes = 0;
    boxStroke3 = 9;
    //midBox = color(random(255), random(255),random(255));
    fill(random(255), random(255),random(255));
    text("! I WON'T GIVE UP !", width*0.5, 380+60);
    noGUFrame++;
  }
    
}

// eye data control /////////////////////////////////////////////////////////////////
var eyeX = [], eyeY = [], eyeStroke = []
var eyeBallX = [], eyeBallY = [];
var eyeW = 60, eyeH = 50;
var numEyes = 30;
function genEyePos3(){
  for (var i = 0; i < numEyes; i ++){
    if (i % 2 == 0){
      eyeX[i] = random(20, 240);
      eyeY[i] = random(10, 340);
      eyeStroke[i] = color(random(255), random(255), random(255));
      eyeBallX[i] = eyeX[i]+10;
      eyeBallY[i] = eyeY[i]+10;
    } else {
      eyeX[i] = random(width-240, width-20);
      eyeY[i] = random(10, 340);
      eyeStroke[i] = color(random(255), random(255), random(255));
      eyeBallX[i] = eyeX[i]-10;
      eyeBallY[i] = eyeY[i]+10;
    }
  }
}

// text Box control ////////////////////////////////////////////////////////////
var tBoxX = [],  tBoxText = [];
var tBoxW = 130, tBoxH = 70;
var tBoxY = [];
function genTextBox3(){
  for (var t = 0; t < 10; t++){
    if (t % 2 == 0){
      tBoxX[t] = random(0, 300);
      tBoxY[t] = int(random(30, 380));
    } else {
      tBoxX[t] = random(width*0.5+80, width);
      tBoxY[t] = int(random(30, 380));
    }
    
    tBoxText[t] = int(random(2, 6));
  }
}


// draw eye n textBoxes /////////////////////////////////////////////////////////////
function eyeControl3(){
  for (var j = 0; j < numEyes; j++){
    stroke(eyeStroke[j]);
    fill(145,145,145);
    arc(eyeX[j], eyeY[j], eyeW, eyeH, 0, PI);
    fill("black");
    circle(eyeBallX[j], eyeBallY[j], 10);
    
    if (j <= 9){
      rectMode(CENTER);
      rect(tBoxX[j], tBoxY[j], tBoxW, tBoxH);
      textControl3(tBoxText[j], tBoxX[j], tBoxY[j]);
    }
  }
  
  
  
  
}

// text control ////////////////////////////////////////////////////////////////
function textControl3(num, xC, yC){
  textSize(20);
  noStroke();
  switch (num) {
    case 1:
      fill("black")
      text("I failed...\nI want to give up", xC, yC)
      break;
    case 2:
      fill("white")
      text("YOU SUCKS", xC, yC)
      break;
    case 3:
      fill("white")
      text("LOSER", xC, yC)
      break;
    case 4:
      fill("white")
      text("QUIT NOW", xC, yC)
      break;
    case 5:
      fill("white")
      text("YOU NEVER\nSUCCESS", xC, yC)
      break;
    case 6:
      break;
  }
}

// draw dark shadow ////////////////////////////////////////////////////////////
function shadowControl3(){
  rectMode(CENTER)
  noStroke();
  fill(0,0,0,200)
  rect(140, height*0.4-10, 280, 380)
  rect(width-140, height*0.4-10, 280, 380)
}

// chapter control /////////////////////////////////////////////////////////////
var endChapter = 0;
function chapter3Control(){
  if (endChapter)
    chapter4Control();
  else 
    chapter3();
}






