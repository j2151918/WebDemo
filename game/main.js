let mapArray,ctx,currentImgMainX,currentImgMainY;
let imgMoutain,imgMain,imgEnemy;
$(document).ready(function(){
    mapArray=
        [0,1,0,1,1,1,0,0,1,0,0,0,0,0,0,3,
         0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,
         1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,
         3,1,0,1,0,0,1,1,0,0,0,0,1,0,0,1,
         1,1,1,0,0,1,0,1,0,0,0,1,0,0,0,0,
         0,1,0,0,0,0,0,0,1,1,1,0,1,0,0,0,
         0,0,1,0,1,0,1,1,0,1,0,1,1,0,0,1,
         0,0,0,1,0,0,0,0,0,1,0,0,1,0,1,1,
         1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,1,
         0,1,0,1,1,0,0,0,0,1,1,1,1,0,1,1,
         0,0,0,0,1,0,0,1,1,0,1,1,0,1,1,1,
         0,0,0,1,0,0,1,0,1,1,0,0,1,1,0,1,
         1,0,0,0,0,1,1,1,0,0,1,0,1,1,0,1,
         1,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,
         1,1,0,0,1,1,0,0,1,1,1,0,1,0,1,1,
         0,0,1,1,1,3,0,1,1,1,1,0,0,0,0,2];
    ctx=$("#myCanvas")[0].getContext("2d");
    imgMain = new Image();
    currentImgMainX=0;
    currentImgMainY=0;
    imgMain.onload = function(){
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(imgMain,0,0,36,36,currentImgMainX,currentImgMainY,200,200)
    }
    imgMain.src="image/game/Mario.png";
    imgMoutain=new Image();
    imgMoutain.src= "image/game/material.png";
    imgEnemy=new Image();
    imgEnemy.src="image/game/spriteSheet.png";
    imgMoutain.onload=function(){
        for(let x in mapArray){
            if(mapArray[x]==1){
                ctx.drawImage(imgMoutain,32,192,32,32,(x%16)*200,Math.floor(x/16)*200,200,200);
            }
        }
    }
    imgEnemy.onload=function(){
        for(let x in mapArray){
            if(mapArray[x]==3){
                ctx.drawImage(imgEnemy,0,0,90,140,(x%16)*200,Math.floor(x/16)*200,200,200);
            }
        }
    }
});
$(document).keydown(function(event){
    let targetImgMainX,targetImgMainY,targetBlock,cutImagePositionX,EnemyFacing;

    event.preventDefault();
    switch(event.key){
        case "ArrowLeft":
            targetImgMainX=currentImgMainX-200;
            targetImgMainY=currentImgMainY;
            cutImagePositionX=216;
            break;
        case "ArrowUp":
            targetImgMainX=currentImgMainX;
            targetImgMainY=currentImgMainY-200;
            cutImagePositionX=144;
            break;
        case "ArrowRight":
            targetImgMainX=currentImgMainX+200;
            targetImgMainY=currentImgMainY;
            cutImagePositionX=72;
            break;
        case "ArrowDown":
            targetImgMainX=currentImgMainX;
            targetImgMainY=currentImgMainY+200;
            cutImagePositionX=0;
            break;
        default:
            return;
    }
    if(targetImgMainX<=3400&&targetImgMainX>=0&&
        targetImgMainY<=3400&&targetImgMainY>=0)
        {
            targetBlock=targetImgMainX/200+(targetImgMainY/200)*16;
        }
    else
    {
        targetBlock=-1;
    }
    ctx.clearRect(currentImgMainX,currentImgMainY,200,200);
    if(targetBlock==-1||mapArray[targetBlock]==1||mapArray[targetBlock]==3){

    }
    else
    {
        $("#talkBox").empty();
        currentImgMainX=targetImgMainX;
        currentImgMainY=targetImgMainY;
        for(let x in mapArray){
            if(mapArray[x]==3){
                ctx.clearRect((x%16)*200,Math.floor(x/16)*200,200,200);
                if(x%16<targetBlock%16)
                {
                    if(Math.floor(x/16)>Math.floor(targetBlock/16))
                    {
                        cutEnemyPositionX=450;
                    }
                    else if(Math.floor(x/16)<Math.floor(targetBlock/16))
                    {
                        cutEnemyPositionX=630;
                    }
                    else
                    {
                        cutEnemyPositionX=540;
                    }
                }
                else if(x%16>targetBlock%16)
                {
                    if(Math.floor(x/16)>Math.floor(targetBlock/16))
                    {
                        cutEnemyPositionX=270;
                    }
                    else if(Math.floor(x/16)<Math.floor(targetBlock/16))
                    {
                        cutEnemyPositionX=90;
                    }
                    else
                    {
                        cutEnemyPositionX=180;
                    }
                }
                else
                {
                    if(Math.floor(x/16)>Math.floor(targetBlock/16))
                    {
                        cutEnemyPositionX=360;
                    }
                    else if(Math.floor(x/16)<Math.floor(targetBlock/16))
                    {
                        cutEnemyPositionX=0;
                    }
                }
                ctx.drawImage(imgEnemy,cutEnemyPositionX,0,90,140,(x%16)*200,Math.floor(x/16)*200,200,200);
            }
        }
    }
    ctx.drawImage(imgMain,cutImagePositionX,0,36,36,currentImgMainX,currentImgMainY,200,200);

    


    switch(mapArray[targetBlock])
    {
        case undefined:
            $("#talkBox").text("邊界");
            break;
        case 1:
            $("#talkBox").text("有山");
            break;
        case 2:
            $("#talkBox").text("抵達終點");
            break;
        case 3:
            $("#talkBox").text("哈囉");
            break;
    }
});