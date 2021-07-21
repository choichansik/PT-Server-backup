$(document).ready(function(){
    $(".visual_navigation").addClass("on");

    $(".resort_taptriger_nav_click").each(function(){
        $(this).click(function(){
            $(this).addClass("on");
            $(this).siblings().removeClass("on");
        });
    });

    $(".visual_reservation").removeClass("on").addClass("on");

    $(".closeBtn").click(function(){
        $('.top-banner').remove();
        $(".header_wrap").css({
            "top":"0"
        });
        $(".visual_textwrap").css({
            "top":"50%"
        });
    });

    $(window).on('scroll',function(){
        if($(window).scrollTop()){ // 스크롤 내렸을 때
            if($('.top-banner').length){
                // alert("있습니다.");
                $('.top-banner').css({
                    "top":"-79px"
                });
                $(".header_wrap").css({
                    "top":"0"
                });
                $(".visual_textwrap").css({
                    "top":"50%"
                });
            }else{
                // alert("없습니다.");
            }
        }else{ //최상단일때
            if($('.top-banner').length){
                // alert("있습니다.");
                $('.top-banner').css({
                    "top":"0px"
                });
                $(".header_wrap").css({
                    "top":"79px"
                });
                $(".visual_textwrap").css({
                    "top":"55%"
                });
            }else{
                // alert("없습니다.");
            }
        }
    });

    // .viualScroll_add

    // var hotelprevarea = $(".hottel-info_textslide .swiper-wrapper .swiper-slide");
    // var hotelnextarea = $(".hottel-info_textslide .swiper-wrapper .swiper-slide.swiper-slide-next");
    // var hotelBtnL = $("#hotelBtnL");
    // var hotelBtnR = $("#hotelBtnR");

    // hotelprevarea.mouseenter(function(){
    //     hotelprevarea.mousemove(function(e){
    //         var x = e.clientX;
    //         var y = e.clientY;

    //         hotelBtnL.css({
    //             "top": y,
    //             "left": x,
    //             "opacity":"1"
    //         });
    //     });
    // }).mouseleave(function(){
    //     hotelBtnL.css({
    //         "top": "50%",
    //         "left": "20%",
    //         "opacity":"0"
    //     });
    // });

    var animateHTML = function() {
        var elems,
            windowHeight

        var init = function() {
            elems = document.getElementsByClassName("hidden");
            windowHeight = window.innerHeight;
            _addEventHandlers();
        }

        var _addEventHandlers = function() {
            window.addEventListener("scroll", _checkPosition);
            window.addEventListener("resize", init)
        }
        var _checkPosition = function() {
                for ( var i = 0; i < elems.length; i++ ) {
                var posFromTop = elems[i].getBoundingClientRect().top;
                if ( posFromTop - windowHeight <= 0) {
                    elems[i].className = elems[i].className.replace( "hidden", "fade-in" );
                }
            }
        }

        return {
            init: init
        }
    }

    animateHTML().init();


});