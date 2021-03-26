let nbarray = [],flag = 0,flag1 = 0,flag2 = 1;
let button0,button1,button2,button3,button4;
// 初始內容
function setup() {
  background(256);
  createCanvas(600, 600, WEBGL); // 決定 使用 3D 方式進行渲染
  nbarray.push(new myBox(0,0,0,50));
  /*for(let i=0;i<3;i+=1){
    // 怎麼把東西放到 nbarray 袋子裡面的公式
    nbarray.push(new myBox(50,(-height/2+(height/5)*2.5*i)+150,0,50));
  }*/
  //====================================================================
  button0 = createButton('reversed'); 
  //====================================================================
  button1 = createButton('clear');
  //====================================================================
  button2 = createButton('mode1');
  //====================================================================
  button3 = createButton('mode2');
  //====================================================================
  button4 = createButton('mode3');
}
function reversed() {
  //background(256);
  if(flag == 1)
    {
      flag = 2;
    }
  else if(flag == 2)
    {
      flag = 1;
    }
}
function clr() {
  background(256);
  console.log("clear");
}
function mode1() {
    flag1 = 1;
}
function mode2() {
    flag1 = 2;
}
function mode3() {
    flag1 = 3;
    flag2 = 1;
}
function draw() {
  //background(200);
  // 將袋子中 所有 東西 稱為 V 執行他的相關函式
  nbarray.forEach((v)=>{
    v.display();
  })
  //====================================================================
  button0.mousePressed(reversed);
  button1.mousePressed(clr);
  button2.mousePressed(mode1);
  button3.mousePressed(mode2);
  button4.mousePressed(mode3);
  //====================================================================
}
// 自訂一個類別物件
class myBox{
  // 怎樣建構這個物件 只執行一次
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    this.mx = 1;
    // 隨機產生物件顏色
    this.cc = color(random(255),random(255),random(255));
    // 衛星的中心xyz = 物件，衛星的大小 < 物件， 衛星的距離自訂
    this.stela = new   stela(this.x,this.y,this.z,this.size*0.25,this.size);
  }
  // 定義一些能力 我們呼叫時 執行 
  // 能力1:顯現這box
  display(){
    push();
      translate(this.x,this.y,this.z);  
      if (mouseX-width/2 > this.x-this.size && 
          mouseX-width/2 < this.x+this.size &&
          mouseY-height/2 > this.y-this.size && 
          mouseY-height/2 < this.y+this.size){
        //rotateX(frameCount*0.01);
        //rotateY(frameCount*0.01);
        this.mx = this.mx+0.5;
        this.cc = color(random(256),random(255),random(255));
        flag = 1;
        }
      this.stela.extend();
      this.slope();
      //rotateZ(-frameCount * 0.01);
      this.stela.display();
      fill(this.cc);
      torus(30, 15);
    pop();
    this.move();
    
  }
  //能力2:移動規則
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;}  
    //this.x = this.x + this.mx;
  }
  slope(){
    if(flag1 == 1)
      {
        rotateZ(-frameCount * 0.01);
      }
    if(flag1 == 2)
      {
        rotateX(-frameCount * 0.1);
      }
    if(flag1 == 3)
      {
        rotateY(frameCount * 0.1);
      }
    console.log("flag1 = ",flag1);
    
  }
    
}
// 衛星
class stela{
  constructor(x,y,z,size,cdx){
    //衛星的旋轉中心
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;

    // 衛星距離旋轉中心的x距離
    this.cdx=0;
    // 隨機產生物件顏色
    this.cd = color(random(255),random(255),random(255));
    //this.sp = 0.01;
  }
  display(){
    push();
      rotateZ(frameCount*0.1);
      translate(this.cdx,0,0);  
      fill(this.cd);
      noStroke();
      sphere(this.size);
      this.cd = color(255 * sin(frameCount),255 * cos(frameCount),255 * tan(frameCount));  
    pop();
  }
  extend(){
    if(flag == 1)
      {
        this.cdx = this.cdx + 0.3;
      }
    else if(flag == 2)
      {
        this.cdx = this.cdx - 0.3;
      }
    if(this.cdx > 350 && flag1 != 3)
      {
        flag = 2;
      }
    else if(this.cdx < 0 && flag1 != 3)
      {
        flag = 1;
      }
    if(this.cdx > 280 && flag1 == 3)
      {
        this.cdx = 0.3;
        flag = 2;
        //clr();  
      }
    if(this.cdx < -280 && flag1 == 3)
      {
        clr();  
        this.cdx = 0.3;
        flag = 1;
      }
    console.log("flag = ",flag,"    cdx = ",this.cdx);
    console.log("flag2 = ",flag2);
  }
  
}