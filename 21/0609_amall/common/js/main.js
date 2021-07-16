var main = {
	
	stageData					:	{_y : 0 , _w : 0 , _h : 0},			// page information data
	agent							:	null,										// check media(true:PC & false:MOBILE)
	btnTopFlag					:	false,										// button top flag
	video							:	null,
	popVideo					:	null,
	touchStart					:	0,					
	touchDis						:	50,
	touchCur					:	0,					
	touchMove					:	false,	
	visualCur					:	0,
	visualTotal					:	4,

	init : function(){		

		this.video = document.getElementById('main_video');
		this.popVideo = document.getElementById('main_pop_video');
		this.agent = this.checkMedia();

		$('.main_product_slider').slick({
			autoplay: true,
			autoplaySpeed:4000,
			infinite: true,
			arrows:false,
			dots:true
		});

		$('.main_visual_mobile_slider').slick({
			autoplay: true,
			autoplaySpeed:4000,
			infinite: true,
			arrows:false,
			dots:true
		});

		$('.main_visual_mobile_slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
			main.visualCur = currentSlide;
		});


		$('.main_visual').on('touchstart touchmove touchend',function(e){

			if($(window).width() <= 520 && $('.main_visual_pop').is(":visible") == false && $('#pop01').is(":visible") == false){
				
				if(e.type == 'touchstart'){
					main.touchStart = e.touches[0].pageX;
				}else if(e.type == 'touchmove'){				
					main.touchCur = e.touches[0].pageX;				
				}else if(e.type == 'touchend'){									
					if(main.touchCur > main.touchStart){
						//console.log('right');	
						if(main.touchCur > main.touchStart+main.touchDis && main.touchCur != 0){
							main.visualCur = (main.visualCur == 0)?main.visualTotal-1:main.visualCur=main.visualCur-1;
							$('.main_visual_mobile_slider').slick('slickPrev');
						}
					}else{
						//console.log('left');
						if(main.touchCur < main.touchStart-main.touchDis && main.touchCur != 0){
							main.visualCur = (main.visualCur >= main.visualTotal-1)?0:main.visualCur = main.visualCur+1;
							$('.main_visual_mobile_slider').slick('slickNext');
							console.log(main.touchStart + ' : ' + main.touchCur + ' : ' +(main.touchStart-main.touchDis));
						}
					}

					//$('.main_visual_mobile_slider').slick('slickGoTo',main.visualCur);
					

					main.touchStart = 0;
					main.touchCur = 0;
				}
			}						

		});




		$('.main_video_control').click(function(){
			if(main.agent){
				if($(this).hasClass('pause')){
					//정지
					$(this).addClass('play').removeClass('pause');
					main.video.pause();
				}else{
					//재생
					$(this).addClass('pause').removeClass('play');
					main.video.play();
				}
			}else{
				$(this).addClass('play').removeClass('pause');
				mainPop.open('pop01')
			}
		});

		if(!this.agent){
			$('.main_video_control').addClass('play').removeClass('pause');
			main.video.pause();
		}
		
		$('.main_visual').find('.inner .btns > ul > li').each(function(){
			$(this).find('a').attr('href','javascript:;');
		});
		$('.main_visual').find('.inner .btns > ul > li').click(function(){
			
			$('.main_visual_pop').stop(true).fadeIn(450);
			$('.main_visual_pop_data').find('> div').eq($(this).index()).show().siblings('div').hide();
			//$('html').addClass('fix');
		});

		
		this.setStageData();
		this.scroll();
		this.resize();
	},
	
	scroll : function(){

		this.setStageData();

	},
	
	//main resize
	resize : function(){

		this.setStageData();
		this.scroll();

		if(main.stageData._w > 1024){
			var _height = main.stageData._h - 44;
			if(main.stageData._h < 1200){
				$('.main_visual').height(_height);
			}else{
				$('.main_visual').attr('style','');
			}
		}else{
			$('.main_visual').attr('style','');
		}

		var videoParentTarget = $('#video_wrap');
		var videoTarget = $('#main_video');
		var ratio = 16/9;

		var width = videoParentTarget.width(),
			pWidth, // player width, to be defined
			height = videoParentTarget.height(),
			pHeight; // player height, tbd
		// when screen aspect ratio differs from video, video must center and underlay one dimension

		if (width / ratio < height) { // if new video height < window height (gap underneath)
			pWidth = Math.ceil(height * ratio); // get new player width
			videoTarget.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
		} else { // new video width < window width (gap to right)
			pHeight = Math.ceil(width / ratio); // get new player height
			videoTarget.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
		}



	},

	//stage data set
	setStageData : function(){
		main.stageData._y = $(window).scrollTop();
		main.stageData._w = $(window).width();
		main.stageData._h = $(window).height();
	},

	//browser pc mobile check
	checkMedia:function(){
		var UserAgent = navigator.userAgent;
		var UserFlag = true;
		if (UserAgent.match(/iPhone|iPad|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) UserFlag = false
		return UserFlag
	}
}



/*===================================
@ content
===================================*/
var content = {

	stageW			:	0,					
	stageH			:	0,					
	posY				:	0,					
	data				:	[],					
	target			:	null,				
	pageCur			:	-1,				
	navCur			:	-1,				
	len					:	-1,		
	lineArr			:	[],
	lineTotal			:	0,

	init : function(){
		//console.log('content init');
		var _this					=	this;

		agent = main.checkMedia();

		_this.target				=	$('#container');
		_this.len					=	_this.target.find('> section').length;
		_this.stageW			=	$(window).width();
		_this.stageH			=	$(window).height();
		_this.posY				=	$(window).scrollTop();

		_this.lineTotal =  _this.target.find('.main_pharm .list > ul > li').length;
					
		_this.target.find('.main_pharm .list > ul > li').each(function(){
			var _PLINE_TARGET = document.createElement('p');
			var _PLINE_LIGHT = document.createElement('span');
			_PLINE_TARGET.appendChild(_PLINE_LIGHT);
			if($(this).index() < _this.lineTotal-1){
				$('.main_pharm').find('.line_data').append(_PLINE_TARGET);
			}
			_this.lineArr.push(_PLINE_TARGET);
		});
		_this.pharmLine();


		$('.main_pharm').find('.list > ul > li').on('mouseenter mouseleave' , function(e){
			if(e.type == 'mouseenter'){
				$(this).addClass('hover');
			}else{
				$(this).removeClass('hover');
			}

		});


		_this.setData();
		_this.resize();
		_this.scroll();	

		/******************************************************
		@ Window Scroll
		******************************************************/
		$(window).on("scroll",function () {
			content.scroll();			
		});

		/******************************************************
		@ Window Resize
		******************************************************/
		$(window).on("resize",function () {
			content.resize();
		});

	},

	resize : function(){
		this.stageW		=	$(window).width();
		this.stageH		=	$(window).height();
		this.action.pageResize();
		this.pharmLine();

	},

	scroll : function(){
		this.posY		=	$(window).scrollTop();
		this.event.activeHandler(this.posY);
	},

	moveContent : function(_index){
		var _y	=	this.target.find('> div').eq(_index).offset().top;
		content.action.move(_y);
	},

	setData : function(){
		//console.log('setData');
		content.target.find('> section').each(function(){

			var _index	=	$(this).index(),
				 _target	=	$(this);

			content.data[_index] = {

				index		:	_index,
				target	:	_target,
				flag		:	true,

				init : function (){
					var _this = this;					
					
				},

				play : function(posY){
					var _this = this;

					if(_this.flag == true){						

						if(_this.index == 0){							

						} else if(_this.index == 1){

							var _i = 0;
							_this.target.find('.effect_wrap').each(function(){								
								var _delay = (_i * 0.15)+0.1;
								TweenMax.to($(this) , 0.9 , {y : 0 , alpha : 1 , delay : (_i * 0.15)+0.5 , ease:Quad.easeOut});
								//$(this).css({'transition-delay' : _delay+'s'}).addClass('open');
								_i++;
							});

						} else if(_this.index == 2){

							var _i = 0;
							_this.target.find('.effect_wrap').each(function(){								
								var _delay = (_i * 0.15)+1;
								TweenMax.to($(this) , 0.9 , {y : 0 , alpha : 1 , delay : (_i * 0.15)+0.5 , ease:Quad.easeOut});
								//$(this).css({'transition-delay' : _delay+'s'}).addClass('open');
								_i++;
							});

							_this.target.find('.list > ul > li').each(function(){
								var _delay = ($(this).index() * 0.5)+1.3;
								TweenMax.to($(this),0.5,{alpha:1,scale:1,delay:_delay,ease: Back.easeOut});										
							});
							_this.target.find('.line_data > p').each(function(){
								var _delay = ($(this).index() * 0.5)+1.35;
								TweenMax.to($(this).find('span'),0.6,{width:'100%',delay:_delay,ease: Linear.easeNone});										
							});

							TweenMax.to(_this.target.find('.visual'), 2.2 , {scale:1, alpha:1 , ease:Quad.easeOut});
						} else if(_this.index == 3){

							var _i = 0;
							_this.target.find('.effect_wrap').each(function(){								
								var _delay = (_i * 0.15)+1;
								TweenMax.to($(this) , 0.9 , {y : 0 , alpha : 1 , delay : (_i * 0.15)+0.5 , ease:Quad.easeOut});
								//$(this).css({'transition-delay' : _delay+'s'}).addClass('open');
								_i++;
							});

							TweenMax.to(_this.target.find('.visual'), 2.2 , {scale:1, alpha:1 , ease:Quad.easeOut});

						} else if(_this.index == 4){

							var _i = 0;
							_this.target.find('.effect_wrap').each(function(){								
								var _delay = (_i * 0.15)+1;
								TweenMax.to($(this) , 0.9 , {y : 0 , alpha : 1 , delay : (_i * 0.15)+0.5 , ease:Quad.easeOut});
								//$(this).css({'transition-delay' : _delay+'s'}).addClass('open');
								_i++;
							});

							TweenMax.to(_this.target.find('.visual'), 2.2 , {scale:1, alpha:1 , ease:Quad.easeOut});

						} else if(_this.index == 5){

							var _i = 0;
							_this.target.find('.effect_wrap').each(function(){								
								var _delay = (_i * 0.15)+1;
								TweenMax.to($(this) , 0.9 , {y : 0 , alpha : 1 , delay : (_i * 0.15)+0.5 , ease:Quad.easeOut});
								//$(this).css({'transition-delay' : _delay+'s'}).addClass('open');
								_i++;
							});

							TweenMax.to(_this.target.find('.visual'), 2.2 , {scale:1, alpha:1 , ease:Quad.easeOut});

						}

						_this.target.addClass('open');
					}
					_this.flag = false;

					
				},

				reset : function(){
					var _this = this;

						_this.target.removeClass('open');
						
						_this.target.find('.effect_wrap').each(function(){								
							TweenMax.set($(this) , {y : 70 , alpha : 0});
						});

						if(_this.index == 0){							

						} else if(_this.index == 1){														

						} else if(_this.index == 2){
							_this.target.find('.list > ul > li').each(function(){
									TweenMax.set($(this),{alpha:0,scale:0.8});
								});

							_this.target.find('.line_data > p').each(function(){
								TweenMax.set($(this).find('span'),{width:0});
							});

							TweenMax.set(_this.target.find('.visual'),{scale:1.15 , alpha:0});
						} else if(_this.index == 3){

							TweenMax.set(_this.target.find('.visual'),{scale:1.15 , alpha:0});
						} else if(_this.index == 4){

							TweenMax.set(_this.target.find('.visual'),{scale:1.15 , alpha:0});
						} else if(_this.index == 5){

							TweenMax.set(_this.target.find('.visual'),{scale:1.15 , alpha:0});
						}
					_this.flag = true;
				}

			}

			content.data[_index].init();
			content.data[_index].reset();
			if(content.posY >= $(this).offset().top - content.stageH)content.data[_index].play();

		});

	},

	action : {

		move : function(_y){
			$('html , body').stop(true).animate({ scrollTop : _y }, 600);
		},
		
		pageHandler : function(_y){
			if(content.pageCur >= 0){
				content.data[content.pageCur].play(_y);
			}
		},

		pageResize : function(){

		}
		
	},
	
	event : {

		navHandler : function(index){

		},

		activeHandler : function(index){
			//console.log('activeHandler');
			var _bottomHeight	=	content.stageH - 0,
				 _topHeight			=	0;
			
			content.target.find('> section').each(function(){
				if (index >= $(this).offset().top - _bottomHeight) {					
					content.pageCur = $(this).index();
				}
			});

			if(index < content.target.offset().top) content.navCur = -1;
			if(index < content.target.offset().top - _bottomHeight) content.pageCur = -1;
			content.action.pageHandler(index);

		}		

	},

	pharmLine : function(){
		var __target = $('.main_pharm');
		var __line = this.lineArr;
		var dx_1,dy_1,dis_1,angle_1,_y_1,_x_1,_t,_lt,_i,_n;
		

		$('.main_pharm .list > ul > li').each(function(){
			
			_t = $(this);
			_i = $(this).index();
			_n = $(this).next();
			if($(this).index() < __line.length-1){
			
				//_lt = document.getElementById("P_LINE"+$(this).index());
				
				_lt = __line[$(this).index()];
				dx_1 = (_t.offset().left+_t.innerWidth()/2)-(_n.offset().left+(_n.innerWidth()/2));
				dy_1 = (_t.offset().top+_t.innerHeight()/2)-(_n.offset().top+(_n.innerHeight()/2));
				dis_1 = Math.sqrt(dx_1*dx_1+dy_1*dy_1);
				angle_1 = Math.atan2(dy_1,dx_1)*180/Math.PI;
				_y_1 = ((_n.offset().top+(_n.innerHeight()/2))-(_t.offset().top+(_t.innerHeight()/2)))/2+(_t.offset().top+_t.innerHeight()/2)-__target.offset().top;
				_x_1 = ((_n.offset().left+(_n.innerWidth()/2))+_t.offset().left+(_t.innerWidth()*0.5))/2-(dis_1/2)-__target.offset().left;
				_lt.style.width = dis_1+'px';
				_lt.style.top = _y_1+'px';
				_lt.style.left = _x_1+'px';
				_lt.style.webkitTransform = _lt.style.MozTransform = _lt.style.OTransform = _lt.style.msTransform = _lt.style.transform = 'rotate(' + angle_1 + 'deg)'; 
			}
		});		
	}

}

var mainPop = {
	open : function(id){
		$('#'+id).stop(true).fadeIn(300);
		main.popVideo.currentTime = 0;
		main.popVideo.play();
		$('html').addClass('fix');
	},
	close : function(_t){
		main.popVideo.pause();
		$(_t).parents('.pop_wrap').stop(true).fadeOut(300);
		$('html').removeClass('fix');		
	}
}

/******************************************************
@ Init
******************************************************/
$(function () {

	main.init();
	content.init();

});



/******************************************************
@ Document Ready
******************************************************/
$(document).ready(function () {	
	$('#container').addClass('open');
});



/******************************************************
@ Window Load
******************************************************/
$(window).on("load",function () {

});



/******************************************************
@ Window Scroll
******************************************************/
$(window).on("scroll",function () {
	
	main.scroll();
	
});



/******************************************************
@ Window Resize
******************************************************/
$(window).on("resize",function () {
	
	main.resize();

});

