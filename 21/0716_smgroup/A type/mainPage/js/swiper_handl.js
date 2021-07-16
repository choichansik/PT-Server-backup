$(document).ready(function(){
    var swiper = new Swiper(".visual_main", {
        effect: "fade",
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    var swiper = new Swiper(".special-offers_slide_inner", {
        cssWidthAndHeight : true,
        slidesPerView : 'auto',
        visibilityFullFit : true,
        autoResize : false,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            slidePrevTransitionStart: function() {
                var special_offersBtnL = $("section.special-offers .swiper-button-prev");
                var special_offersBtnR = $("section.special-offers .swiper-button-next");

                special_offersBtnL.css({
                    "background-image":"url('img/specia_btn_l_1.png')",
                    "background-repeat":"no-repeat",
                    "background-position":"center",
                    "background-size":"100%",
                });
                special_offersBtnR.css({
                    "background-image":"url('img/specia_btn_r_2.png')",
                    "background-repeat":"no-repeat",
                    "background-position":"center",
                    "background-size":"100%",
                });
            },
            slideNextTransitionStart: function(){
                var special_offersBtnL = $("section.special-offers .swiper-button-prev");
                var special_offersBtnR = $("section.special-offers .swiper-button-next");

                special_offersBtnL.css({
                    "background-image":"url('img/specia_btn_l_2.png')",
                    "background-repeat":"no-repeat",
                    "background-position":"center",
                    "background-size":"100%",
                });
                special_offersBtnR.css({
                    "background-image":"url('img/specia_btn_r_1.png')",
                    "background-repeat":"no-repeat",
                    "background-position":"center",
                    "background-size":"100%",
                });
            },
            activeIndexChange: function () {
                var special_offers_slide_hiiden = $(".special-offers_slide_hiiden");
                if(this.realIndex == 1 || this.realIndex == 3){
                    special_offers_slide_hiiden.css("overflow","visible");
                }if(this.realIndex == 0){
                    special_offers_slide_hiiden.css("overflow","hidden");
                }
            }
        }
    });

    var SubSwiper = new Swiper(".hottel-info_imgslide", {
        slidesPerView: 1,
        cssWidthAndHeight : true,
        visibilityFullFit : true,
        autoResize : false,
        touchRatio: 0,
        speed: 1000,
        loop: true,
        navigation: {
            nextEl: ".hottel-info-prev",
            prevEl: ".hottel-info-next",
        },
        centeredSlides : true
    });
    var MainSwiper = new Swiper(".hottel-info_textslide", {
        slidesPerView: 3,
        cssWidthAndHeight : true,
        visibilityFullFit : true,
        autoResize : false,
        touchRatio: 0,
        speed: 1000,
        loop: true,
        navigation: {
            nextEl: ".hottel-info-prev",
            prevEl: ".hottel-info-next",
        },
        centeredSlides : true
    });

    var MainSwiper = new Swiper('.hottel-info_imgslide', {
        controller: {
            control: SubSwiper,
        },
    });
    // var SubSwiper = new Swiper('.hottel-info_textslide', {
    //     controller: {
    //       control: MainSwiper
    //     },
    // });
});