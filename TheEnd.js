function endingControl(){
  background("white");
  noStroke();
  fill("black");
  textAlign(CENTER);
  
  textSize(20)
  textStyle(BOLD);
  text("''The only real failure is the failure to try,\nand the measure of success is how we cope with disappointment.''", width*0.5, height*0.4-60);
  textSize(15)
  text("― Deborah Moggach, The Best Exotic Marigold Hotel", width*0.5+150, height*0.4-10);
  textStyle(NORMAL);
  translate(0, 70);
  textSize(43);
  text("THANK YOU FOR PARTICIPATING", width*0.5, height*0.4);
  textSize(38);
  text("VIS 142 Project 1", width*0.5, height*0.4+50);
  textSize(30);
  text("David Zhao", width*0.5, height*0.4+100);
  translate(0, -70);
  
  strokeWeight(1);
  stroke("black");
  fill(239,176,28);
  strokeWeight(mainStrokeW4);
  ellipse(70, 500-(mainH4/2), 50, mainH4);
  noStroke();
  fill("white")
  circle(70-10, 500-(mainH4/2)-12, 15);
  circle(70+10, 500-(mainH4/2)-12, 15);
  fill("black");
  circle(70-10, 500-(mainH4/2)-15, 8);
  circle(70+10, 500-(mainH4/2)-15, 8);
  fill("white");
  circle(70-8, 500-(mainH4/2)-15, 3);
  circle(70+12, 500-(mainH4/2)-15, 3);
  stroke("black");
  fill("white");
  strokeWeight(2);
  arc(70, 500-(mainH4/2), 10,10,0,PI);
  
  
  starControl5();
}

function starControl5(){
  stroke("black");
  strokeWeight(2);
  stroke(255,154,0);
  translate(width * 0.5, height*0.2-40);
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