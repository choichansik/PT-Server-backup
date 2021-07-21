$(document).ready(function(){

    var contentE = function(){
        $(".clickhere").click(function(){
            if($(".clickmenu").css("display") === "none"){
                $(".clickmenu").css("display", "block");
                $(".clickhere").removeAttr("id", "clickhereId");
            }else{
                $(".clickmenu").css("display", "none");
                $(".clickhere").attr("id", "clickhereId");
            }
        });
    }
    contentE();

    $(window).on('scroll',function(){
        if($(".clickmenu").css("display") === "block"){
            $(".clickmenu").trigger("click");
        }
    });
});