$(document).ready(function(){
    $('.resirt_tapimg_inner').slick({
        slide: 'div',
        dots: false,
        arrows : false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    $(".resort_taptriger_nav_click").click(function(){
        var resortSlideNo = $(this).index();
            $(".resirt_tapimg_inner").slick('slickGoTo',resortSlideNo);
    });
});