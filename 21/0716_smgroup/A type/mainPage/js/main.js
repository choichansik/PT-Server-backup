$(document).ready(function(){
    $(".visual_navigation").addClass("on");

    $(".resort_taptriger_nav_click").each(function(){
        $(this).click(function(){
            $(this).addClass("on");
            $(this).siblings().removeClass("on");
        });
    });

    $(".visual_reservation").removeClass("on").addClass("on");

    $(window).on('scroll',function(){
        if($(window).scrollTop()){
            $('.header_wrap').addClass('active');
            $(".top-banner").addClass("bannerUp");
            $(".visual").css({
                "height":"calc(100vh - 79px)",
                "margin-top":"79px"
            });
            $(".visual_scroll").css("height","calc(100vh - 79px)");
            $(".visual_main").css("height","calc(100vh - 79px)");
            $(".main_inner").css("height","calc(100vh - 79px)");
            $(".visual_mainslide").css("height","calc(100vh - 79px)");
            $(".visual_mainslide img").css("min-height","calc(100vh - 79px)");
        }else{
            $('.header_wrap').removeClass('active');
            $(".top-banner").removeClass("bannerUp");
            $(".visual").css({
                "height":"calc(100vh - 169px)",
                "margin-top":"169px"
            });
            $(".visual_scroll").css("height","calc(100vh - 169px)");
            $(".visual_main").css("height","calc(100vh - 169px)");
            $(".main_inner").css("height","calc(100vh - 169px)");
            $(".visual_mainslide").css("height","calc(100vh - 169px)");
            $(".visual_mainslide img").css("min-height","calc(100vh - 169px)");
        }
    });

    $(".closeBtn").click(function(){
        $('.header_wrap').addClass('active');
        $(".top-banner").addClass("bannerUp");
        $(".visual").css({
            "height":"calc(100vh - 79px)",
            "margin-top":"79px"
        });
        $(".visual_scroll").css("height","calc(100vh - 79px)");
        $(".visual_main").css("height","calc(100vh - 79px)");
        $(".main_inner").css("height","calc(100vh - 79px)");
        $(".visual_mainslide").css("height","calc(100vh - 79px)");
        $(".visual_mainslide img").css("min-height","calc(100vh - 79px)");
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