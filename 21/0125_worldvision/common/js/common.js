/******************************************************
@ Init
******************************************************/
$(function () {
	mResizeCheck		=	$(window).width();				/* ios resize scroll bug */
    npos					=	$(window).scrollTop();			/* scroll top position */
    SW					=	$(window).width();				/* window width */
    SH						=	$(window).height();				/* window height */   

	common.init();
	swiper.ready();
	swiper.init();
	agent = common.checkMedia();

	/******************************************************
	@ Document Ready
	******************************************************/
	$(document).ready(function () {	
		swiper.init();
		$('.gnb_menu').addClass('transition');
	});

	/******************************************************
	@ Window Load
	******************************************************/
	$(window).on("load",function () {
		swiper.init();
	});

	/******************************************************
	@ Window Scroll
	******************************************************/
	$(window).on("scroll",function () {
		npos	=	$(window).scrollTop();	
		SW	=	$(window).width();		
		SH		=	$(window).height();		
		common.scroll();		
	});

	/******************************************************
	@ Window Resize
	******************************************************/
	$(window).on("resize",function () {
		npos	=	$(window).scrollTop();	
		SW	=	$(window).width();		
		SH		=	$(window).height();	

		if (mResizeCheck != $(window).width()) {				
			common.resize();
			common.scroll();
			mResizeCheck = $(window).width();	
		}	

		if($('.recruit_main').length > 0){
			recruitMain();
		}	
		
	});

	if($('.recruit_main').length > 0){
		recruitMain();
	}

});


/**********************************
@ common
**********************************/
var common = {

    btnTopFlag: false,
	locationTarget : null,
	headerTarget : null,
	gnbTarget : null,
	gnbMenu : null,
	gnbCur : 0,
	gnbHeight : [],
	videoArr : [],

    init: function () {		

		var _this = this;
		_this.locationTarget = $('#location');
		_this.headerTarget = $('#header');
		_this.gnbTarget = $('#gnb');
		_this.gnbMenu = $('.gnb_menu');
		
		/* ????????? 20190327 ?????? ????????? */
		/*
		_this.gnbTarget.find('.inner > ul > li').each(function(){
			$(this).find('> a').attr('data-url',$(this).find('>a').attr('href'));
			$(this).find('> a').append('<span></span>');
		});
		*/

		_this.gnbMenu.find('.inner > ul > li').each(function(){
			$(this).find('> a').attr('data-url',$(this).find('>a').attr('href'));
			$(this).find('> a').append('<span></span>');
			if($(this).hasClass('actived'))common.gnbCur = $(this).index();
			if(SW > 1024){
				common.gnbHeight.push($(this).find('.snb_wrap').height());
			}
		});
		/* ????????? 20190327 ?????? ??? ????????? */

		_this.gnbMenu.find('.inner > ul > li > a').click(function(){			
			if(SW <= 1024){
				if($(this).parent().hasClass('mobileOpen')){
					$(this).parent().removeClass('mobileOpen');
					common.headerTarget.removeClass('mobileOpen');
				}else{
					var _index = $(this).parent().index();
					$(this).parent().addClass('mobileOpen').siblings().removeClass('mobileOpen');
					common.headerTarget.addClass('mobileOpen');
					common.gnbMenu.find('.inner > ul > li').each(function(){
						if($(this).index() == _index){
							$(this).find('.snb_wrap').stop(true).show().scrollTop(0);
						}else{
							$(this).find('.snb_wrap').stop(true).hide();
						}
					});
				}
			}
		});

		_this.locationTarget.find('.menu_title').on('click',function(){
			var _parent		=	$(this).parent();
			if(_parent.hasClass('open')){
				_parent.removeClass('open');
			}else{
				_parent.addClass('open');
			}
		});

		_this.gnbMenu.find('.inner > ul > li').on('mouseenter focusin',function(){
			if(SW > 1024){
				if(!common.gnbMenu.hasClass('open')){
					common.gnbMenu.addClass('open');
					common.gnbTarget.addClass('open');
					common.headerTarget.addClass('open');
					var _maxHeight = Math.max.apply(null,common.gnbHeight);
					//console.log(_maxHeight);
					common.gnbMenu.height(_maxHeight + 79);
					$('#wrap').find('.gnb_cover').stop(true).fadeIn(500);
				}
			}
		});

		_this.gnbMenu.on('mouseleave focusout',function(){
			if(SW > 1024){
				if(common.gnbMenu.hasClass('open')){
					common.gnbMenu.removeClass('open');
					common.gnbTarget.removeClass('open');
					common.headerTarget.removeClass('open');
					common.gnbMenu.height(79);
					$('#wrap').find('.gnb_cover').stop(true).fadeOut(500);
				}
			}
		});


		$('body').on("click",function(e) { 					
			if($(e.target).parents('.location_menu_list').length == 0) {
				$('#location').find('.location_menu_list').each(function(){
					if($(this).hasClass('open')){
						$(this).removeClass('open');
					}
				});
			}
		}); 		

		$('.btn_header_menu').click(function(){
			common.mobileMenuCheck();
		});


		$(document).on('click' , '.btn_pop_close' , function(e){
			e.preventDefault();
			$(this).parents('.pop_parents').stop(true).fadeOut(350);
			$('html').removeClass('fix');	
		});


		$(document).on('click' , '.btn_alert_pop_close' , function(e){
			e.preventDefault();
			$(this).parents('.pop_parents').stop(true).fadeOut(350);			
			$('html').removeClass('fix');
		});

		$(document).on('click' , '.detail_tab .btn_item' , function(e){
			e.preventDefault();
			var _parents = $(this).parents('.detail_tab');
			var _index = $(this).parent().index();
			_parents.find('> li').eq(_index).addClass('actived').siblings().removeClass('actived');
			_parents.next().find('> div').eq(_index).show().siblings().hide();
		});
		
		if($('.wide_video').length > 0){
			var _videoIndex = 0;
			$('.wide_video').each(function(){
				var _video = new videoUI($(this) , _videoIndex);
				common.videoArr.push(_video);
				_videoIndex ++;
			});
		}

		$('#wrap').append('<div class="gnb_cover"></div>');

		/* ???????????? ????????? ?????? */
		//if($('.application_family_table').length > 0)applicationFamily.init();
		//if($('.application_career_table').length > 0)applicationCareer.init();
		//if($('.application_qualification_table').length > 0)applicationQualification.init();
		//if($('.application_foreign_table').length > 0)applicationForeign.init();

		this.scroll();
		this.resize();
	},

	scroll : function(){
		
		/*
		if (npos >= 100) {
            if (!common.btnTopFlag) {
                $('#btn_top_scroll').stop(true).fadeIn(300);
            }
            common.btnTopFlag = true;

        } else {
            if (common.btnTopFlag) {
                $('#btn_top_scroll').stop(true).fadeOut(300);
            }
            common.btnTopFlag = false;
        }
		*/

		if(npos >= 45 && SW > 1024){
			this.headerTarget.addClass('scrollFix');
		}else{
			this.headerTarget.removeClass('scrollFix');
		}
	},

	resize : function(){
		this.scroll();

		/* ????????? 20190327 ?????? ????????? */
		if(SW > 1024){
			//desk
			if(this.headerTarget.hasClass('open')){
				this.headerTarget.removeClass('open');
				this.gnbTarget.removeClass('open');
				$('html').removeClass('fix');
			}

			this.gnbMenu.find('.inner > ul > li').each(function(){
				var _url = $(this).find('> a').attr('data-url');
				$(this).find('> a').attr('href' , _url);
				$(this).removeClass('mobileOpen');
			});

			this.headerTarget.removeClass('mobileOpen');
			this.headerTarget.find('.snb_wrap').attr('style','');

		}else{
			//mobile
			this.headerTarget.removeClass('scrollFix');
			this.gnbMenu.attr('style','');
			this.gnbMenu.find('.inner > ul > li').each(function(){				
				$(this).find('> a').attr('href' ,'javascript:;');
			});
		}
		
		if(SW > 1024 && common.gnbHeight.length > 0) common.gnbHeight.length = 0;
		this.gnbMenu.find('.inner > ul > li').each(function(){
			if(SW > 1024){
				common.gnbHeight.push($(this).find('.snb_wrap').height());
			}
		});
		/* ????????? 20190327 ?????? ??? ????????? */

	},

	//mobileMenuCheck
	mobileMenuCheck : function(){
		if(this.headerTarget.hasClass('open')){
			$('html').removeClass('fix');
			this.headerTarget.removeClass('open');
			this.gnbTarget.removeClass('open');
		}else{
			$('html').addClass('fix');
			this.headerTarget.addClass('open');
			this.gnbTarget.addClass('open');
		}
			
	},

	// accordion click content data sort
	accordionOpen : function(_obj){
		var target	=	$(_obj);
		var parent	=	target.parents('.accordion_list');

		parent.find('> li').each(function(){

			if($(this).index() == target.parent().index()){

				if($(this).hasClass('actived')){
					$(this).removeClass('actived');
					$(this).find('.data').slideUp(450);
				}else{
					$(this).addClass('actived');
					$(this).find('.data').stop(true).slideDown(450);
				}						
			}else{
				$(this).removeClass('actived');
				$(this).find('.data').stop(true).slideUp(450);
			}

		});
	},

	// accordion content data sort
	accordionSort : function(_index){
		$('.accordion_list').find('> li').eq(_index).addClass('actived').find('.data').show();
	},

	parentScrollDisable : function(){		
		$('body').on('scroll touchmove mousewheel', function(e){
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
	},

	parentScrollEnable : function(){
		$('body').off('scroll touchmove mousewheel');
	},

	getParameter:function(key){
		var url = location.href;
		var spoint = url.indexOf("?");
		var query = url.substring(spoint, url.length);
		var keys = new Array;
		var values = new Array;
		var nextStartPoint = 0;
		while (query.indexOf("&", (nextStartPoint + 1)) > -1) {
			var item = query.substring(nextStartPoint, query.indexOf("&", (nextStartPoint + 1)));
			var p = item.indexOf("=");
			keys[keys.length] = item.substring(1, p);
			values[values.length] = item.substring(p + 1, item.length);
			nextStartPoint = query.indexOf("&", (nextStartPoint + 1));
		}
		item = query.substring(nextStartPoint, query.length);
		p = item.indexOf("=");
		keys[keys.length] = item.substring(1, p);
		values[values.length] = item.substring(p + 1, item.length);
		var value = "";
		for (var i = 0; i < keys.length; i++) {
			if (keys[i] == key) {
				value = values[i];
			}
		}
		return value;
	},

	checkMedia:function(){
		var UserAgent = navigator.userAgent;
		var UserFlag = true;
		if (UserAgent.match(/iPhone|iPad|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) UserFlag = false
		return UserFlag
	},

	getScrollBarWidth : function () {
		var inner = document.createElement('p');
		inner.style.width = "100%";
		inner.style.height = "200px";

		var outer = document.createElement('div');
		outer.style.position = "absolute";
		outer.style.top = "0px";
		outer.style.left = "0px";
		outer.style.visibility = "hidden";
		outer.style.width = "200px";
		outer.style.height = "150px";
		outer.style.overflow = "hidden";
		outer.appendChild (inner);

		document.body.appendChild (outer);
		var w1 = inner.offsetWidth;
		outer.style.overflow = 'scroll';
		var w2 = inner.offsetWidth;
		if (w1 == w2) w2 = outer.clientWidth;

		document.body.removeChild (outer);

		return (w1 - w2);
	}
};

function recruitMain(){
	var _height = $(window).height() - 44;
	if(SW > 1024){
		if(SH > 768){
			$('.recruit_main').css({'height' : _height +'px'});
			console.log('recruitMain');
		}else{
			$('.recruit_main').css({'height' : '768px'});
		}
	}else{
		$('.recruit_main').attr('style','');
	}
}



/**********************************
@ video
**********************************/
/* ????????? 20190325 ?????? ????????? */
var videoUI = function(_video , _idx){
	var _this = this,
		 _index = _idx,
		 _target = _video,
		 _parentTarget = _target.parents('.video_wrap'),
		 _videoControl = _parentTarget.find('.video_control');
		 _videoControl.addClass('first');
	
	this.init = function(){

		_videoControl.click(function(){
			if($(this).hasClass('pause')){
				//??????
				$(this).addClass('play').removeClass('pause');
				_target.get(0).pause();
				_videoControl.addClass('first');
				_videoControl.show();
			}else{
				//??????
				$(this).addClass('pause').removeClass('play');
				_target.get(0).play();
				if(_videoControl.hasClass('first')){
					_videoControl.removeClass('first');
					_videoControl.hide();
				};

			}
		});

	
		_parentTarget.on('mouseleave mousemove mouseenter', function(e){
			if(e.type == 'mouseenter'){
				_videoControl.show();
			}else if(e.type == 'mousemove'){
				if(!_videoControl.hasClass('first')){
				_videoControl.show();
				}
			}else if(e.type == 'mouseleave'){
				if(!_videoControl.hasClass('first')){
					_videoControl.hide();
				}
			}
		});


	}

	this.resize = function(){
		var ratio = 16/9;

		var width = _parentTarget.width(),
			pWidth, // player width, to be defined
			height = _parentTarget.height(),
			pHeight; // player height, tbd
		// when screen aspect ratio differs from video, video must center and underlay one dimension

		if (width / ratio < height) { // if new video height < window height (gap underneath)
			pWidth = Math.ceil(height * ratio); // get new player width
			_target.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
		} else { // new video width < window width (gap to right)
			pHeight = Math.ceil(width / ratio); // get new player height
			_target.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
		}
	}

	this.init();
	this.resize();

	window.addEventListener('resize' , _this.resize);
}
/* ????????? 20190325 ?????? ??? ????????? */

/**********************************
@ swiper tab 
**********************************/
var swiper = {
	init : function(){
		if($('.page_tab').length){
			$('.page_tab').each(function(){
				if($(this).hasClass('overflow')){
					var _scrollTarget = $(this).find('> ul');
					var _x = 0;
					_scrollTarget.find('> li ').each(function(){
						if($(this).hasClass('actived')){
							_x = $(this).position().left;						
						}
					});
					_scrollTarget.scrollLeft(_x);

					var _width = 0;
					var _len = _scrollTarget.find('> li').length;
					_scrollTarget.find('> li').each(function(){_width = Math.ceil(_width + _scrollTarget.width())});
			
					if(_scrollTarget.scrollLeft() == 0){
						//
						_scrollTarget.parent().removeClass('move_end').addClass('move_first');
					}else if(_scrollTarget.scrollLeft() >= (_width-_scrollTarget.width()-_len)){
						_scrollTarget.parent().removeClass('move_first').addClass('move_end');
					}else{
						_scrollTarget.parent().removeClass('move_first move_end');
					}						


				}
			});
		}

		if($('.con_tab').length){
			$('.con_tab').each(function(){
				if($(this).hasClass('overflow')){
					var _scrollTarget = $(this).find('> ul');
					var _x = 0;
					_scrollTarget.find('> li ').each(function(){
						if($(this).hasClass('actived')){
							_x = $(this).position().left;						
						}
					});
					_scrollTarget.scrollLeft(_x);

					var _width = 0;
					var _len = _scrollTarget.find('> li').length;
					_scrollTarget.find('> li').each(function(){_width = Math.ceil(_width + _scrollTarget.width())});
			
					if(_scrollTarget.scrollLeft() == 0){
						//
						_scrollTarget.parent().removeClass('move_end').addClass('move_first');
					}else if(_scrollTarget.scrollLeft() >= (_width-_scrollTarget.width()-_len)){
						_scrollTarget.parent().removeClass('move_first').addClass('move_end');
					}else{
						_scrollTarget.parent().removeClass('move_first move_end');
					}		
				}
			});
		}
	},

	ready : function(){
		if($('.page_tab').length){
			$('.page_tab').each(function(){
				if($(this).hasClass('overflow')){
					$(this).append('<button type="button" class="page_tab_ui ui_prev"></button>');
					$(this).append('<button type="button" class="page_tab_ui ui_next"></button>');

					$(this).find('> ul').on('scroll' , function(){
						var _width = 0;
						var _len = $(this).find('> li').length;
						$(this).find('> li').each(function(){_width = Math.ceil(_width + $(this).width())});
				
						if($(this).scrollLeft() == 0){
							//
							$(this).parent().removeClass('move_end').addClass('move_first');
						}else if($(this).scrollLeft() >= (_width-$(this).width()-_len)){
							$(this).parent().removeClass('move_first').addClass('move_end');
						}else{
							$(this).parent().removeClass('move_first move_end');
						}						

						//console.log($(this).scrollLeft());

					});
				}				
			});
	
			/*	
			$('.page_tab').find('.ui_prev').click(function(){
				var _scrollTarget = $(this).parents('.page_tab').find('> ul');
				var _x = _scrollTarget.scrollLeft() - 150;
				//_scrollTarget.scrollLeft(_x);
				_scrollTarget.stop(true).animate({'scrollLeft':_x}, {queue:false, duration:450});
			});

			$('.page_tab').find('.ui_next').click(function(){
				var _scrollTarget = $(this).parents('.page_tab').find('> ul');
				var _x = _scrollTarget.scrollLeft() + 150;
				//_scrollTarget.scrollLeft(_x);
				_scrollTarget.stop(true).animate({'scrollLeft':_x}, {queue:false, duration:450});
			
			});
			*/
		}

		if($('.con_tab').length){
			$('.con_tab').each(function(){
				if($(this).hasClass('overflow')){
					$(this).append('<button type="button" class="page_tab_ui ui_prev"></button>');
					$(this).append('<button type="button" class="page_tab_ui ui_next"></button>');

					$(this).find('> ul').on('scroll' , function(){
						var _width = 0;
						var _len = $(this).find('> li').length;
						$(this).find('> li').each(function(){_width = Math.ceil(_width + $(this).width())});
				
						if($(this).scrollLeft() == 0){
							//
							$(this).parent().removeClass('move_end').addClass('move_first');
						}else if($(this).scrollLeft() >= (_width-$(this).width()-_len)){
							$(this).parent().removeClass('move_first').addClass('move_end');
						}else{
							$(this).parent().removeClass('move_first move_end');
						}						

						//console.log($(this).scrollLeft());

					});
				}				
			});
	
			/*	
			$('.con_tab').find('.ui_prev').click(function(){
				var _scrollTarget = $(this).parents('.con_tab').find('> ul');
				var _x = _scrollTarget.scrollLeft() - 150;
				//_scrollTarget.scrollLeft(_x);
				_scrollTarget.stop(true).animate({'scrollLeft':_x}, {queue:false, duration:450});
			});

			$('.con_tab').find('.ui_next').click(function(){
				var _scrollTarget = $(this).parents('.con_tab').find('> ul');
				var _x = _scrollTarget.scrollLeft() + 150;
				//_scrollTarget.scrollLeft(_x);
				_scrollTarget.stop(true).animate({'scrollLeft':_x}, {queue:false, duration:450});
			
			});
			*/
		}
		

	}
}


/**********************************
@ pop view 
**********************************/
var pop = {
	open : function(id){
		$('#'+id).stop(true).fadeIn(300);
		$('html').addClass('fix');
	},
	close : function(_t){
		$(_t).parents('.pop_wrap').stop(true).fadeOut(300);
		$('html').removeClass('fix');		
	}
}


function fileChange(_target) {
    var _t = $(_target);
    var _val = _t.val();
    _t.siblings("input[type='text']").val(_val);
}

function addInputFile(t) {
    var _t = $(t);
    var _p = _t.parents('.file_upload_wrap');
    var _line = '';
    _line += '<div class="upload_file">'
_line += '<input type="file" name="mulityFile'+($("input:file").length+1)+'" onchange="fileChange(this);" />'
    _line += '<input type="text" name="mulityFileTxt'+($("input:file").length+1)+'" readonly/>'
    _line += '<button type="button" class="btn_file">????????????</button>'
    _line += '<button type="button" onclick="deleteFile(this)" class="btn_file_del"></button>'
    _line += '</div>'
    _p.append(_line);
}

function deleteFile(t) {
    var _t = $(t);
    var _p = _t.parents('.upload_file');
    _p.remove();
}

function addressPopSort(t){
	var _index = $(t).parent().index();
	var _parent = $(t).parent();
	_parent.addClass('actived').siblings().removeClass('actived');
	
	$('.pop_address').find('> div').eq(_index).show().siblings().hide();

}

/* ???????????? ?????? ??? */
var applicationFamily = {
	cur : -1,				// ?????? ??????
	total : 10,			// ?????? ??????
	data : [],			// ?????? ????????? ?????????
	htmlTag : '',
	dataTarget : null,
	init : function(){
		applicationFamily.dataTarget = $('.application_family_table');
		applicationFamily.cur = applicationFamily.dataTarget.find('> table').length -1 ;

		// html ?????? 
		applicationFamily.htmlTag += '<table class="input_vertical">'
		applicationFamily.htmlTag += '	<caption>???????????? ?????? ?????????</caption>'
		applicationFamily.htmlTag += '	<colgroup>'
		applicationFamily.htmlTag += '		<col style="width:162px;">'
		applicationFamily.htmlTag += '		<col style="width:auto;">'
		applicationFamily.htmlTag += '		<col style="width:162px;">'
		applicationFamily.htmlTag += '		<col style="width:auto;">'
		applicationFamily.htmlTag += '	</colgroup>'
		applicationFamily.htmlTag += '	<tbody>'
		applicationFamily.htmlTag += '		<tr>'
		applicationFamily.htmlTag += '			<th>??????/??????</th>'
		applicationFamily.htmlTag += '			<td>'
		applicationFamily.htmlTag += '				<div class="relation_wrap">'
		applicationFamily.htmlTag += '					<div class="select">'
		applicationFamily.htmlTag += '						<select>'
		applicationFamily.htmlTag += '							<option value="">??????</option>'
		applicationFamily.htmlTag += '						</select>'
		applicationFamily.htmlTag += '					</div>'
		applicationFamily.htmlTag += '					<div><input type="text" style="max-width:295px;"></div>'
		applicationFamily.htmlTag += '				</div>'
		applicationFamily.htmlTag += '			</td>'
		applicationFamily.htmlTag += '			<th>????????????/??????</th>'
		applicationFamily.htmlTag += '			<td>'
		applicationFamily.htmlTag += '				<div class="mulity_average">'
		applicationFamily.htmlTag += '					<div><input type="text" name="" id=""></div>'
		applicationFamily.htmlTag += '					<div><input type="text" name="" id=""></div>'
		applicationFamily.htmlTag += '				</div>'
		applicationFamily.htmlTag += '			</td>'
		applicationFamily.htmlTag += '		</tr>'
		applicationFamily.htmlTag += '		<tr>'
		applicationFamily.htmlTag += '			<th>??????/??????</th>'
		applicationFamily.htmlTag += '			<td>'
		applicationFamily.htmlTag += '				<div class="relation_wrap">'
		applicationFamily.htmlTag += '					<div class="select">'
		applicationFamily.htmlTag += '						<select>'
		applicationFamily.htmlTag += '							<option value="">??????</option>'
		applicationFamily.htmlTag += '						</select>'
		applicationFamily.htmlTag += '					</div>'
		applicationFamily.htmlTag += '					<div><input type="text" style="max-width:295px;"></div>'
		applicationFamily.htmlTag += '				</div>'
		applicationFamily.htmlTag += '			</td>'
		applicationFamily.htmlTag += '			<th>????????????</th>'
		applicationFamily.htmlTag += '			<td>'
		applicationFamily.htmlTag += '				<select style="max-width:175px;">'
		applicationFamily.htmlTag += '					<option value="">??????</option>'
		applicationFamily.htmlTag += '				</select>'
		applicationFamily.htmlTag += '			</td>'
		applicationFamily.htmlTag += '		</tr>'
		applicationFamily.htmlTag += '	</tbody>'
		applicationFamily.htmlTag += '</table>'
		
		// + ?????????
		$(document).on('click' , '.btn_family_add' , function(){
			applicationFamily.addCell();
		});

		// - ?????????
		$(document).on('click' , '.btn_family_del' , function(){
			applicationFamily.delCell();
		});

		applicationFamily.sortData();

	},

	sortData : function(){
		if(applicationFamily.data.length > 1) applicationFamily.data.length = 0;
	
		applicationFamily.dataTarget.find('> table').each(function(){
			applicationFamily.data.push($(this));
		});
	},
	
	addCell : function(){
		if(applicationFamily.cur < applicationFamily.total - 1){
			//??? ??????
			applicationFamily.cur ++;
			applicationFamily.dataTarget.append(applicationFamily.htmlTag);
			applicationFamily.sortData();
		}else{
			// ?????????
			alert('?????? 10????????? ?????? ???????????????.');
		}
		//console.log(applicationFamily.cur);
	},

	delCell : function(){
		if(applicationFamily.cur > 0){
			//??? ??????
			applicationFamily.data[applicationFamily.cur].remove();
			applicationFamily.cur --;
		}else{
			// ?????????
			alert('?????? 1??? ?????? ??????????????? ?????????.');
		}
		//console.log(applicationFamily.cur);
	}
}

/* ???????????? ?????? ??? */
var applicationCareer = {
	cur : -1,				// ?????? ??????
	total : 10,			// ?????? ??????
	data : [],			// ?????? ????????? ?????????
	htmlTag : '',
	dataTarget : null,
	init : function(){
		applicationCareer.dataTarget = $('.application_career_table');
		applicationCareer.cur = applicationCareer.dataTarget.find('> table').length -1 ;

		// html ?????? 
		applicationCareer.htmlTag += '<table class="input_vertical">'
		applicationCareer.htmlTag += '<caption>???????????? ?????? ?????????</caption>'
		applicationCareer.htmlTag += '<colgroup>'
		applicationCareer.htmlTag += '	<col style="width:162px;">'
		applicationCareer.htmlTag += '	<col style="width:auto;">'
		applicationCareer.htmlTag += '	<col style="width:162px;">'
		applicationCareer.htmlTag += '	<col style="width:auto;">'
		applicationCareer.htmlTag += '</colgroup>'
		applicationCareer.htmlTag += '<tbody>'
		applicationCareer.htmlTag += '	<tr>'
		applicationCareer.htmlTag += '		<th>?????????</th>'
		applicationCareer.htmlTag += '		<td><input type="text" style="max-width:295px;" value=""></td>'
		applicationCareer.htmlTag += '		<th>????????????</th>'
		applicationCareer.htmlTag += '		<td>'
		applicationCareer.htmlTag += '			<div class="date_mulity">'
		applicationCareer.htmlTag += '				<div><div class="d_wrap"><input type="text" name="" id="" class="datepicker"></div></div>'
		applicationCareer.htmlTag += '				<div><div class="d_wrap"><input type="text" name="" id="" class="datepicker"></div></div>'
		applicationCareer.htmlTag += '			</div>'
		applicationCareer.htmlTag += '		</td>'
		applicationCareer.htmlTag += '	</tr>'
		applicationCareer.htmlTag += '	<tr>'
		applicationCareer.htmlTag += '		<th>????????????/??????</th>'
		applicationCareer.htmlTag += '		<td><input type="text" style="max-width:295px;"></td>'
		applicationCareer.htmlTag += '		<th>??????</th>'
		applicationCareer.htmlTag += '		<td>'
		applicationCareer.htmlTag += '			<select style="max-width:175px;">'
		applicationCareer.htmlTag += '				<option value="">??????</option>'
		applicationCareer.htmlTag += '			</select>'
		applicationCareer.htmlTag += '		</td>'
		applicationCareer.htmlTag += '	</tr>'
		applicationCareer.htmlTag += '	<tr>'
		applicationCareer.htmlTag += '		<th>????????????</th>'
		applicationCareer.htmlTag += '		<td colspan="3">'
		applicationCareer.htmlTag += '			<select style="max-width:175px;">'
		applicationCareer.htmlTag += '				<option value="">??????</option>'
		applicationCareer.htmlTag += '			</select>'
		applicationCareer.htmlTag += '		</td>'
		applicationCareer.htmlTag += '	</tr>'
		applicationCareer.htmlTag += '</tbody>'
		applicationCareer.htmlTag += '</table>'
												
		// + ?????????
		$(document).on('click' , '.btn_career_add' , function(){
			applicationCareer.addCell();
		});

		// - ?????????
		$(document).on('click' , '.btn_career_del' , function(){
			applicationCareer.delCell();
		});

		applicationCareer.sortData();

	},

	sortData : function(){
		applicationCareer.data.length = 0;
	
		applicationCareer.dataTarget.find('> table').each(function(){
			applicationCareer.data.push($(this));
		});
	},
	
	addCell : function(){
		if(applicationCareer.cur < applicationCareer.total - 1){
			//??? ??????
			applicationCareer.cur ++;
			applicationCareer.dataTarget.append(applicationCareer.htmlTag);
			applicationCareer.sortData();
			$(".datepicker").datepicker({
				showOn:"both",
				buttonImage:"../images/datepicker/btn_datepicker.png",
				buttonImageOnly:true,
				dateFormat: 'yy-mm-dd',
				prevText: '?????? ???',
				nextText: '?????? ???',
				monthNames: ['1???','2???','3???','4???','5???','6???','7???','8???','9???','10???','11???','12???'],
				monthNamesShort: ['1???','2???','3???','4???','5???','6???','7???','8???','9???','10???','11???','12???'],
				dayNames: ['???','???','???','???','???','???','???'],
				dayNamesShort: ['???','???','???','???','???','???','???'],
				dayNamesMin: ['???','???','???','???','???','???','???'],
				showMonthAfterYear: true,
				yearSuffix: '???',
				yearRange: "1900:2100",
				changeMonth: true,
				changeYear: true
			});

		}else{
			// ?????????
			alert('?????? 10????????? ?????? ???????????????.');
		}
		console.log(applicationCareer.cur);
	},

	delCell : function(){
		if(applicationCareer.cur > 0){
			//??? ??????
			applicationCareer.data[applicationCareer.cur].remove();
			applicationCareer.cur --;
		}else{
			// ?????????
			alert('?????? 1??? ?????? ??????????????? ?????????.');
		}
		//console.log(applicationCareer.cur);
	}
}

/* ???????????? ?????? ??? */
var applicationQualification = {
	cur : -1,				// ?????? ??????
	total : 10,			// ?????? ??????
	data : [],			// ?????? ????????? ?????????
	htmlTag : '',
	dataTarget : null,
	init : function(){
		applicationQualification.dataTarget = $('.application_qualification_table');
		applicationQualification.cur = applicationQualification.dataTarget.find('> table').length -1 ;

		// html ?????? 
		applicationQualification.htmlTag += '<table class="input_vertical">'
		applicationQualification.htmlTag += '<caption>???????????? ?????? ?????????</caption>'
		applicationQualification.htmlTag += '<colgroup>'
		applicationQualification.htmlTag += '	<col style="width:162px;">'
		applicationQualification.htmlTag += '	<col style="width:auto;">'
		applicationQualification.htmlTag += '	<col style="width:162px;">'
		applicationQualification.htmlTag += '	<col style="width:auto;">'
		applicationQualification.htmlTag += '</colgroup>'
		applicationQualification.htmlTag += '<tbody>'
		applicationQualification.htmlTag += '	<tr>'
		applicationQualification.htmlTag += '		<th>????????????</th>'
		applicationQualification.htmlTag += '		<td><input type="text" style="max-width:295px;"></td>'
		applicationQualification.htmlTag += '		<th>?????????</th>'
		applicationQualification.htmlTag += '		<td><input type="text" style="max-width:295px;"></td>'
		applicationQualification.htmlTag += '	</tr>'
		applicationQualification.htmlTag += '	<tr>'
		applicationQualification.htmlTag += '		<th>?????????</th>'
		applicationQualification.htmlTag += '		<td colspan="3"><input type="text" style="max-width:295px;"></td>'
		applicationQualification.htmlTag += '	</tr>'
		applicationQualification.htmlTag += '</tbody>'
		applicationQualification.htmlTag += '</table>'
		
		// + ?????????
		$(document).on('click' , '.btn_qualification_add' , function(){
			applicationQualification.addCell();
		});

		// - ?????????
		$(document).on('click' , '.btn_qualification_del' , function(){
			applicationQualification.delCell();
		});

		applicationQualification.sortData();

	},

	sortData : function(){
		if(applicationQualification.data.length > 1) applicationQualification.data.length = 0;
	
		applicationQualification.dataTarget.find('> table').each(function(){
			applicationQualification.data.push($(this));
		});
	},
	
	addCell : function(){
		if(applicationQualification.cur < applicationQualification.total - 1){
			//??? ??????
			applicationQualification.cur ++;
			applicationQualification.dataTarget.append(applicationQualification.htmlTag);
			applicationQualification.sortData();
		}else{
			// ?????????
			alert('?????? 10????????? ?????? ???????????????.');
		}
		//console.log(applicationQualification.cur);
	},

	delCell : function(){
		if(applicationQualification.cur > 0){
			//??? ??????
			applicationQualification.data[applicationQualification.cur].remove();
			applicationQualification.cur --;
		}else{
			// ?????????
			alert('?????? 1??? ?????? ??????????????? ?????????.');
		}
		//console.log(applicationQualification.cur);
	}
}

/* ??????????????? ?????? ??? */
var applicationForeign = {
	cur : -1,				// ?????? ??????
	total : 10,			// ?????? ??????
	data : [],			// ?????? ????????? ?????????
	htmlTag : '',
	dataTarget : null,
	init : function(){
		applicationForeign.dataTarget = $('.application_foreign_table');
		applicationForeign.cur = applicationForeign.dataTarget.find('> table').length -1 ;

		// html ?????? 
		applicationForeign.htmlTag += '<table class="input_vertical">'
		applicationForeign.htmlTag += '<caption>??????????????? ?????? ?????????</caption>'
		applicationForeign.htmlTag += '<colgroup>'
		applicationForeign.htmlTag += '	<col style="width:162px;">'
		applicationForeign.htmlTag += '	<col style="width:auto;">'
		applicationForeign.htmlTag += '	<col style="width:162px;">'
		applicationForeign.htmlTag += '	<col style="width:auto;">'
		applicationForeign.htmlTag += '</colgroup>'
		applicationForeign.htmlTag += '<tbody>'
		applicationForeign.htmlTag += '	<tr>'
		applicationForeign.htmlTag += '		<th>????????????</th>'
		applicationForeign.htmlTag += '		<td><input type="text" style="max-width:295px;"></td>'
		applicationForeign.htmlTag += '		<th>????????????</th>'
		applicationForeign.htmlTag += '		<td><input type="text" style="max-width:295px;"></td>'
		applicationForeign.htmlTag += '	</tr>'
		applicationForeign.htmlTag += '	<tr>'
		applicationForeign.htmlTag += '		<th>????????????/??????</th>'
		applicationForeign.htmlTag += '		<td>'
		applicationForeign.htmlTag += '			<div class="mulity_average">'
		applicationForeign.htmlTag += '				<div><input type="text" name="" id=""></div>'
		applicationForeign.htmlTag += '				<div><input type="text" name="" id=""></div>'
		applicationForeign.htmlTag += '			</div>'
		applicationForeign.htmlTag += '		</td>'
		applicationForeign.htmlTag += '		<th>????????????/??????</th>'
		applicationForeign.htmlTag += '		<td>'	
		applicationForeign.htmlTag += '			<div class="relation_wrap">'
		applicationForeign.htmlTag += '				<div class="select">'
		applicationForeign.htmlTag += '					<select>'
		applicationForeign.htmlTag += '						<option value="">??????</option>'
		applicationForeign.htmlTag += '					</select>'
		applicationForeign.htmlTag += '				</div>'
		applicationForeign.htmlTag += '				<div><input type="text" style="max-width:295px;"></div>'
		applicationForeign.htmlTag += '			</div>'
		applicationForeign.htmlTag += '		</td>'
		applicationForeign.htmlTag += '	</tr>'
		applicationForeign.htmlTag += '</tbody>'
		applicationForeign.htmlTag += '</table>'
		
		// + ?????????
		$(document).on('click' , '.btn_foreign_add' , function(){
			applicationForeign.addCell();
		});

		// - ?????????
		$(document).on('click' , '.btn_foreign_del' , function(){
			applicationForeign.delCell();
		});

		applicationForeign.sortData();

	},

	sortData : function(){
		if(applicationForeign.data.length > 1) applicationForeign.data.length = 0;
	
		applicationForeign.dataTarget.find('> table').each(function(){
			applicationForeign.data.push($(this));
		});
	},
	
	addCell : function(){
		if(applicationForeign.cur < applicationForeign.total - 1){
			//??? ??????
			applicationForeign.cur ++;
			applicationForeign.dataTarget.append(applicationForeign.htmlTag);
			applicationForeign.sortData();
		}else{
			// ?????????
			alert('?????? 10????????? ?????? ???????????????.');
		}
		//console.log(applicationForeign.cur);
	},

	delCell : function(){
		if(applicationForeign.cur > 0){
			//??? ??????
			applicationForeign.data[applicationForeign.cur].remove();
			applicationForeign.cur --;
		}else{
			// ?????????
			alert('?????? 1??? ?????? ??????????????? ?????????.');
		}
		//console.log(applicationForeign.cur);
	}
}

function familyLink(_select){
	window.open(_select.value,'_blank');
	_select.selectedIndex = "0";
}