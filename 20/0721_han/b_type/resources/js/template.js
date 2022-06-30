$(function() {
   var $window = $(window);
   var $document = $(document);

   $window.on('load scroll resize', function() {
      var viewTop = $window.scrollTop(),
          viewBtm = viewTop + $window.innerHeight();

      // parallax function
      function parallaxFunc(target) {
         $('.' + target).each(function() {
            var $this = $(this);

            var thisTop = $this.offset().top;
            var thisBtm = thisTop + $this.outerHeight();
            var viewTop = $window.scrollTop();
            var viewBtm = viewTop + $window.innerHeight();
            var value = (viewBtm - thisTop) * 0.3;

            // console.log('thisTop : ' + thisTop);
            // console.log('thisBtm : ' + thisBtm);
            // console.log('viewTop : ' + viewTop);
            // console.log('viewBtm : ' + viewBtm);

            if (viewBtm >= thisTop) {
               $this.children('span').css('transform', 'translateY(-' + value + 'px)');
            }
         });
      }
      parallaxFunc('floating');
   });
});

   
$(document).ready(function() {

      var $windowHeight = $(window).height();
      var $documentWidhth = $(window).width();

      $('.gnb').css({'height': ($windowHeight),'width': ($documentWidhth)});

      $(".nav").on("click",function(){
            $("this , .pr, .close_nav").addClass("off");
            $(".gnb, .pr").stop().animate({'left':'0'} , 500);
            $('html').css({'overflow-y': 'hidden','height': '100%'});
      });

      $(".close_nav").on("click", function(){
            $('body').off('scroll touchmove mousewheel');
            $(".gnb, .pr").stop().animate({'left':'-100%'} , 500);
            $(".nav , .pr, .close_nav").removeClass("off");
            $('html').css({'overflow-y': 'auto'});
      });

      $(".btn_search").on("click" , function(){
            $(".search_wrapper").addClass("on");
      });
      $(".search_close").on("click" , function(){
            $(".search_wrapper").removeClass("on");
      });

      $(".btn_gnb01").on("click" , function(){
         $(this).addClass('on');
         $('.btn_gnb02').removeClass('on');
         $(".slider_scroll").fadeIn(200);
      });
      $(".btn_gnb02").on("click" , function(){
         $(this).addClass('on');
         $('.btn_gnb01').removeClass('on');
         $(".slider_scroll").hide();
         $(".slider_scroll.exhibition").fadeIn(200);
      });
      
      $(".slider_scroll a ").on("mouseenter",function(){
            $(this).addClass("active");
      });

      $(".slider_scroll a ").on("mouseleave",function(){
            $(this).removeClass("active");
      });


   $(".slick_01").slick({
        loop: true,
         infinite: true,
         speed:500,
         autoplaySpeed:800,
         slidesToShow: 1,
         slidesToScroll: 1, 
         arrows: true, 
         cssEase: 'linear'
   });

   //스크롤 부드럽게
   window.gambitScrollWheelAmount = 10;
   window.gambitScrollKeyAmount = 10;
   window.gambitScrollDecompositionRate = 0.65;
   window.gambitUseRequestAnimationFrame = false;

   // GNB 마우스휠 가로스크롤
   $(".gnb").mousewheel(function(event, delta) {
      this.scrollLeft -= (delta * 50);
      event.preventDefault();
   });
});