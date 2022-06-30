

   
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
            //$('body').off('scroll touchmove mousewheel');
            $(".gnb, .pr").stop().animate({'left':'-100%'} , 500);
            $(".nav , .pr, .close_nav").removeClass("off");
            $('html').css({'overflow-y': 'auto'});
      });



});



















