$(document).ready(function(){
    // $("visualBtn li").each(function(){
    //     $(this).click(function(){
    //         $("visualBtn li").removeClass("on").addClass("on");
    //     });
    // });

    $(".visualBtn li").on("click", function(){
        $(".visualBtn li").removeClass("on");
        $(this).each(function(){
            $(this).removeClass("on").addClass("on");
        });
    });
});