/*window.onload=function(){
    //this.document.write("Hello JavaScript!");
};*/
$(document).ready(function(){
    $("#symbol").on('input',function(){
        $("#numberofsymbol").text(this.value);
        $("#bonus").text(bonus[this.value-3]);
        $("#club").text(bonus[this.value-3]*multiplier[0]);
        $("#diamond").text(bonus[this.value-3]*multiplier[1]);
        $("#heart").text(bonus[this.value-3]*multiplier[2]);
        switch(parseInt(this.value))
        {
            case 3:
                $("#spade").text("X");
                $("#joker").text("X");
                break;
            case 4:
                $("#spade").text(bonus[this.value-3]*multiplier[3]);
                $("#joker").text("X");
                break;
            case 5:
                $("#spade").text(bonus[this.value-3]*multiplier[3]);
                $("#joker").text(bonus[this.value-3]*multiplier[4]);
                break;
            default:
        }
    });
    $("#betbar").on('input',function(){
        $("#betnum").text(this.value)
    });
    $("#spin").click(function(){
        let bet = $("#betbar").val();
        let currentcoins=parseInt($("#coins").text());
        let ns=$("#symbol").val();
        let AllCombinationSet = ns*ns*ns;
        let Set = Math.floor(Math.random()*AllCombinationSet);
        let left = Math.floor(Set/(ns*ns));
        let middle = Math.floor(Set%(ns*ns)/ns);
        let right = Set%ns;
        let award = -1;
        let outcome="LOSE ";
        if(left==middle&&middle==right)
        {
            switch(left)
            {
                case 0:
                    outcome="CLUB ";
                    break;
                case 1:
                    outcome="DIAMOND ";
                    break;
                case 2:
                    outcome="HEART ";
                    break;
                case 3:
                    outcome="SPADE ";
                    break;
                case 4:
                    outcome="JOKER ";
                    break;
                default:
            }
            award=multiplier[left]*bonus[ns-3]*bet;
            $("#win").text(parseInt($("#win").text())+1);
        }
        else
        {
            $("#lose").text(parseInt($("#lose").text())+1);
        }
        $("#total").text(parseInt($("#total").text())+1);
        $("#winrate").text((($("#win").text()/$("#total").text())*100).toPrecision(3)+"%");
        award*=bet;
        outcome+=award;
        //Math.random():0~0.9999~
        $("#left").attr("src",pics[left]);
        $("#middle").attr("src",pics[middle]);
        $("#right").attr("src",pics[right]);
        currentcoins+=award;
        $("#coins").text(currentcoins);
        if(currentcoins<=$("#betbar").val())
        {
            $("#betbar").val(currentcoins);
            $("#betnum").text(currentcoins);
        }
        if(currentcoins==0)
        {
            $("#betbar").val(0);
            $("#betnum").text("0");
            $("#betbar").attr("min",currentcoins);
            outcome="NO COINS";
        }
        $("#betbar").attr("max",currentcoins);
        $("#previousoutcome").text(outcome);
        
    });
});