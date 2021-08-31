// moving characters var
var numWalk = 50, walkW = 50
var walkSpeed = [], walkH = [], walkStroke = [], walkX = []

// main character / sub character
var mainX, mainSpeed, mainH = 60;
var mainStroke, mainColor;

// color var
var personColor;

// number var
var roundNum = 0;

// translation var
var translateX = 0;

// load image
let img, img2;
function preload(){
  img = loadImage("images/Hand2.png");
  img2 = loadImage("images/Ladder.png");
}

// initalization function
function setup() {
  createCanvas(800,500);
  
  // color initialization
  personColor = color(118,78,119);
  mainStroke = color("black")
  mainColor = color(239,176,28);
  
  // initalize the arraies
  for (var a = 0; a < numWalk; a++){
    
    // fill the starting X-coordinate and moving speed
    if (a % 2 == 0){ // from left side
      walkX[a] = random(-20, -1000);
      walkSpeed[a] = random(1.5, 1.8);
    
    } else {         // from right side
      walkX[a] = random(820, 1800);
      walkSpeed[a] = random(-1.5, -1.8);
    }
    
    // generate random height
    walkH[a] = random(50, 80); 
    
    // generate random stroke color
    walkStroke[a] = color(random(255),random(255), random(255));
    
    // main character var
    mainX = -500;
    mainSpeed = 1;
    
  }
  
  
}
// frame var
var midFrame = 0, stillWalking = 1, textFrame = 0;
var doneFrame = 0;
// choice var
var showChoice = 0, resChoice = -1;
var yesBox, noBox, boxClicked, showVoice = 1, showStar = 0;

// star var
var starY = -50, starSpeed = 1, goingDown = 1;

// hand var
var handX = -300, handSpeed = 2, showHand = 1;
var ladderX = handX, ladderSpeed = handSpeed;
var readyUp = 0, mainConstH = 380;

// chapter var
var chapter2Start = 0; // TODO: SET BACK TO 0 TO RUN CH ONE

// draw on the canvas
function draw() {
  if (doneFrame >= 100){
    chapter2Start = 1;
    clear();
    background(121,128,175);
  } else {
    background(121,128,175);
  }
  
  //print("it is: ", chapter2Start, " at ", doneFrame);
  if (failAttemp){
    badEndControl();
  } else if (chapter2Start){
    chapterControl2();
  } else {
    chapter1();
  }
}
var failAttemp = 0; // BAD ENDING
function chapter1 (){
  ellipseMode(CENTER);

  // draw the main character ///////////////////////////////////////////////////
  stroke(mainStroke);
  fill(mainColor);
  if (doneFrame < 100)
    ellipse(mainX, mainConstH-(mainH/2), walkW, mainH);
  mainX += mainSpeed;
  
  // draw when main character is standing in the middle //////////////
  if (mainX >= 400){
    mainSpeed = 0;
    
    if (midFrame <= 50){ // first 50 frame draw close eyes ///////////
      arc(mainX-10, 370-(mainH/2), 10, 10, 0, PI);
      arc(mainX+10, 370-(mainH/2), 10, 10, 0, PI);
      
    } else if (midFrame > 50 && midFrame < 300){ // open eye, speaks//
      stillWalking = 0;
      noStroke();
      fill("white");
      arc(mainX-10, 370-(mainH/2), 20, 20, 0, PI, OPEN);
      arc(mainX+10, 370-(mainH/2), 20, 20, 0, PI, OPEN);
      fill("black");
      arc(mainX-10, 370-(mainH/2), 7, 7, 0, PI, OPEN);
      arc(mainX+10, 370-(mainH/2), 7, 7, 0, PI, OPEN);
      
      // speak
      rectMode(CENTER);
      stroke("black");
      fill("white");
      rect(mainX+100, 300-(mainH), 280, 120, 20);
      fill("black");
      wordSpeak(3, mainX+100, 270-(mainH));
      
    } else if (doneFrame < 100){
      /*
      TODO:
      1. A voice speaks
      2. A gaint hand move down a star
      3. Ask MC to get it to success, but have to go through obsticals
      4. Promote click to choice [a. I will] [b. not a chance]
      5. If choose [a], then another hand move down a latter. just that eaz >:D
      */
      
      // questioning
      rectMode(CENTER);
      stroke("orange");
      fill("black");
      if (midFrame > 90 && showVoice){
        stroke("orange");
        fill("black");
        rect(mainX-150, height*0.2-50, 450, 60, 20);
        noStroke();
        fill("yellow");
        wordSpeak(4, mainX-150, height*0.2-55);
      } 
      
      // list of warnings
      if (midFrame > 90+90 && showVoice) {
        stroke("orange");
        fill("black");  
        rect(mainX+250, height*0.2-0, 250, 170, 20);
        noStroke();
        fill("yellow");
        wordSpeak(5, mainX+250, height*0.2-50);
        
        stroke("black");
        fill("white");
        rect(mainX+100, 367-(mainH/2), 130, 50, 20);
        fill("black");
        text("Who is there??",mainX+100,367-(mainH/2));
      } 
      
      // are you read?
      if (midFrame > 180+90 && showVoice){
        stroke("orange");
        fill("black");
        ellipse(mainX, height*0.5, 400, 80);
        noStroke();
        fill("yellow");
        wordSpeak(6, mainX, height*0.5+10);
        
        showChoice = 1;   
      }

      // who is speaking? by MC
      
      
      // looking up
      noStroke();
      fill("white");
      circle(mainX-10, 370-(mainH/2), 15);
      circle(mainX+10, 370-(mainH/2), 15);
      fill("black");
      circle(mainX-10, 367-(mainH/2), 8);
      circle(mainX+10, 367-(mainH/2), 8);
      
    }
    midFrame++;
  }
  
  
  
  // When main character is walking only ///////////////////////////////////////
  if (stillWalking){
    // draw text after a delay ///////////////////////////////////////
    if (frameCount > 250){
      stroke("black");
      fill("white");
      textAlign(CENTER);
      rectMode(CENTER);
      rect(180, 200, 210, 100, 20);
      rect(600, 220, 200, 80, 20);
      fill("black");
      wordSpeak(1, 180, 180);
      wordSpeak(2, 600, 215);
    }
    
    // draw the random people ////////////////////////////////////////
    fill(personColor);  
    for (var i = 0; i < roundNum; i++){
      stroke(walkStroke[i]);
      ellipse(walkX[i], 380-(walkH[i]/2), walkW, walkH[i]);
      stroke("black");
      
      if (i % 2 == 0)
        arc(walkX[i]+10, 370-(walkH[i]/2), 10, 10, 0, -PI, OPEN);
      else
        arc(walkX[i]-10, 370-(walkH[i]/2), 10, 10, 0, -PI, OPEN);

    }
    
    // Control the x coordinate of each random person ////////////////
    for (var j = 0; j < roundNum; j++){
      walkX[j] += walkSpeed[j];
    }
  }
  
  // ground ////////////////////////////////////////////////////////////////////
  if (doneFrame < 100){
    rectMode(CORNER);
    stroke("white");
    strokeWeight(2);
    fill("black");
    rect(-5, 380, 810, 125);
  }
  
  // choices ///////////////////////////////////////////////////////////////////
  if (showChoice){
    
    yesBox = color("orange");
    noBox = color("orange");
    
    // handle choices
    if (mouseX > 50 && mouseX < 350 && mouseY > 390 && mouseY < 490){
      yesBox = color("blue");
      if (boxClicked){
        showChoice = 0;
        showVoice = 0;
        showStar = 1;
        failAttemp = 0;
      }
    }
    if (mouseX > 450 && mouseX < 750 && mouseY > 390 && mouseY < 490){
      noBox = color("red");
      if (boxClicked){
        showChoice = 0;
        showVoice = 0;
        showStar = 0;
        failAttemp = 1;
      }
    } 
    
    // choice
    rectMode(CORNER);
    fill("white");
    strokeWeight(3);
    stroke(yesBox);
    textAlign(CENTER);
    rect(50, 390, 300, 100);
    stroke(noBox);
    rect(450, 390, 300, 100);
    wordSpeak(7, 200, 430);
    wordSpeak(8, 600, 430);
  }
  
  if (boxClicked && !showStar){
   doneFrame++; 
  }
  
  //var starPos = (starY >= height*0.08+30 && goingDown)?1:0;
  // stars /////////////////////////////////////////////////////////////////////
  if (showStar && goingDown){
    starY += (starY <= height*0.08+30)?starSpeed:0;
    if (starY >= height*0.08+30)
      goingDown = 0;
    
  } else if (!goingDown && showStar && doneFrame < 100){//(starY >= height*0.08+30){ // && showStar) { // hand comes out
    
    image(img2, ladderX+70, -100, 300,300);
    image(img2, ladderX+70, 50, 300,300);
    image(img2, ladderX+70, 200, 300,300);
    image(img, handX, 200, 300, 300); //-300
  
    handX += handSpeed;
    ladderX += (ladderX+300 >= width*0.5)?0:ladderSpeed;
    if (handSpeed < 0 && handX <= -300){
      handSpeed = 0;
      ladderSpeed = 0;
      
    } else {
      handSpeed = (handX+300 >= width*0.5) ? -handSpeed : handSpeed;
      ladderSpeed = handSpeed;
    }
    
    if (handX <= width*0.15 && handSpeed <= 0 ){
      //ellipse(mainX, 380-(mainH/2), walkW, mainH);
      mainX -= (mainX <= width*0.5-80)?0:1;
      readyUp = 1;
    }
    
    if (readyUp){
      mainConstH -= (mainConstH < -10)?0:2;
      starY -= (starY < -50)?0:starSpeed;
      
      // when everything is out of screen
      if (mainConstH < -10 && starY < -50){
        doneFrame++;
        //readyUp = 0;
      }
    }
  }
  
  
  
  translate(width * 0.5, starY);
  if (!goingDown && showStar){
    textSize(18);
    stroke("orange");
    rect(30, starY, 220, 50, 20);
    fill("yellow");
    noStroke();
    text("Star: Come\nShow Me What You Got!!",140,starY+20);
  }
  
  stroke("white");
  line(0, -100, 0, 0);
  starControl();
  
  // increase the time /////////////////////////////////////////////////////////
  if (roundNum < numWalk)
    roundNum++;
}




// text
function wordSpeak(num, xaxis, yaxis){
  var str = "hello world";
  switch(num) {
    case 1:
      textSize(25);
      textFont("cursive");
      text("Another\nComfortable Day\n:D :D :D",xaxis, yaxis)
      break;
    case 2:
      textSize(25);
      textFont("cursive");
      text("No Stress\nLife Good!",xaxis, yaxis);
      break;
    case 3:
      textSize(20);
      textFont("Arial");
      text("Why Am I Not Happy?\nEveryting is going well!\nBUT I WANT TO BE BETTER\nI NEED TO BE BETTER!",xaxis, yaxis)
      break;
    case 4:
      textSize(20);
      textFont("sans-serif");
      text("???: I have heard your wish!\nYou truly want to step out of you comfort zone?",xaxis, yaxis);
      break;
    case 5:
      textSize(18);
      textFont("sans-serif");
      text("???: If you do, you are\n[FACING FEAR]\n[TAKING RISKS]\n[CHANGING ROUTINES]\nAND\n[FACING FAILURES]", xaxis, yaxis);
      break;
    case 6:
      textSize(25);
      textFont("sans-serif");
      text("???: ARE YOU READY?!",xaxis, yaxis);
      break;
    case 7:
      textFont("Arial");
      textSize(40);
      noStroke();
      fill("blue");
      text("YES",xaxis, yaxis);
      textSize(20);
      fill("black");
      text("Show Me The Way!", xaxis, yaxis+40);
      break;
    case 8:
      textFont("Arial");
      textSize(40);
      noStroke();
      fill("red");
      text("NO",xaxis, yaxis);
      textSize(20);
      fill("black");
      text("OOF, I Rather Live A Comfy Life!", xaxis, yaxis+40);
      break;
    case 9:
      textSize(20);
      textFont("sans-serif");
      text("",xaxis, yaxis);
      break;
  }
}

// choice 


// all star related changes
function starControl(){
  stroke("black");
  strokeWeight(2);
  stroke(255,154,0);
  // translate(width * 0.5, height * 0.08);
  //translate(width * 0.5, -50);
  rotate(frameCount / -100.0);
  fill("yellow")
  star(15,25,5);
  translate(width * 0.008, height * 0.08);
  star(5,8,5);
  translate(-45, -50)
  star(5,8,5);
  translate(63, -20)
  star(5,8,5);
}

// for start /////////////////////////////////////////////////////////
function star(radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = cos(a) * radius2;
    let sy = sin(a) * radius2;
    vertex(sx, sy);
    sx = cos(a + halfAngle) * radius1;
    sy = sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
