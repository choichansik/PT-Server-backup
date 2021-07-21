$(document).ready(function () {

    var reloadE = function(){
        window.onload = function(){
            var load_text_show = $(".visual .text_wrap h1 span");
            var load_textp_show = $(".visual .text_wrap p");
            var show = load_text_show.hasClass("show");
            if(!show == true){
                load_text_show.removeClass("show").addClass("show");
                load_textp_show.removeClass("show").addClass("show");
            }
            $(".header_wrap").removeClass("on").addClass("on");
            $(".visual .visual_reservation").removeClass("on").addClass("on");
        }
    }
    reloadE();


    var lFollowX = 0,
        lFollowY = 0,
        x = 0,
        y = 0,
        friction = 1 / 50;

    function moveBackground() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;

        translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

    $('.visual-inner').css({
        '-ms-transform' : translate,
        '-webit-transform': translate,
        '-moz-transform': translate,
        '-o-transform' : translate,
        'transform': translate

        // '-webit-transform': translate,
        // '-moz-transform': translate,
        // 'transform': translate
    });

        window.requestAnimationFrame(moveBackground);
    }
    $(window).on('mousemove click', function(e) {
        var lMouseX = Math.max(-300, Math.min(100, $(window).width() / 4 - e.clientX));
        var lMouseY = Math.max(-300, Math.min(100, $(window).height() / 4 - e.clientY));
        lFollowX = (15 * lMouseX) / 100;
        lFollowY = (15 * lMouseY) / 100;

    });
    moveBackground();

    $(window).on('scroll',function(){
        if($(window).scrollTop()){
            $(".header_wrap").removeClass("on");
            $(".header_wrap").removeClass("scroll");

            $(".visual_reservation").removeClass("on");
            $(".visual_reservation").removeClass("scroll");

            $(".visual .text_wrap h1 span").removeClass("show");

            $(".visual .text_wrap p").removeClass("show");
        }else{
            $(".header_wrap").removeClass("on");
            $(".header_wrap").removeClass("scroll");
            $(".header_wrap").addClass("scroll");

            $(".visual_reservation").removeClass("on");
            $(".visual_reservation").removeClass("scroll");
            $(".visual_reservation").addClass("scroll");

            $(".visual .text_wrap h1 span").removeClass("show");
            $(".visual .text_wrap h1 span").addClass("show");

            $(".visual .text_wrap p").removeClass("show");
            $(".visual .text_wrap p").addClass("show");
        }
    });




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




    var footerarea = false;

    $(window).on('scroll',function() {
        if (checkVisible($('.notice'))&&!footerarea) {
            $("footer").css("z-index","1");
            isVisible=true;
        }else{
            $("footer").css("z-index","-1");
        }
    });

    function checkVisible( elm, eval ) {
        eval = eval || "object visible";
        var viewportHeight = $(window).height(), // Viewport Height
            scrolltop = $(window).scrollTop(), // Scroll Top
            y = $(elm).offset().top,
            elementHeight = $(elm).height();   
        
        if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
        if (eval == "above") return ((y < (viewportHeight + scrolltop)));
    }


    
})
