
$(window).resize(function() {
	/* POP UP */
	pop_size();
	
});
/* //$(window).resize */


/* ezmark */
function formTemp(){
	if($("input[type='checkbox']").length > 0){
		$("input[type='checkbox']").ezMark(); //checkbox
	}
	if($("input[type='radio']").length > 0){
		$("input[type='radio']").ezMark(); //radio
	}

	$("input[type='checkbox'], input[type='radio']").focusin(function(){
		$(this).parent().addClass('ez_focus');
	});
	$("input[type='checkbox'], input[type='radio']").focusout(function(){
		$(this).parent().removeClass('ez_focus');
	});

	$("input[type='checkbox']").each(function(){
		if($(this).hasClass('hint_chk')){
			$(this).parent().addClass('hint_chk');
		}
	});
}
/*ezmark */

/* POP UP */
function pop_open(t, obj, objClose){
	t.addClass('pop_link');

	if(/iphone|ipad|ipod/i.test(navigator.userAgent)){
		var scrollTop = $(window).scrollTop();
		$('#wrap').css({'position':'fixed', 'top':-scrollTop});
	} else {
		$('body').css('overflow','hidden');
	}
	
	$('.popup_mask').fadeIn();
	$(obj).fadeIn().addClass('on');
	
	pop_size();

	$(obj).find('.popup-body').attr("tabindex", 0);
	$(obj).find('.radio_group').attr("tabindex", 0);
	$(obj).prepend('<span class=\"pop_st\" tabindex=\"0\"></span>');
	$(obj).append('<span class=\"pop_ed\" tabindex=\"0\"></span>');

	$(obj).find('.pop_st').focus();

	$('.pop_st').focusin(function(){
		$(obj).find('.popup-body').focus();
	});
	$('.pop_ed').focusin(function(){
		$(obj).find('.pop_st').focus();
	});



	$(obj).find('.radio_group .ez-radio').click(function(){
		checkedRadio = $(this).next('label').text();
		
		$('.pop_link').text(checkedRadio)
		pop_close(obj);
	});
};

/* popup close */
function pop_close(obj){
	$(obj).fadeOut(function() {

		if(/iphone|ipad|ipod/i.test(navigator.userAgent)){
			var wrapOffset = $('#wrap').offset();
			var winTop = wrapOffset.top - (wrapOffset.top * 2);
			$('#wrap').removeAttr('style');
			$(window).scrollTop(winTop);
		} else {
			$('body').removeAttr('style');
		}

		$(obj).find('.popup-wrap').removeAttr('style');
		$(obj).find('.popup-body').removeAttr('tabindex');
		$(obj).find('.popup-body').removeAttr('style');
		$(obj).find('span.pop_st').remove();
		$(obj).find('span.pop_ed').remove();
		$('.pop_link').focus();

		// setTimeout(function(){ 20201109
			$('.pop_link').removeClass('pop_link');
		// },300);
	}).removeClass('on');
};

/* popup type */
function pop_size(){
	$('.popup.on .popup-wrap').each(function() {
		
		var dW = $(window).width();
		var dH = $(window).height();
		
		if($(this).hasClass('full-size')) {
			
			if($(this).find('.popup-body').hasClass('ty02')){
				$(this).find('.popup-body').css({'max-height':dH - 110, 'min-height':dH - 110});
			} else {
				$(this).find('.popup-body').css('max-height', dH - 110);
			}
		} else if($(this).hasClass('come-up')) {
			var $targetH = $(this).innerHeight();	
			
			$(this).css({
				position:'absolute',
				left:0
			});

		} else {
			$(this).css({
				borderRadius :'5px'
			})
			$(this).width(dW - 60);
			if($(this).closest('.popup').hasClass('notice_pop')){
				$(this).find('.popup-body').css('max-height', dH - 125);
			} else if($(this).closest('.popup').hasClass('notice-pop')) {
				$(this).find('.popup-body .notice-area').css('min-height', 100);				
			} else {
				$(this).find('.popup-body').css('max-height', dH - 175);
			}
		}
	});	
};

/* tooltip */
function tooltip(obj) {
	var $obj = $(obj);
	var $btn = $obj.find('.btn-tooltip');

	$btn.click(function(e){
		e.preventDefault();
		var topLeft = $btn.closest($obj).offset().left;
		$obj.removeClass('on');
		$obj.addClass('on');
		$btn.next('.tooltip-area').css({
			'left' :  topLeft - (topLeft * 2) + 15
		});
		$('.tooltip-area').prepend('<span class=\"tolltip-hit hit-t\"></span>');
		$('.tooltip-area').append('<span class=\"tolltip-hit hit-b\"></span>');
		$('.hit-b, .tooltip-content').attr('tabindex', 0);


		$('.hit-b').bind('focusin',function(){
			$('.tooltip-content').focus();
		});
	
		$('.btn-tooltip-close').bind('click',function(e){
			e.preventDefault();
			$(obj).removeClass('on');
		});		
	});;
};

/* accordian */
function accordian(obj){
	var $obj = $(obj);
	var accHeaer = $obj.find('.accordian-header a');
	
	accHeaer.on('click', function(e){
		e.preventDefault();
		if ($(this).hasClass('active')) {
			// $(this).next('.view').css({
			// 	'display':'none'
			// });
			$(this).removeClass('active').next('.view').slideUp();
		}
		else {
			// $(this).next('.view').css({
			// 	'display':'block'
			// });
			$(this).addClass('active').next('.view').slideDown();
		}
	});
};

function accordianTerms() {
	
}

/* accordian */
function accordianAnother(obj){
	var $obj = $(obj);
	var accHeaer = $obj.find('.accordian-header a');
	
	accHeaer.on('click', function(e){
		e.preventDefault();
		
		if ($(this).hasClass('active') ) {
			$(this).closest('.accordian-header').next('.view').stop().slideUp(300);
			$(this).removeClass('active');
		}
		else {
			$(this).closest('.accordian-header').next('.view').stop().slideDown(300);
			$(this).addClass('active');
		}
	});
};


/* accordian_ty */
$.fn.accordian_ty_new = function(){
	var tar = $(this).closest('.list');
	var foldingChk = tar.hasClass('on');
	// var tarTop = tar.offset().top;

	if (foldingChk){
		tar.find('> .view').slideUp();
		tar.removeClass('on');
		tar.find(' > a > em.blind').text('상세내용보기');
		tar.find(' > .info label a > em.blind').text('상세내용보기');
		tar.find('.item_wrap > a > em.blind').text('상세내용보기');
	} else {
		tar.siblings('.list').removeClass('on').find('> .view').hide();
		// tarTop = tar.offset().top;
		// $("html, body").stop().animate({
		// 	scrollTop: tarTop - 65
		// });
		
		tar.siblings('.list').find(' > a > em.blind').text('상세내용보기');
		tar.siblings('.list').find(' > .info label a > em.blind').text('상세내용보기');
		tar.siblings('.list').find('.item_wrap > a > em.blind').text('상세내용보기');
		tar.find('> .view').slideDown();
		tar.addClass('on');
		tar.find(' > a > em.blind').text('상세내용닫기');
		tar.find(' > .info label a > em.blind').text('상세내용닫기');
		tar.find('.item_wrap > a > em.blind').text('상세내용닫기');
	}
};


$(document).on('click', '.accordian-header > a', function(e){
	e.preventDefault();
	$(this).accordian_ty_new();
	
});

function accordianNew(obj){
	let $obj = $(obj);
	let accHeaer = $obj.find('.acc-header');
	
	accHeaer.on('click', function(e){
		e.preventDefault();
		
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').prev('.acc-content').slideUp();
			$(this).find('.btn-more').text('더보기');
		}	
		else {
			$(this).addClass('active').prev('.acc-content').slideDown();
			$(this).find('.btn-more').text('접기');
		}
	});
};

$(function(){
	/* main tab */
	$('.main-nav a').click(function(e){
		e.preventDefault();
		$(this).closest('.main-nav').find('li').removeClass('on').find('a').removeAttr('title');
		$(this).parents('li').addClass('on').find('a').attr({title:'?¿½?¿½?¿½?¿½Þ´?¿½?¿½?¿½?¿½???¿?'});
		var tCon = $(this).attr("href");
		$(tCon).siblings('.main-con').removeClass('on');
		$(tCon).addClass('on');
	});
	$(".main-nav ul li").each(function(){
		if($(this).hasClass('on')){
			$(this).find('a').attr({title:'?¿½?¿½?¿½?¿½Þ´?¿½?¿½?¿½?¿½???¿?'});
		}
	})	
	/* tab */
	$('.tab_nav a').click(function(e){
		e.preventDefault();
		$(this).closest('.tab_nav').find('li').removeClass('on').find('a').removeAttr('title');
		$(this).parents('li').addClass('on').find('a').attr({title:'현재메뉴선택됨?'});
		var tCon = $(this).attr("href");
		$(tCon).siblings('.tab_con').removeClass('on');
		$(tCon).addClass('on');
	});
	$(".tab_nav ul li").each(function(){
		if($(this).hasClass('on')){
			$(this).find('a').attr({title:'현재메뉴선택됨?'});
		}
	});	


	/* POP UP */
	$('.popup .pop-close').not('.not_close').on('click', function(e){
		e.preventDefault();
		var obj = $(this).closest('.popup');
		pop_close(obj);
	})

	$(window).scroll(function() {
		pop_size();
	});

	/* number animation */
   
    var count = function() {
        let counter = $('.counter');
        counter.counterUp({
			delay: 10,
			time: 1000
        });
	}
	/**/
	



	/*  */
	
	// $('.input-col').keypress(function (e) {
	// 	if(e.keyCode == 13) {
	// 		$(this).closest('li').prev('li').addClass('active')
	// 		if ($(this).closest('li').prev('li').find('.carrier_data').length) {
	// 			var thisBtnli = $(this).closest('li').prev('li')
	// 			thisBtnli.addClass('active');
	// 			thisBtnli.find('.bx-input').addClass('active');
	// 			thisBtnli.find('.carrier_data').focus();
	// 			setTimeout(function(){
	// 				pop_open($(this), '#popCarrierChoice');
	// 				var title = $('.title');
	// 				title.text('통신사를 선택하세요');
	// 				$('.carrier_data').addClass('pop_link');
	// 				$('#popCarrierChoice').find('.radio_group').focus();	
	// 			},100);				
	// 		} else {
				
	// 			$(this).closest('li').prev('li').find('.input-col:first').focus();
	// 		}

			
	// 		$('#popCarrierChoice input[type=radio]').click(function(){
	// 			$('.carrier_data').closest('li').prev('li').addClass('active')
	// 			setTimeout(function(){
	// 				$('.carrier_data').closest('li').prev('li').find('.input-col:first').focus();
	// 			},800);	
	// 		});
	// 	} 

	//  });

	

	 $(".input-col, .bx-input").focusin(function(){
		$(this).parent('div').addClass("active");
		$(this).closest('.list-identify').find('.title').hide();
		$(this).closest('.form-group').prev('.title').show();
	 });
	 	 
     $('#pop01 .btn').click(function(){
         count();
    });
	tooltip('.bx-tooltip');	
	accordian('.accordian');/* 약관동의 */
	accordianAnother('.accordian-another');
	// accordianAnother('.accordian-another-one');
	
	accordianAnother('.accordian-info');
	accordianAnother('.accordian-service');
	accordianAnother('.accordian-attention');
	accordianAnother('.accordian-finance');
	accordianAnother('.accordian-finance-sub');
	accordianNew('.accordinaNew');
	accordianAnother('.accordian-sub');
	
});




$(function(){
	
	function orienChange() {
		var windowW = $(window).width()
		var swiperTabW = $('.swiper-tab-ty01 ul').outerWidth();
	
		if (windowW >= swiperTabW){
			$('.swiper-tab-ty01').addClass('no_scroll')
			
		} else {
			$('.swiper-tab-ty01').removeClass('no_scroll')
		}
	}

	function docSize() {
		let windowHeight =  $(window).height();
		let cotainerNew = $('#container-new');
		let cotainerNewSecond = $('#container-new-second');
		cotainerNewSecond.css({
			'padding-top':'55px',
			
			'box-sizing':'boder-box'				
		})
		cotainerNew.css({
			'padding-top':'55px',
			'min-height':windowHeight-50 +'px',
			'box-sizing':'boder-box'	
		})
	
	}
	/* vertical align */
	function conH() {
		let windowHeight =  $(window).height();
		let middleContainer = $('.middle-container');
		let middleContainerTab = $('.middle-containerTab');
		let middleContainerLogin = $('.middle-containerLogin');
		let middleContainerPolicy = $('.middle-containerPolicy');
		let middleContainerDouble = $('.middle-containerDouble');
		let middleContainerNodanger = $('.middle-containerNodata');
		let middleTab = $('.middleTab');
		let middleTxt = $('.middle-txt');
		middleContainerPolicy.css({
			'height': windowHeight- 600 +'px',
			'position':'relative'
		});
		middleContainerLogin.css({
			'height': windowHeight- 400 +'px',
			'position':'relative'
		});
		middleContainer.css({
			'height': windowHeight - 239 +'px',
			'position':'relative'
		});

		middleContainerTab.css({
			'height': windowHeight - 317 +'px',
			'position':'relative'
		});
		middleContainerDouble.css({
			'height': windowHeight - 450 +'px',
			'position':'relative'
		});			
		middleTab.css({
			'height':'350px'
		})

		middleTxt.css({
			'position':'absolute',
			'top':'50%',
			'transform':'translateY(-50%)',
			'width':'100%',
			'text-align':'center'
		});
		
		
		middleContainerNodanger.css({
			'height': windowHeight - 374 +'px',
			'position':'relative'			
		});		
	}


	docSize();
	conH()
	
    $(window).resize( function() {
		orienChange();
		docSize();
		conH()
    });


	$('.swiper_nav a').click(function(e) {
		var $this = $(this);
		if (!$this.closest('li').hasClass('on')) {
			$('.swiper_nav li').removeClass('on');
			$this.closest('li').addClass('on');
			
			$('.swiper_nav').scrollLeft(25);
            tabsOffset = $this.offset().left;
			$('.swiper_nav').scrollLeft(tabsOffset);
		}
	});
});


// 약관동의

function agreement() {
	let allCheck = $('.terms_check_js .all-check').find('.ez-checkbox'); 
	let ezCheckbox = $('.terms_sub_list_js').find('.ez-checkbox');
	let view = $('.accordian-terms .view');
	let header = $('.accordian-header');
	let target = $('.bx-certificate');
	let subAllcheck = $('.sub-all-check');
	let subDetailcheck = $('.detail-check').find('.ez-checkbox');
	// function init() {
	// 	formTemp();	
	// }
	subAllcheck.click(function(){
		let detailSub = $(this).next('.view').find('.ez-checkbox');
		if(!$(this).find('.ez-checkbox').hasClass('ez-checked')){
			$(this).find('.ez-checkbox').addClass('.ez-checked');
			detailSub.addClass('ez-checked');
			detailSub.find('.ez-hide').prop('checked',true);
		} else {
			$(this).find('.ez-checkbox').removeClass('.ez-checked')
			detailSub.removeClass('ez-checked');
			detailSub.find('.ez-hide').prop('checked',false);
		}
	});
	subDetailcheck.on('click', function(){
		if(subDetailcheck.length == subDetailcheck.hasClass('ez-checked').length){
			alert('dd')
			
		}
	});


	allCheck.click(function(){ 
		let thisEzCheckbox = $(this).closest('.terms_check_js').find('.terms_sub_list_js').find('.ez-checkbox');
		if(!$(this).hasClass('ez-checked')){
	
			thisEzCheckbox.addClass('ez-checked'); // checked class?¿½ß°?¿½
			thisEzCheckbox.find('.ez-hide').prop('checked',true); // checkbox check ?³?¿½?¿½

	
			// if($('.popup-wrap').hasClass('btn_change_js')) {// ?¿½?¿½Æ° ?°?¿½?¿½?­ ?¿½?¿½?°?¿½?¿½?­ ?³?¿½?¿½
			// 	if(!header.hasClass('active')) {
			// 		view.slideDown();
			// 		header.addClass('active');
			// 	}
			// 	$('.btn-big').addClass('btn-ty-primary').removeClass('btn-ty-grey');
			// } 

			if($('.cont_certificate').hasClass('block_change_js')){
				if(!header.hasClass('active')) {
					$('.view-02').slideUp();
					header.addClass('active');
				}
				target.css('display','block');
			}
			

		} else {
			
			thisEzCheckbox.removeClass('ez-checked'); // checked class?¿½?¿½?¿½?¿½
			thisEzCheckbox.find('.ez-hide').prop('checked',false);// checkbox check ?¿½?¿½?¿½?¿½

			
			// if($('.popup-wrap').hasClass('btn_change_js')) {// ?¿½?¿½Æ° ?°?¿½?¿½?­ ?¿½?¿½?°?¿½?¿½?­ ?³?¿½?¿½
			// 	if(!header.hasClass('active')) {
			// 		$(this).parent().next('.view').slideDown();
			// 		header.addClass('active');
			// 	}
			// 	$('.btn-big').addClass('btn-ty-grey').removeClass('btn-ty-primary');
			// }

			if($('.cont_certificate').hasClass('block_change_js')){
				if(header.hasClass('active')) {
					$('.view-02').slideDown();
					header.removeClass('active');
				}				
				target.css('display','block');
			}

		}

	});



	ezCheckbox.click( function(){
		var checkboxLengh =  $(this).closest('.terms_sub_list_js').find('.ez-checkbox').length;
		var thisAllCheck = $(this).closest('.terms_check_js').find('.all-check .ez-checkbox');


		if ($(".terms_sub_list_js input:checked").length == checkboxLengh) {
			thisAllCheck.addClass('ez-checked');
			thisAllCheck.find('.ez-hide').prop('checked',true)


			
			if($('.popup-wrap').hasClass('btn_change_js')) {
				$('.btn-big').addClass('btn-ty-primary').removeClass('btn-ty-grey')
			}
			
			if($('.cont_certificate').hasClass('block_change_js')){
				if(!header.hasClass('active')) {
					$('.view-02').slideUp();
					header.addClass('active');
					
				}				
				target.css('display','block');
			}
		} else {
			thisAllCheck.removeClass('ez-checked');
			thisAllCheck.find('.ez-hide').prop('checked',false)

			
			if($('.popup-wrap').hasClass('btn_change_js')) {
				$('.btn-big').addClass('btn-ty-grey').removeClass('btn-ty-primary')
			}
			
		}
	});
}
	







$(window).load(function(){
    $('.btn-chk-phone input[type=checkbox]').click(function(){
		
		if ($(this).is(":checked")) {
			$(this).closest('.cell-chk-phone').next('.form-group').find('.select-ty, .input-ty').attr('disabled',true).val("");
			$(this).closest('.cell-chk-phone').next('.form-group').find('a').addClass('disabled')
		} else {
			$(this).closest('.cell-chk-phone').next('.form-group').find('.select-ty, .input-ty').attr('disabled',false)
			$(this).closest('.cell-chk-phone').next('.form-group').find('a').removeClass('disabled')
		}

	});
});



$(function(){
	if ($('#wrap').find('.pop_custom_wrap_js').length) {
		$('body').append(
			"<section class='popup custom_wrap_js' id=''><div class='popup-wrap come-up'><div class='popup-header'><h2 class='pop-sub-title'></h2></div><div class='popup-body'><article class='cont'></article></div><a href='#none' class='pop-close'>?¿½?¾?¿½ ?¿½?±?¿½</a></div></section>"
		);	
	}
	
});

$(function(){
	$('.pop_custom_wrap_js .pop_btn_js').click(function(){
		selectHtml = $(this).next('.custom_inner_js').html();
		selectTitle = $(this).next('.custom_inner_js').find('.pop-sub-title').text()
		//console.log(selectHtml, selectTitle);
		$(this).next('.custom_inner_js').children().remove();
		$('.custom_wrap_js').find('.cont').append(selectHtml);
		$('.custom_wrap_js').addClass('on').fadeIn()

	});
});
$(document).on("click", ".custom_wrap_js .ez-hide", function(){
	var thisTxt = $(this).closest('.ez-radio').next('label').html();
	//console.log(thisTxt)
	$('.custom_wrap_js').find('.ez-radio').removeClass('ez-selected');
	$(this).closest('.ez-radio').addClass('ez-selected');

	
});
$(document).on("click", ".custom_wrap_js .circle-check, .pop-close", function(){
	// setTimeout(function(){    20201109
		var athis = $(this)
		//console.log(athis)
		$('.custom_wrap_js').removeClass('on').fadeOut();
	// }, 500);
});

/* button + footer */
$(function(){
	$(window).scroll(function() {
		if($('.fixed-bottom').length){
			//console.log('dd');
			if($(window).scrollTop() + $(window).height() > $('.fixed-bottom').offset().top + 65) {
				$('.fixed-bottom').addClass('off');
			} else {
				$('.fixed-bottom').removeClass('off');
			}
		}

		if($('.fixed-top').length){
			//console.log('dd');
			if($(window).scrollTop()  > 50) {
				$('.fixed-top').addClass('on');
				
			} else {
				$('.fixed-top').removeClass('on');
			}
		}		
	});
});

/* input clear */
function clearInput(){
	var el = $('.input-txt');
	for (let i = 0; i < el.length; i++) {
		el[i].value = '';
		
	}
};


function policyAgreement(obj) {

	
	let $obj = $(obj);
	let allCheck = $obj.find('#allCheck');
	
	let targetBtn = $obj.find('.btn-nxt');
	let detailCheck = $('#accordianTerms').find('.ez-checkbox');





	allCheck.on('click', function(){
		console.log(allCheck);
		if(!$(this).find('.ez-checkbox')){
			
			for (let index = 0; index < detailCheck.length; index++) {
				const element = detailCheck[index];
				console.log(element.length);
				
			}
		} 

	})

}


function callPhone() {
	let titApply = $('.tit-apply');
	titApply.wrap("<div class='tit-top-area'>").append('<a  href="javascript:;" onclick="pop_open($(this), \'#pop_CallInfo\');" class="phone-call" ><span class="blind">전화상담</span></a>')
}

$(function(){
	callPhone();
	policyAgreement('#policyAgreement')
})
