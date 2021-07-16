/* --------------------------------
funcHover JS
-------------------------------- */
// hover add class
// ex) hoverAddClass('.btn', '.quick', 'on');
// ex) .btn을 호버하면 .quick에 on 클래스 삽입
function hoverAddClass(target1, target2, classes) {
	var $target1 = $(target1);
	if ($target1.length) {
		$target1.each(function() {
			$(this).hover(function() {
				$(target2).addClass(classes);
			});
		});
	}
}
// --------------------------------
// hover remove class
// ex) hoverRmvClass('.btn', '.quick', 'on');
// ex) .btn을 호버하면 .quick에서 on 클래스 제거
function hoverRmvClass(target1, target2, classes) {
	var $target1 = $(target1);
	if ($target1.length) {
		$target1.each(function() {
			$(this).hover(function() {
				$(target2).removeClass(classes);
			});
		});
	}
}
// --------------------------------
// hover toggle class
// ex) hoverToglClass('.btn', '.quick', 'on');
// ex) .btn을 호버하면 .quick에 on 클래스 토글
function hoverToglClass(target1, target2, classes) {
	var $target1 = $(target1),
		$target2 = $(target2);
	if ($target1.length) {
		$target1.each(function() {
			if ($target2.hasClass(classes)) {
				$(this).hover(
					function() {
						$target2.removeClass(classes);
					},
					function() {
						$target2.addClass(classes);
					},
				);
			} else {
				$(this).hover(
					function() {
						$target2.addClass(classes);
					},
					function() {
						$target2.removeClass(classes);
					},
				);
			}
		});
	}
}
// --------------------------------
// hover toggle child
// ex) hoverToglChild('.togl_child', 'on');
// ex) .togl_child의 자식요소를 호버하면 호버한 요소만 on 클래스 추가
/* --------------------------------
<ul class="togl_child">
	<li class="on">togl_list_1</li>
	<li>togl_list_2</li>
	<li>togl_list_3</li>
</ul>
-------------------------------- */
function hoverToglChild(toglChild, classes) {
	var $toglChild = $(toglChild);
	if ($toglChild.length) {
		$toglChild.each(function() {
			$(this).children().hover(function() {
				$(this).addClass(classes).siblings().removeClass(classes);
			});
		});
	}
}