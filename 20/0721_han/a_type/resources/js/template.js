$(function() {

   // var window
   var $window = $(window);

   // video auto play
   $("#video").get(0).play();
    
   // video cursor
   /*var $videoArea = $('.video_area'),
      $videoCursor = $('.video_cursor');
   var videoCursorFunc = function() {
      var valX = event.pageX,
         valY = event.pageY;
      var cursorX = $videoCursor.innerWidth() / 2,
         cursorY = $videoCursor.innerHeight() / 1.2;
      $videoCursor.show().offset({
         left: valX - cursorX,
         top: valY - cursorY,
      });
   }
   $videoArea.mouseenter(function(event) {
      videoCursorFunc(event);
   });
   $videoArea.mousemove(function(event) {
      videoCursorFunc(event);
   });
   $videoArea.mouseleave(function() {
      $videoCursor.fadeOut(200);
   });*/

   // mouser hover image
   $('.hover_wrap').find('li').each(function() {
      var $this = $(this);

      var mouseImageFunc = function() {
         var valX = event.pageX,
            valY = event.pageY;
         var imgX = $this.find('img').innerWidth() / 2,
            imgY = $this.find('img').innerHeight() / 2;
         $this.siblings().find('a').css('opacity', '.5');
         $this.find('img').show().offset({
            left: valX - imgX,
            top: valY - imgY,
         });
      }
      $this.find('a').mouseenter(function(event) {
         mouseImageFunc(event);
      });
      $this.find('a').mousemove(function(event) {
         mouseImageFunc(event);
      });
      $this.find('a').mouseleave(function() {
         $this.siblings().find('a').css('opacity', '1');
         $this.find('img').fadeOut(200);
      });
   });

   // scroll resize event
   $window.on('scroll resize', function() {
      var viewTop = $window.scrollTop(),
         viewBtm = viewTop + $window.innerHeight();

      // overlay parallax
      $('.overlay').not('.overlay.active').each(function() {
         var $this = $(this),
            $thisBg = $(this).find('.bg');
         var thisHeight = $this.innerHeight(),
            thisTop = $this.offset().top;
         var trValue = (viewBtm - thisTop) + 100,
            scValue = ((Math.floor((thisHeight - trValue) / 2)) / 1000) + 1;

         if ((viewBtm >= thisTop) && (trValue <= thisHeight)) {
            $thisBg.css('transform', 'scale(' + scValue + ')' + 'translateY(-' + (thisHeight - trValue) + 'px)');
         } else if ((viewBtm >= thisTop) && (trValue > thisHeight)) {
            $thisBg.css('transform', 'scale(1)' + 'translateY(0)');
         }
      });
   });

   // load scroll resize event
   $window.on('load scroll resize', function() {
      var viewTop = $window.scrollTop(),
         viewBtm = viewTop + $window.innerHeight();

      // navi
      /*$('.naviTrigger').each(function() {
         var $this = $(this);
         var thisTop = $this.offset().top + 200,
            thisBtm = thisTop + $this.outerHeight() - 250,
            thisId = $this.attr('id');
         var $thisNavi = $('.btn_navi').find('.' + thisId);

         if (viewBtm > thisTop && viewBtm <= thisBtm) {
            $thisNavi.show();
            $thisNavi.siblings().hide();
         }
      });*/

      // anisview
      $('.overlay .txt01').anisview({
         animation: 'fadeInDown',
      });
      $('.overlay .txt02').anisview({
         animation: 'fadeInLeft',
      });
      $('.hover_wrap li').anisview({
         animation: 'fadeInRight',
      });

   });

   // navi
   var $html = $('html'),
      $body = $('body'),
      $wrap = $('#wrap');
   var htmlHeight = $html.innerHeight(),
      wrapHeight = $wrap.innerHeight();

   $('.btn_navi').on('click', function(event) {
      event.preventDefault();
      $(this).hide();
      $('.navi').addClass('active');
      $('.container').addClass('active');
      $('.overlay').addClass('active');
      $('.bg_video').addClass('active');
      $html.add($body).add($wrap).innerHeight(htmlHeight / 2);
   });
   $('.btn_close').on('click', function(event) {
      event.preventDefault();
      $('.btn_navi').show();
      $('.navi').removeClass('active');
      $('.container').removeClass('active');
      $('.overlay').removeClass('active');
      $('.bg_video').removeClass('active');
      $html.add($body).add($wrap).removeAttr('style');
   });
   $('.menu').hover(function() {
      $(this).find('.over').stop().slideDown(300);
      $(this).siblings().find('.over').stop().slideUp(300);
	  $(this).find('.txt_over01').attr('src','./resources/images/txt_navi_01_hover.png');
	  $(this).find('.txt_over02').attr('src','./resources/images/txt_navi_02_hover.png');
   });
   $('.menu').mouseleave(function() {
	  $(this).find('.txt_over01').attr('src','./resources/images/txt_navi_01.png');
	  $(this).find('.txt_over02').attr('src','./resources/images/txt_navi_02.png');
   });

   // search
   /*$('.btn_search').on('click', function(event) {
      event.preventDefault();
      var $search = $('.search');
      $search.removeClass('ani');
      $search.toggleClass('active');
   });*/
   
   /*$('.bg_video2').hide();
   $('.video_cursor').on('click', function(event) {
      event.preventDefault();
      $('.bg_video').hide();
      $('.bg_video2').show();
   });*/

   // rolling text
   var rollPosition = '-=50';
   var bgLoop = function() {
      $('.txt_roll').stop().animate({
         'background-position': rollPosition
      }, 500, 'linear', bgLoop);
   }
   bgLoop();

   // slider
   var showsSwiper = new Swiper('.shows_slider', {
      slidesPerView: 2,
      grabCursor: true,
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
   });
   var issueSwiper = new Swiper('.issue_slider', {
      slidesPerView: 'auto',
      spaceBetween: 80,
      freeMode: true,
      freeModeMomentumRatio: .5,
      freeModeMomentumVelocityRatio: .3,
      grabCursor: true,
   });
   var newsSwiper = new Swiper('.news_slider', {
      slidesPerView: 'auto',
      spaceBetween: 100,
      freeMode: true,
      freeModeMomentumRatio: .5,
      freeModeMomentumVelocityRatio: .3,
      grabCursor: true,
   });


});