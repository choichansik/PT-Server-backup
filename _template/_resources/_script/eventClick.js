/* --------------------------------
eventClick JS
-------------------------------- */

$(function() {

	// click totop
	$('.btn_top').each(function() {
		$(this).on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, 600, 'easeInOutQuad');
		});
	});

	// click goto
	$('.btn_goto').each(function() {
		$(this).on('click', function(event) {
			event.preventDefault();
			var target = $(this).attr('href');
			var targetTop = $(target).offset().top;
			$('html, body').animate({
				scrollTop: targetTop
			}, 600, 'easeInOutQuad');
		});
	});

	// click popup
	$('.btn_pop').each(function() {
		$(this).on('click', function(event) {
			event.preventDefault();
			var target = $(this).attr('href');
			$(target).show();
			$('#mask').show();
			$('body').addClass('locked');
		});
	});
	$('.btn_close').each(function() {
		$(this).on('click', function(event) {
			event.preventDefault();
			$(this).parent().hide();
			$('#mask').hide();
			$('body').removeClass('locked');
		});
	});

	// click show
	$('.btn_show').each(function() {
		$(this).on('click', function(event) {
			event.preventDefault();
			var target = $(this).attr('href');
			$(target).show();
		});
	});

	// click hide
	$('.btn_hide').each(function() {
		$(this).on('click', function(event) {
			event.preventDefault();
			var target = $(this).attr('href');
			$(target).hide();
		});
	});

	// click toggle
	$('.btn_togl').each(function() {
		$(this).on('click', function(event) {
			event.preventDefault();
			var target = $(this).attr('href');
			if ($(target).is(':hidden')) {
				$(target).show();
			} else {
				$(target).hide();
			}
		});
	});

});