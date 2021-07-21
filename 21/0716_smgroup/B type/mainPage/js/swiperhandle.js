$(document).ready(function(){
    setTimeout(function(){
        var promotionsSwiper=new Swiper(".promotions_slide_inner",{
            cssWidthAndHeight:true,
            slidesPerView:'auto',
            visibilityFullFit:true,
            autoResize:false,
            loop:true,
            pagination:{
                el:".swiper-pagination",type:"progressbar",
            },
            // on:{
            //     activeIndexChange:function(){
            //         if(this.realIndex==1){
            //             $(".promotions_slide_hiden").css("overflow","visible")
            //         }if(this.realIndex==4){
            //             $(".promotions_slide_hiden").css("overflow","visible")
            //         }
            //     }
            // }
        });

        var SubSwiper=new Swiper(".hottel-info_imgslide",{
            slidesPerView:1,
            cssWidthAndHeight:true,
            visibilityFullFit:true,
            autoResize:false,
            effect:"fade",
            speed:1000,
            loop:true,
            navigation:{
                nextEl:".swiper-button-next",
                prevEl:".swiper-button-prev",
            },
        });

        var MainSwiper=new Swiper(".hottel-info_textslide",{
            slidesPerView:3,
            cssWidthAndHeight:true,
            visibilityFullFit:true,
            autoResize:false,
            speed:1000,
            loop:true,
            navigation:{
                nextEl:".swiper-button-next",
                prevEl:".swiper-button-prev",
            },
            centeredSlides:true,
            on:{
                slideChange:function(){
                    var canvasOverFlow=$(".canvasOverFlow");
                        canvasOverFlow.removeClass("view");
                        setTimeout(function(){
                            canvasOverFlow.addClass("view")
                        }),2000
                    }
                }
        });

        var MainSwiper=new Swiper('.hottel-info_imgslide',{
            controller:{control:SubSwiper,},
        });

        var swiper=new Swiper(".notice_slide_area",{
            cssWidthAndHeight:true,
            slidesPerView:'auto',
            visibilityFullFit:true,
            autoResize:false,
            loop:true,
            pagination:{
                el:".swiper-pagination",
                type:"progressbar",
            },
            navigation:{
                nextEl:".swiper-button-next",
                prevEl:".swiper-button-prev",
            },
        })
    },1000)
});