$(document).ready(function(){
    var promotionsSwiper = new Swiper(".promotions_slide_inner", {
        cssWidthAndHeight : true,
        slidesPerView : 'auto',
        visibilityFullFit : true,
        autoResize : false,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        // on: {
        //     activeIndexChange: function () {
        //         if(this.realIndex == 1){
        //             $(".promotions_slide_hiden").css("overflow", "visible");
        //         }if(this.realIndex == 4){
        //             $(".promotions_slide_hiden").css("overflow", "visible");
        //         }
        //     }
        // }
    });

    var visualSlider = new Swiper(".visual_view_slide", {
        cssWidthAndHeight : true,
        slidesPerView : 'auto',
        visibilityFullFit : true,
        autoResize : false,
        loop: true,
        centeredSlides : true,
        speed : 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".visual-button-next",
            prevEl: ".visual-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var other_room_swiper = new Swiper(".other-room_slidelist", {
        cssWidthAndHeight : true,
        slidesPerView : 'auto',
        visibilityFullFit : true,
        autoResize : false,
        speed : 1000,
        effect:'fade',
        navigation: {
            nextEl: ".otherNextBtn",
            prevEl: ".otherPrevBtn",
        },
        on:{
            activeIndexChange: function () {
                var roomType = $(".roomType");
                var capacity = $(".capacity");
                var rooms = $(".rooms");
                var bed = $(".bed");

                if(this.realIndex == 0){
                    roomType.text("QUEEN SUITE ROOM");
                    capacity.text("4인 (최대 6인)");
                    rooms.text("거실 1, 침실 1, 온돌룸 1");
                    bed.text("QUEEN BED1 + 한실침구");
                }if(this.realIndex == 1){
                    roomType.text("JUNIOR SUITE");
                    capacity.text("2명(최대 4명)");
                    rooms.text("거실 1, 침실 1");
                    bed.text("QUEEN BED 2");
                }if(this.realIndex == 2){
                    roomType.text("EXECUTIVE SUITE ROOM");
                    capacity.text("2명(최대 4명)");
                    rooms.text("거실 1, 침실 1");
                    bed.text("DOUBLE BED2");
                }
            }
        }
    });
});