$(document).ready(function(){

    function toPX(value){
        return parseFloat(value) / 100 * (/vh/gi.test(value) ? window.innerHeight : window.innerWidth);
    }
    toPX();

    $(window).resize(function(){
        toPX();
    });
    // 처음의 모션
    var mainvisualmove = gsap.timeline({repeat: 0, repeatDelay: 0});
    mainvisualmove.from(".mainvisual-list", {duration: 1, scaleX:0.2, scaleY:0.2,opacity: 0, ease: Circ.easeOut})
    .to(".mainvisual-pagination",{duration: .5, opacity: 1});
    mainvisualmove.delay(0.5);
    // 처음의 모션

    /*------------------- 처음에는 헤더 안보였다가 스크롤 하면 보이기 ----------------------*/
    

    /*------------------- 처음에는 헤더 안보였다가 스크롤 하면 보이기 ----------------------*/    
    const mainvisual = new Swiper('.mainvisual', {
        speed: 1000,
        loop : true,
        slidesPerView: 1,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".mainvisual-pagination",
            clickable: true,
        },
        on: {
            init : function () {
                mainvisualmove.set(".mainvisual-list", {clearProps:"all"});
            },
        }
    });

    const con_1 = new Swiper('.con-1-slidehere', {
        speed: 1000,
        // loop : true,
        spaceBetween: 20,
    });

    const con_2 = new Swiper('.con-2-wrap', {
        speed: 1000,
        spaceBetween: 20,
        pagination: {
            el: ".con-2-pagination",
            clickable: true,
        },
    });

    const con_5 = new Swiper('.con-5-wrap', {
        speed: 1000,
        spaceBetween: 20,
        pagination: {
            el: ".con-5-pagination",
            clickable: true,
        },
    });
});