$(document).ready(function(){
    var swiper = new Swiper(".visual_imgwraphidden", {
        cssWidthAndHeight : true,
        slidesPerView : 'auto',
        visibilityFullFit : true,
        autoResize : false,
        effect : 'fade',
        speed : 600,
        pagination: {
            el: ".visual_img_swiper-pagination",
            type: "progressbar",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    swiper.on('transitionEnd', function() {
        $(".swiperindexcount").text(swiper.realIndex+1);
    });
});