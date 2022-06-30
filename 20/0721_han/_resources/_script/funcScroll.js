/* --------------------------------
funcScroll JS
-------------------------------- */
// scroll view top classes
// ex) scrollViewTopAct('.header_inr', '.header_inr', 'fixed');
// ex) 스크롤 할 때 .header_inr가 화면 상단에 닿으면 .header_inr에 fixed 클래스 삽입
function scrollViewTopAct(target1, target2, classes) {
	var $target1 = $(target1),
		$target2 = $(target2);
	if ($target1.length) {
		$target1.each(function() {
			var targetTop = $target1.offset().top;
			$(window).on('scroll resize', function() {
				var viewTop = $(this).scrollTop();
				if (viewTop > targetTop) {
					$target2.addClass(classes);
				} else {
					$target2.removeClass(classes);
				}
			});
		});
	}
}
// --------------------------------
// scroll view bottom classes
// ex) scrollViewBtmAct('.footer', '.btn_top', 'hidden');
// ex) 스크롤 할 때 .footer가 화면 하단에서 올라오면 .btn_top에 hidden 클래스 삽입
function scrollViewBtmAct(target1, target2, classes) {
	var $target1 = $(target1),
		$target2 = $(target2);
	if ($target1.length) {
		$target1.each(function() {
			var $window = $(window);
			var targetTop = $target1.offset().top;
			$window.on('scroll resize', function() {
				var viewTop = $(this).scrollTop(),
					viewBtm = viewTop + $window.innerHeight();
				if (viewBtm > targetTop) {
					$target2.addClass(classes);
				} else {
					$target2.removeClass(classes);
				}
			});
		});
	}
}
// --------------------------------
// scroll ani
// ex) scrollAni('.sec06', '.sec06_inr', 'slideInUp delay-1_4s faster infinite');
// ex) 스크롤 할 때 .sec06이 화면 하단을 올라오면 .sec06_inr에 slideInUp delay-1_4s faster infinite 클래스 삽입하여 애니메이션
function scrollAni(target1, target2, aniClasses) {
	var $target1 = $(target1),
		$target2 = $(target2);
	if ($target1.length) {
		$target1.each(function() {
			var $window = $(window);
			var targetTop = $target1.offset().top - 10;
			$window.on('scroll resize', function() {
				var viewTop = $(this).scrollTop(),
					viewBtm = viewTop + $window.innerHeight();
				if (viewBtm > targetTop) {
					$target2.addClass('animated ' + aniClasses);
				} else {
					$target2.removeClass('animated ' + aniClasses);
				}
			});
		});
	}
}
// --------------------------------
// scroll parallax
// ex) scrollParallax('.paral', '0.1', '-0.5');
// ex) 스크롤 할 때 .paral을 x축은 0.1값, y축은 -0.5값으로 시간차효과
function scrollParallax(target, xValue, yValue) {
	var $target = $(target);
	if ($target.length) {
		$target.each(function() {
			var $window = $(window),
				$this = $(this);
			var targetTop = $this.offset().top,
				targetBtm = targetTop + $this.outerHeight();
			$window.on('load', function() {});
			var loadViewTop = $window.scrollTop(),
				loadViewBtm = loadViewTop + $window.innerHeight();
			if (loadViewBtm > targetTop) {
				$window.on('scroll resize', function() {
					var viewTop = $window.scrollTop(),
						viewBtm = viewTop + $window.innerHeight();
					var valueX = (viewTop - targetTop) * xValue,
						valueY = (viewTop - targetTop) * yValue;
					if (viewTop > 0) {
						$target.css('transform', 'translate(' + valueX + 'px, ' + valueY + 'px)');
					} else {
						$target.css('transform', 'translate(0, 0)');
					}
				});
			} else {
				$window.on('scroll resize', function() {
					var viewTop = $window.scrollTop(),
						viewBtm = viewTop + $window.innerHeight();
					var valueX = (viewBtm - targetTop) * xValue,
						valueY = (viewBtm - targetTop) * yValue;
					if (viewBtm > targetTop) {
						$target.css('transform', 'translate(' + valueX + 'px, ' + valueY + 'px)');
					} else {
						$target.css('transform', 'translate(0, 0)');
					}
				});
			}
		});
	}
}
// --------------------------------
// scroll value check
// ex) scrollValueCheck('.section');
// ex) 스크롤 할 때 .section 기준으로 offset 값을 콘솔창에 출력
function scrollValueCheck(target) {
	var $target = $(target);
	if ($target.length) {
		var $window = $(window);
		var targetTop = $target.offset().top,
			targetBtm = targetTop + $target.outerHeight();
		$window.on('load scroll resize', function() {
			var viewTop = $window.scrollTop(),
				viewBtm = viewTop + $window.innerHeight();
			console.log('+++ ' + target + ' +++');
			console.log(targetTop + ' : targetTop');
			console.log(targetBtm + ' : targetBtm');
			console.log(viewTop + ' : viewTop');
			console.log(viewBtm + ' : viewBtm');
		});
	}
}