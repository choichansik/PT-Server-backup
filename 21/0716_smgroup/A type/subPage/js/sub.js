$(document).ready(function(){

    $(".clickhere").click(function(){
        if($(".clickmenu").css("display") === "none"){
            $(".clickmenu").css("display", "block");
            $(".clickhere").removeAttr("id", "clickhereId");
            
        }else{
            $(".clickmenu").css("display", "none");
            $(".clickhere").attr("id", "clickhereId");
        }
    });
});