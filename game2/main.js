let ctx,currentImgMainX,currentImgMainY;
let imgMoutain,imgMain,imgEnemy;
let tileblocks;//地圖長寬格數
let tilesize=200;//tile本身長寬
let currentmap;
let thismap=1;
let direction;
let mapside;
let mapwidth,mapheight;
function loadmap(number){
    currentmap=map[number];
    tileblocks=Math.sqrt(map[number].length);
    mapside=tileblocks*tilesize-tilesize;
    $("#myCanvas").attr("width",tileblocks*tilesize).attr("height",tileblocks*tilesize);
    ctx=$("#myCanvas")[0].getContext("2d");
    ctx.imageSmoothingEnabled = false;
    currentImgMainX=0;
    currentImgMainY=0;
}
function getblock(X,Y){
    return X/tilesize+(Y/tilesize)*tileblocks;
}
function redrawmap(){
    for(let x in currentmap){
        if(currentmap[x]==-1){
            ctx.drawImage(imgMain,0,0,36,36,(x%tileblocks)*tilesize,Math.floor(x/tileblocks)*tilesize,tilesize,tilesize);
            currentmap[x]=0;
        }
        else if(currentmap[x]==1){
            ctx.drawImage(imgMoutain,32,192,32,32,(x%tileblocks)*tilesize,Math.floor(x/tileblocks)*tilesize,tilesize,tilesize);
        }
        else if(currentmap[x]==2){
            ctx.drawImage(mushroom,0,0,200,200,(x%tileblocks)*tilesize,Math.floor(x/tileblocks)*tilesize,tilesize,tilesize);
        }
        else if(currentmap[x]==3){
            ctx.drawImage(space,0,0,200,200,(x%tileblocks)*tilesize,Math.floor(x/tileblocks)*tilesize,tilesize,tilesize);
        }
    }
}

$(document).ready(function(){
    loadmap(thismap);
    imgMain = new Image();
    imgMoutain=new Image();
    space=new Image();
    mushroom=new Image();
    imgMain.onload = function(){
        for(let x in currentmap){
            if(currentmap[x]==-1){
                ctx.drawImage(imgMain,0,0,36,36,(x%tileblocks)*tilesize,Math.floor(x/tileblocks)*tilesize,tilesize,tilesize);
                currentmap[x]=0;
            }
        }
    }
    imgMain.src="image/game/Mario.png";
    imgMoutain.onload=function(){
        for(let x in currentmap){
            if(currentmap[x]==1){
                ctx.drawImage(imgMoutain,32,192,32,32,(x%tileblocks)*tilesize,Math.floor(x/tileblocks)*tilesize,tilesize,tilesize);
            }
        }
    }
    imgMoutain.src= "image/game/material.png";
    space.onload=function(){
        for(let x in currentmap){
            if(currentmap[x]==3){
                ctx.drawImage(space,0,0,200,200,(x%tileblocks)*tilesize,Math.floor(x/tileblocks)*tilesize,tilesize,tilesize);
            }
        }
    }
    space.src="image/game/whitespace.png";
    mushroom.onload=function(){
        for(let x in currentmap){
            if(currentmap[x]==2){
                ctx.drawImage(mushroom,0,0,200,200,(x%tileblocks)*tilesize,Math.floor(x/tileblocks)*tilesize,tilesize,tilesize);
            }
        }
    }
    mushroom.src="image/game/mushroom.png";
    
    
});
$(document).keydown(function(event){
    let targetImgMainX,targetImgMainY,targetBlock,cutImagePositionX;
    let currentStoneX,currentStoneY,targetStoneX,targetStoneY,targetStoneBlock;

    event.preventDefault();
    switch(event.key){
        case "ArrowLeft":
            targetImgMainX=currentImgMainX-tilesize;
            targetImgMainY=currentImgMainY;
            cutImagePositionX=216;
            direction="left";
            break;
        case "ArrowUp":
            targetImgMainX=currentImgMainX;
            targetImgMainY=currentImgMainY-tilesize;
            cutImagePositionX=144;
            direction="up";
            break;
        case "ArrowRight":
            targetImgMainX=currentImgMainX+tilesize;
            targetImgMainY=currentImgMainY;
            cutImagePositionX=72;
            direction="right";
            break;
        case "ArrowDown":
            targetImgMainX=currentImgMainX;
            targetImgMainY=currentImgMainY+tilesize;
            cutImagePositionX=0;
            direction="down";
            break;
        default:
            return;
    }
    if(targetImgMainX<=mapside&&targetImgMainX>=0&&
        targetImgMainY<=mapside&&targetImgMainY>=0)
        {
            targetBlock=getblock(targetImgMainX,targetImgMainY);
        }
    else
    {
        targetBlock=-1;
    }
    ctx.clearRect(currentImgMainX,currentImgMainY,tilesize,tilesize);
    if(targetBlock==-1||currentmap[targetBlock]==3){

    }
    else if(currentmap[targetBlock]==1){
        currentStoneX=targetImgMainX;
        currentStoneY=targetImgMainY;
        switch(direction){
            case "up":
                targetStoneX=currentStoneX;
                targetStoneY=currentStoneY-tilesize;                
                break;
            case "down":
                targetStoneX=currentStoneX;
                targetStoneY=currentStoneY+tilesize;      
                break;
            case "left":
                targetStoneX=currentStoneX-tilesize;
                targetStoneY=currentStoneY;      
                break;
            case "right":
                targetStoneX=currentStoneX+tilesize;
                targetStoneY=currentStoneY;      
                break;
            default:
                return;
        }
        if(targetStoneX<=mapside&&targetStoneX>=0&&
            targetStoneY<=mapside&&targetStoneY>=0)
            {
                targetStoneBlock=getblock(targetStoneX,targetStoneY);
            }
        else
        {
            targetStoneBlock=-1;
        }
        ctx.clearRect(currentStoneX,currentStoneY,tilesize,tilesize);
        if(targetStoneBlock==-1||currentmap[targetStoneBlock]==1){

        }
        else
        {
            currentmap[getblock(currentStoneX,currentStoneY)]=0;
            currentStoneX=targetStoneX;
            currentStoneY=targetStoneY;
            currentmap[targetStoneBlock]=1;
        }
        ctx.drawImage(imgMoutain,32,192,32,32,currentStoneX,currentStoneY,tilesize,tilesize);
    }
    else
    {
        $("#talkBox").empty();
        currentImgMainX=targetImgMainX;
        currentImgMainY=targetImgMainY;
    }
    ctx.drawImage(imgMain,cutImagePositionX,0,36,36,currentImgMainX,currentImgMainY,tilesize,tilesize);

    switch(currentmap[targetBlock])
    {
        case undefined:
            $("#talkBox").text("邊界");
            break;
        case 1:
            $("#talkBox").text("石塊");
            break;
        case 2:
            ctx.clearRect(0,0,mapside+200,mapside+200);
            if(thismap+1<map.length){
                thismap+=1;
                loadmap(thismap);
                redrawmap();
                $("#talkBox").text("下一關");
            }
            else{
                $("#talkBox").text("恭喜過關");
            }
            
            break;
        case 3:
            $("#talkBox").text("不能行走");
            break;
    }
});