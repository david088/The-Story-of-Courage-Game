function resetBackground4(color){
  background(color);
}
function printChapter4(){
  textAlign(CENTER, CENTER)
  stroke("orange");
  fill("white");
  textSize(100);
  text("CHAPTER 4", width*0.5, height*0.5);
}

// courage words
var words4;
function genWords4(){
  //words4 = []
}

// chapter 4 control function ////////////////////////////////////////////////
var chaFourFrame = 0, starTBFrame = 0;
function chapter4(){
  resetBackground4("black");
  
  if (chaFourFrame <= 1){
    mainStroke4 = color(random(255), random(255),random(255));
    genBubble();
    genTBubble();
  }
  
  drawBubble();
  
  if (chaFourFrame <= 150){ //150
    printChapter4();
  } else {
    drawMC4();
    
    if (chaFourFrame > 150 && chaFourFrame <= 600){
      rectMode(CENTER);
      fill(81,81,81);
      strokeWeight(3);
      stroke("orange");
      rect(width*0.5, height*0.1, 700, 80, 20);
      textSize(20);
      noStroke();
      fill("yellow");
      text("Star: I am glad that you bounced back after that failed attemp!\nHere are my final 5 tips. Best of luck. Come claim your success!",width*0.5, height*0.1);
      
    } else {
      // set a time for it to appear after star spoke
      textBubbleControl();
      
      if (numTBGone < 5){
        strokeWeight(1);
        stroke("white");
        fill("black");
        rect(width*0.5, 480, 700, 40, 20);
        textSize(15);
        noStroke();
        fill("white");
        text("Click on Bubbles to Shows Text. Click Twice to Cancel Bubble. Read then Clear All Bubbles!", width*0.5, 480);
      }
    }
    // if all 5 boxes are gone
    if (numTBGone >= 5){
      starControl4();
      starTBFrame++;
    }
    
    if (starTBFrame >= 120){
      mainHLimit -= (mainHLimit <= -90)?0:2;
      if (mainHLimit <= starHLimit){
        starHLimit -= (starHLimit <= -90)?0:2;
      }
    }
    
    if (starHLimit <= -90){
      endChapter4 = 1;
    }
      
    
  }
  
  if (mainX4>=450) {
    mainSpeed4 = -mainSpeed4;
  } else if (mainX4<=350) {
    mainSpeed4 = -mainSpeed4;
  }
  mainX4 += mainSpeed4;
  chaFourFrame++;
}

// text bubble control ///////////////////////////////////////////////////////
var numTBClicked = 0, numTB = 5;
var tbList = [], numTBGone = 0;
function textBubbleControl(){
  var tempGone = 0;
  for (var t = 0; t < numTB; t++){
    tbList[t].showTB();
    tbList[t].tbMoves();
    if (tbList[t].getClicked() >= 2){
      tempGone++;
    }
  }
  numTBGone = tempGone;
}

function genTBubble(){
  
  var r = 50;
  var s = color("orange");
  var c = color("yellow");
  var x, y;
  
  x = 110;
  y = 150;
  let tbb1 = new textBubble(x, y, r, s, c, 25, "#1", "Face Your\nFears of Failure");
  x = 130;
  y = 375;
  let tbb2 = new textBubble(x, y, r, s, c, 25, "#2", "Always Learn\nFrom Mistakes");
  x = 400;
  y = 110;
  let tbb3 = new textBubble(x, y, r, s, c, 25, "#3", "Persistence\nand\nCourage");
  x = 625;
  y = 200;
  let tbb4 = new textBubble(x, y, r, s, c, 20, "#4", "Set goals for youself\nand try your best to\nachieve them");
  x = 650;
  y = 380;
  let tbb5 = new textBubble(x, y, r, s, c, 20, "#5", "The only person who\ncan stop you from\ngoing forward\nis yourself");
  tbList.push(tbb1);
  tbList.push(tbb2);
  tbList.push(tbb3);
  tbList.push(tbb4);
  tbList.push(tbb5);

}

// bubble class ////////////////////////////////////////////////////////
class textBubble {
  constructor(x, y, r, s, c, size, t, a){
    this.x = x;
    this.y = y;
    this.r = r;
    this.s = s;
    this.c = c;
    this.size = size;
    this.t = t; // text shown
    this.a = a; // answer
    this.timeC = 0;
    this.showA = 0;
  }
  
  classClicked(mx, my){
    
    var dis = dist(mx, my, this.x, this.y);
    if (dis <= this.r){
      this.r = 120;
      this.timeC++;
    }
    
  }
  
  showTB(){
    
    if (this.timeC < 2){
      strokeWeight(3);
      stroke(this.s);
      fill(81,81,81);
      circle(this.x, this.y, 2*this.r);
    }
    noStroke();
    fill(this.c);
    if (this.timeC == 0){
      textSize(30);
      text(this.t, this.x, this.y);
    } else if (this.timeC == 1){
      textSize(this.size);
      text(this.a, this.x, this.y);
    }
  }
  
  tbMoves(){
    this.x = this.x + random(-0.5, 0.5);
  }
  
  getClicked(){
    return this.timeC;
  }
  
}


// MC control /////////////////////////////////////////////////////////////////
var mainX4 = 400, mainCH4 = 530, mainH4 = 60;
var mainSpeed4 = 1, mainStroke4, mainColor4, mainStrokeW4 = 3;
var mainHLimit = 320, starHLimit = 200;
function drawMC4(){
  if (chaFourFrame % 50 == 0){
    mainStroke4 = color(random(255), random(255),random(255));
  }
  
  // red bull gives u wings
  redBull();
  
  // MC
  mainColor4 = color(239,176,28);
  stroke(mainStroke4);
  fill(mainColor4);
  strokeWeight(mainStrokeW4);
  ellipse(mainX4, mainCH4, 50, mainH4);
  noStroke();
  fill("white")
  circle(mainX4-10, mainCH4-12, 15);
  circle(mainX4+10, mainCH4-12, 15);
  fill("black");
  circle(mainX4-10, mainCH4-15, 8);
  circle(mainX4+10, mainCH4-15, 8);
  fill("white");
  circle(mainX4-8, mainCH4-15, 3);
  circle(mainX4+12, mainCH4-15, 3);
  stroke("black");
  fill(mainColor4);
  strokeWeight(2);
  arc(mainX4, mainCH4, 10,10,0,PI);
  
  noStroke();
  fill(mainStroke4);
  circle(mainX4, mainCH4+50, 20);
  circle(mainX4, mainCH4+70, 10);
  circle(mainX4, mainCH4+85, 5);
  
  // control the height it goes to!! CAN CHANGE THE HEIGHT LIMIT
  mainCH4 -= (mainCH4 <= mainHLimit)?0:2;
  
}

// star control ///////////////////////////////////////////////////////////////
function starControl4(){
  stroke("black");
  strokeWeight(2);
  stroke(255,154,0);
  translate(width * 0.5, starHLimit);
  rotate(frameCount / -100.0);
  fill("yellow")
  star(18,30,5);
  translate(width * 0.008, height * 0.08);
  star(5,8,5);
  translate(-45, -50)
  star(5,8,5);
  translate(63, -20)
  star(5,8,5);
}

// wings control 
function redBull(){
  // wings
  stroke(mainStroke4);
  fill(210,253,255, 127);
  translate(mainX4, mainCH4)
  rotate(PI/5);
  ellipse(-20, 20, 20, 50);
  rotate(PI/5);
  ellipse(-10, 30, 20, 50);
  rotate(PI/5);
  ellipse(-10, -30, 20, 50);
  rotate(PI/5);  
  ellipse(-20, -20, 20, 50);
  
  for (var w = 0; w < 6; w++){
    rotate(PI/5);
  }
  translate(-mainX4, -mainCH4)
}

// background bubble /////////////////////////////////////////////////////
var bubbleX = [], bubbleY = [], bubbleSize = [];
var bubbleR = [], bubbleG = [], bubbleB = [], bubbleF = [];
var numBubble = 1000, bubbleFallSpeed = 1.5;
function genBubble() {
  for (var b = 0; b < numBubble; b++){
    bubbleX[b] = random(0, width);
    bubbleY[b] = -20;
    bubbleSize[b] = int(random(8, 20));
    bubbleR[b] = random(0, 255);
    bubbleG[b] = random(0, 255);
    bubbleB[b] = random(0, 255);
    bubbleF[b] = random(100, 180);
  }
}

function drawBubble() {
  for (var d = 0; d < numBubble; d++){
    noStroke();
    fill(bubbleR[d], bubbleG[d], bubbleB[d], bubbleF[d]);
    circle(bubbleX[d], bubbleY[d], bubbleSize[d]);
  
    if (d == 0){
      bubbleY[d] += (bubbleY[d] >= height+20)? 0 : bubbleFallSpeed;
    
    } else {
      if (bubbleY[d-1] - bubbleY[d] > 10){
        bubbleY[d] += (bubbleY[d] >= height+20)? 0 : bubbleFallSpeed;
    
      }else if (bubbleY[d-1] >= height+20){
        bubbleY[d] += (bubbleY[d] >= height+20)? 0 : bubbleFallSpeed;
      }
      
      if (bubbleY[999] >= height+20) {
        genBubble();
      }
      
    }
    
  } // end for
}
// mosue pressed /////////////////////////////////////////////////////////
function mousePressed(){
  
  if ((mouseX > 50 && mouseX < 350 && mouseY > 390 && mouseY < 490 && showChoice) || (mouseX > 450 && mouseX < 750 && mouseY > 390 && mouseY < 490 && showChoice)){
    boxClicked = 1;
  } else 
    boxClicked = 0;
  
  if (mouseX > width*0.5-100 && mouseX < width*0.5+100 && mouseY > 380+60-45 && mouseY < 380+60+45 && canChooseMid){
    midClicked = 1;
  }
  else 
    midClicked = 0;
  
  for (var p = 0; p < numTB; p++){
    tbList[p].classClicked(mouseX, mouseY);
  }
}


// chapter control var ///////////////////////////////////////////////////
var endChapter4 = 0;
function chapter4Control() {
  if (endChapter4)
    endingControl();
  else
    chapter4();
}