$(function(){
	$(window).resize (resizeBox).resize();
	function resizeBox(){
		function scrollEvent() {
		 	var locS =  $(window).scrollTop();
			if(locS > 80){
				$('header').addClass('top');
			}else{
                $('header').removeClass('top');
            }
		}
		$(window).scroll(function() {
			scrollEvent();
		});
		$(window).resize(function() {
			scrollEvent();
		});
	}
    
    $('#keyword').keyup(function() {
        var k = $(this).val();
        $('.card_list .list').hide();
        var temp = $(".card_list .list .tit:contains('" + k + "')");
        $(temp).closest('.list').fadeIn();
        $('html, body').stop().animate({scrollTop:$('#wrap').offset().top}, 800);
    });
    
	$('.card_list .more .link').click(function(){
        $(this).closest('.list').addClass('chk');
        $(this).closest('.list').find('.dep').addClass('on');
        $('body').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
		return false;
	});
	$('.btn_close').click(function(){
        $(this).closest('.list').removeClass('chk');
        $(this).closest('.list').find('.dep').removeClass('on');
        $('body').off('scroll touchmove mousewheel');
		return false;
	});
	$('.card_list .list .dep a').click(function(){
        $(this).closest('.list').removeClass('chk');
        $(this).closest('.list').find('.dep').removeClass('on');
        $('body').off('scroll touchmove mousewheel');
	});

	$('.snb a').click(function(){	
        $('.snb a').removeClass('on');
		$(this).addClass('on');
        var s = $(this).attr("href");
        $('.card_list').hide();
		if(s == '#t00'){
			$('.card_list').fadeIn();
		} else {
			$(s).fadeIn();
		}
		return false;
	});
    
    $(document).mousemove(function(e){
        o = $('#wrap').offset();
        $('.dot').css({
            'top': e.pageY - o.top,
            'left': e.pageX - o.left
        });
    });
    
    $('h1, .search, .card_list .list, .snb').mouseover(function(){
        $('.cursor').css('mix-blend-mode','difference');
        $('.dot:nth-child(5)').css('transform','scale(0.4)').css('background','#e35fa4').css('animation','scale2 both ease-Out infinite 1.7s');
        $('.dot:nth-child(4)').css('transform','scale(0.3)')
        $('.dot:nth-child(3)').css('transform','scale(0.25)')
        $('.dot:nth-child(2)').css('transform','scale(0.2)')
        $('.dot:nth-child(1)').css('transform','scale(0.1)')
	});
    $('h1, .search, .card_list .list, .snb').mouseleave(function(){
        $('.cursor').css('mix-blend-mode','color-dodge');
        $('.dot').css('transform','');
        $('.dot:nth-child(5)').css('background','#9C27B0').css('animation','scale both ease-Out infinite 1.7s');
	});
    
});



