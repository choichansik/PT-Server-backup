$(document).ready(function(){
    const mainvisual = new Swiper('.mainvisual-wrap', {
        effect : 'fade',
        speed: 1000,
        loop : true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".mainvisual-pagination",
            clickable: true,
        },
    });

    const con2 = new Swiper('.con-2', {
        speed: 1000,
        loop : true,
    });

    const con5 = new Swiper('.con-5-wraper', {
        speed: 1000,
        // loop : true,
        // spaceBetween: 50,
        centeredSlides: true,
        pagination: {
            el: ".con-5-wraper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + "0"+(index + 1) + "</span>";
            },
        },
    });

    var $header = $(".header-wrap"); //헤더를 변수에 넣기
    var $page = $('.con-1'); //색상이 변할 부분
    var $window = $(window);
    var pageOffsetTop = $page.offset().top - 200;//색상 변할 부분의 top값 구하기
    
    $window.resize(function(){ //반응형을 대비하여 리사이즈시 top값을 다시 계산
        pageOffsetTop = $page.offset().top - 200;
    });
    
    $window.on('scroll', function(){ //스크롤시
        var scrolled = $window.scrollTop() >= pageOffsetTop; //스크롤된 상태; true or false
        $header.toggleClass('down', scrolled); //클래스 토글
    });


    const con_1_scroll = gsap.timeline({
        scrollTrigger: {
            trigger : ".con-1",
            start: "-=150 center",
            end: "bottom center",
            // scrub : true,
            // markers : true
        }
    });
    con_1_scroll.from(".con-1 .con-title", {duration:2, y:100 ,opacity: 0,ease: Power4.easeOut})
    .to(".con-1-img-bg.con1A", {duration:1, width:"100%", ease: Power4.easeOut}, "-=1.5")
    .to(".con-1-img-img.con1A", {duration:.5, opacity: 1}, "-=.8")
    .to(".con-1-img-bg.con1B", {duration:1, width:"100%", ease: Power4.easeOut}, "-=1.1")
    .to(".con-1-img-img.con1B", {duration:.5, opacity: 1}, "-=.4")
    .from(".con-1-explan ", {duration:2, y:100 ,opacity: 0,ease: Power4.easeOut}, "-=.5")
    .from(".con-1-deco ", {duration:2, x:-500 ,opacity: 0,ease: Power4.easeOut}, "-=1.5")
    con_1_scroll.delay(2);



    const con_2_scroll = gsap.timeline({
        scrollTrigger: {
            trigger : ".con-2",
            start: "-=150 center",
            end: "bottom center",
            // scrub : true,
            // markers : true
        }
    });
    con_2_scroll.to(".con-1-img-bg.con2A", {duration:1, width:"100%", ease: Power4.easeOut}, "-=1.5")
    .to(".con-1-img-img.con2A", {duration:.5, opacity: 1}, "-=.8")
    .from(".con-2-slide-title",{duration:1, opacity: 0, y:100}, "-=.6")
    .from(".con-2-slide-explan",{duration:1, opacity: 0, y:100}, "-=.6")
    .from(".con-2-more-btn",{duration:1, opacity: 0, y:100}, "-=.6")
    .to(".con-1-img-bg.con2B", {duration:1, width:"100%", ease: Power4.easeOut}, "-=1.1")
    .to(".con-1-img-img.con2B", {duration:.5, opacity: 1}, "-=.4")
    con_1_scroll.delay(2);


    const con_3_scroll = gsap.timeline({
        scrollTrigger: {
            trigger : ".con-3",
            start: "-=150 center",
            end: "bottom center",
            // scrub : true,
            // markers : true
        }
    });
    con_3_scroll.from(".con-3-title-wrap .con-title",{duration:1, opacity: 0, y:100})
    .from(".con-3-title-wrap .con-sub-title",{duration:1, opacity: 0, y:100}, "-=.8")
    .to(".con-1-img-bg.con3A", {duration:1, width:"100%", ease: Power4.easeOut}, "-=.5")
    .to(".con-1-img-img.con3A", {duration:.5, opacity: 1}, "-=.4")
    .from(".con-3-content-text.A",{duration:1, opacity: 0, y:50}, "-=.8")
    .to(".con-1-img-bg.con3B", {duration:1, width:"100%", ease: Power4.easeOut}, "-=.7")
    .to(".con-1-img-img.con3B", {duration:.5, opacity: 1}, "-=.6")
    .from(".con-3-content-text.B",{duration:1, opacity: 0, y:50}, "-=.8")
    .to(".con-1-img-bg.con3C", {duration:1, width:"100%", ease: Power4.easeOut}, "-=.8")
    .to(".con-1-img-img.con3C", {duration:.5, opacity: 1}, "-=.7")
    .from(".con-3-content-text.C",{duration:1, opacity: 0, y:50}, "-=.8")
    .to(".con-1-img-bg.con3D", {duration:1, width:"100%", ease: Power4.easeOut}, "-=.9")
    .to(".con-1-img-img.con3D", {duration:.5, opacity: 1}, "-=.8")
    .from(".con-3-content-text.D",{duration:1, opacity: 0, y:50}, "-=.8")
    con_1_scroll.delay(2);


    const con_5_scroll = gsap.timeline({
        scrollTrigger: {
            trigger : ".con-5",
            start: "-=150 center",
            end: "bottom center",
            // scrub : true,
            // markers : true
        }
    });
    con_5_scroll.to(".con-1-img-bg.con4A", {duration:1, width:"100%", ease: Power4.easeOut}, "-=.5")
    .to(".con-1-img-img.con4A", {duration:.5, opacity: 1}, "-=.4")
    .from(".con-5-slide-title",{duration:1, opacity: 0, y:50}, "-=.8")
    .from(".con-5-slide-text",{duration:1, opacity: 0, y:50}, "-=.8")
    .to(".con-1-img-bg.con4B", {duration:1, width:"100%", ease: Power4.easeOut}, "-=.7")
    .to(".con-1-img-img.con4B", {duration:.5, opacity: 1}, "-=.6")
    .to(".con-1-img-bg.con4C", {duration:1, width:"100%", ease: Power4.easeOut}, "-=.8")
    .to(".con-1-img-img.con4C", {duration:.5, opacity: 1}, "-=.7")
    .to(".con-1-img-bg.con4D", {duration:1, width:"100%", ease: Power4.easeOut}, "-=.9")
    .to(".con-1-img-img.con4D", {duration:.5, opacity: 1}, "-=.10")
    .from(".con-5-wraper-pagination",{duration:1, opacity: 0, y:50}, "-=.8")
    con_1_scroll.delay(2);

    const footer = gsap.timeline({
        scrollTrigger: {
            trigger : ".footer",
            start: "-=200 center",
            end: "bottom center",
            // scrub : true,
            // markers : true
        }
    });
    footer.from(".footer",{duration:1, opacity: 0, y:200})

    const add = gsap.timeline({
        scrollTrigger: {
            trigger : ".addcon",
            start: "top-=500 center",
            end: "bottom center",
            // scrub : true,
            // markers : true
        }
    });
    add.from(".addcon",{duration:1, opacity: 0, y:200})




});