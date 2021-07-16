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
    '-webit-transform': translate,
    '-moz-transform': translate,
    'transform': translate
});

    window.requestAnimationFrame(moveBackground);
    //requestAnimationFrame : 반복 재생과 같은 것
}
$(window).on('mousemove click', function(e) {
    var lMouseX = Math.max(-300, Math.min(100, $(window).width() / 4 - e.clientX));
    // -300, 윈도우 너비 / 4
    var lMouseY = Math.max(-300, Math.min(100, $(window).height() / 4 - e.clientY));
    lFollowX = (15 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    lFollowY = (15 * lMouseY) / 100;
    //Math.max 입력값으로 받은 0개 이상의 숫자 중 가장 큰 숫자를 반환

});
moveBackground();