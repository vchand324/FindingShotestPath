const canvas= document.getElementById("myCanvas");
const ctx= canvas.getContext("2d");
canvas.height = window.innerHeight-108
canvas.width = window.innerWidth
const Height= canvas.height;
const Width= canvas.width;
var img = document.getElementById("image");
var img2 = document.getElementById("image2");
const che = document.querySelector('#checkdiag')
const wgt = document.getElementById('wgt')
var output ;
var weight=wgt.value
function set_weight(value){
    weight = value
}
var cSet=[]
var rSet=[]
var neighbors=[]
var gap= 3;
var cnt;
tileW= 25;          // width of each tile
tileH= 25;          // height of each tile
tileRow=(Height/28);        // number of rows in grid
tileColumn= (Width/28);                     // number of columns in grid
var sr=Math.floor(tileRow/2);                 
var sc=(Math.floor(tileColumn/2) -5);
var ec= (Math.floor(tileColumn/2) +5);         
var er=Math.floor(tileRow/2);          
var start
var end
var X
var Y
boundX=0;
boundY=0;

var tiles=[];       // grid of tiles
for (c=0; c < tileColumn; c++){
    tiles[c]=[];

    for(r=0; r < tileRow; r++){
        X =c
        Y =r
        tiles[c][r]= new cell(c,r)
    
    }
}

function cell(c,r){
    this.x = c*(tileW+3)     // x-coordinate of each tile
    this.y = r*(tileH+3)     // y-coordinate of each tile
    this.c=c
    this.r =r
    this.state = 'e'        //state of each tile
    this.g=0                //cost (distance from start to current tile)
    this.f=0                //fitness number  f = g + h
    this.h=0                // heuristic value (distance from current tile to destination)
    this.previous = undefined     // parent of tile
    this.visited =  false                // visited state of each tile
    this.distance = Infinity 
    this.prevstate=undefined
}
start = tiles[sc][sr]
end = tiles[ec][er]
start.state= 's';
end.state= 'f';

function isDiagonal(a,b){                  
    if(Math.abs(a.c-b.c) === 1 && Math.abs(a.r - b.r) === 1){
        return true;
    }else{
        return false
    }
}
 


function rect(x,y,w,h,state,c,r){     // function to draw tiles

    if (state==='s'){                // state s corresponds to start        
        ctx.drawImage(img,x,y,tileW,tileH);              
    }
    else if (state==='f'){          // state f corresponds to finish
        ctx.drawImage(img2,x,y,tileW,tileH);              
    }
    else if (state==='e'){           // state e corresponds to empty
        ctx.fillStyle= '#000000';
    }
    else if(state==="w"){            // state w corresponds to wall
        ctx.fillStyle= '#6C6C6C';
    }
    else if(state==="x"){            // state x corresponds to visited
        ctx.fillStyle="indianred";
    }
    else if(state === 'p'){          
        ctx.fillStyle='palegreen'
    }else if(state === 'l'){
        ctx.fillStyle='lightseagreen'
    }
    
    ctx.beginPath();
    if (state != 's' && state != 'f'){
        ctx.rect(x,y,w,h);
    }
    

    ctx.closePath();
    ctx.fill();

   
}

function clear(){
    ctx.clearRect(0,0,Width,Height);
}

function draw(){
    clear();
    for (c=0; c < tileColumn; c++){
        for (r=0; r < tileRow; r++){
            rect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state,c,r); 
        }
    }
}
function myMove(e){
    x= e.pageX - canvas.offsetLeft;
    y= e.pageY - canvas.offsetTop;
    
    for (c=0; c < tileColumn; c++){
        for (r=0; r < tileRow; r++){
            if (c*(tileW+gap)<x && x < c*(tileW+gap)+tileW && r*(tileH+gap)<y && y < r*(tileH+gap)+tileH){
                if (tiles[c][r].state === 'e' && (c != boundX || r != boundY) && cnt === 2) {
                    tiles[c][r].state = 's';
                    tiles[boundX][boundY].state = 'e';
                    boundX = c;
                    boundY = r;
                    sc=c;
                    sr=r;
                    
                }
                else if (tiles[c][r].state === 'e' && (c != boundX || r != boundY) && cnt === 4) {
                    tiles[c][r].state = 'f';
                    tiles[boundX][boundY].state = 'e';
                    boundX = c;
                    boundY = r;
                    ec=c;
                    er=r;
                }
                else if ((tiles[c][r].state === 'e' || tiles[c][r].state === 'p' || tiles[c][r].state === 'l'|| tiles[c][r].state=='x') && (c != boundX || r != boundY) && cnt === '1') {
                    tiles[c][r].prevstate = tiles[c][r].state                     
                    tiles[c][r].state = 'w';
                    boundX = c;
                    boundY = r;
                }
                else if (tiles[c][r].state === 'w' && (c != boundX || r != boundY) && cnt === '1') {
                    if (tiles[c][r].prevstate=='p'|| tiles[c][r].prevstate=='l'|| tiles[c][r].prevstate=='x'){
                        tiles[c][r].state=tiles[c][r].prevstate
                    }
                    else{
                        tiles[c][r].state = 'e';
                    }
                    boundX = c;
                    boundY = r;                 
                }
                else if (tiles[c][r].state === 'w' && (c != boundX || r != boundY) && cnt === '3') {
                    tiles[c][r].state = 'e';
                    boundX = c;
                    boundY = r;
                }
            }
        }
    }
}


function myDown(e){
    
    canvas.onmousemove= myMove;
    
    x= e.pageX - canvas.offsetLeft;
    y= e.pageY - canvas.offsetTop;
    
    for (c=0; c < tileColumn; c++){ 
        for (r=0; r < tileRow; r++){
            if (c*(tileW+gap)<x && x < c*(tileW+gap)+tileW && r*(tileH+gap)<y && y < r*(tileH+gap)+tileH){
                if (tiles[c][r].state==='e'){
                    tiles[c][r].state='w';
                    cnt='1';
                    boundX=c;
                    boundY=r;
                }
                else if (tiles[c][r].state==='w'){
                    if( tiles[c][r].prevstate=='p'||tiles[c][r].prevstate=='l'|| tiles[c][r].prevstate=='x'){
                        tiles[c][r].state=tiles[c][r].prevstate
                    }
                    else{
                        tiles[c][r].state='e';
                    }
                    cnt='1';
                    boundX=c;
                    boundY=r;
                }
                else if (tiles[c][r].state==='s'){
                    boundX=c;
                    boundY=r;
                    cnt=2;
                    sc=c;
                    sr=r;
                }
                else if (tiles[c][r].state==='f'){
                    boundX=c;
                    boundY=r;
                    cnt=4;
                    ec=c;
                    er=r;
                }
                else{
                    tiles[c][r].prevstate= tiles[c][r].state
                    tiles[c][r].state='w';
                    boundX=c;
                    boundY=r;
                    cnt='1';
                }
            }
        }
    }
    canvas.onmousemove= myMove;
}

function myUp(){
    canvas.onmousemove= null;
}

function reset()
{
    neighbors=[]
    for (c=0; c < tileColumn; c++){
        tiles[c]=[];
    
        for(r=0; r < tileRow; r++){
            tiles[c][r]= new cell(c,r)
        }
    }
    
    start = tiles[sc][sr]
    end = tiles[ec][er]
    start.state= 's';
    end.state= 'f';
    output.innerHTML="";
    
}
function addNeighbors(cur,c,r){
    neighbors=[]
    if(c >0){
        neighbors.push(tiles[c-1][r])
    }
    if(c < tileColumn-1 ){
        neighbors.push(tiles[c+1][r])
    }
    if(r > 0){
        neighbors.push(tiles[c][r-1])
    }
    if(r < tileRow-1 ){
       neighbors.push(tiles[c][r+1])
    }
    if(che.checked === true){
        if(c >0  && r<tileRow-1){
            neighbors.push(tiles[c-1][r+1])
        }
        if(c < tileColumn-1 && r < tileRow-1){
            neighbors.push(tiles[c+1][r+1])
        }
        if(r > 0  && c>0 ){
            neighbors.push(tiles[c-1][r-1])
        }
        if(r>0 && c < tileColumn-1 ){
            neighbors.push(tiles[c+1][r-1])
        }     
    }
    return neighbors
}

function clear_path(){
    
    neighbors=[]
    for(var c=0;c<tileColumn;c++){
        for(var r=0;r<tileRow;r++){
            if(tiles[c][r].state === 'w'){
                cSet.push(c)
                rSet.push(r)
            }
            
        }
    }
    
    for (c=0; c < tileColumn; c++){
        tiles[c]=[];
    
        for(r=0; r < tileRow; r++){
            tiles[c][r]= new cell(c,r)
        }
    }
    
    for(i=0,j=0;i<cSet.length,j<rSet.length;i++,j++){
        var a = cSet[i]
        var b = rSet[j]
        tiles[a][b].state='w'
    }
    cSet=[]
    rSet=[]

    start = tiles[sc][sr]
    end = tiles[ec][er]
    start.state= 's';
    end.state= 'f';
    output.innerHTML=""; 

    
}

function init(){
    output= document.getElementById("outcome");
    return setInterval(draw,10);
}

init();

canvas.onmousedown= myDown;
canvas.onmouseup= myUp;
