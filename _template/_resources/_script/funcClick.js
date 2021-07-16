/* --------------------------------
funcClick JS
-------------------------------- */
// click add class
// ex) clickAddClass('.btn', '.quick', 'on');
// ex) .btn을 클릭하면 .quick에 on 클래스 삽입
function clickAddClass(target1, target2, classes) {
	var $target1 = $(target1);
	if ($target1.length) {
		$target1.each(function() {
			$(this).on('click', function() {
				$(target2).addClass(classes);
			});
		});
	}
}
// --------------------------------
// click remove class
// ex) clickRmvClass('.btn', '.quick', 'on');
// ex) .btn을 클릭하면 .quick에서 on 클래스 제거
function clickRmvClass(target1, target2, classes) {
	var $target1 = $(target1);
	if ($target1.length) {
		$target1.each(function() {
			$(this).on('click', function() {
				$(target2).removeClass(classes);
			});
		});
	}
}
// --------------------------------
// click toggle class
// ex) clickToglClass('.btn', '.quick', 'on');
// ex) .btn을 클릭하면 .quick에 on 클래스 토글
function clickToglClass(target1, target2, classes) {
	var $target1 = $(target1);
	if ($target1.length) {
		$target1.each(function() {
			$(this).on('click', function() {
				$(target2).toggleClass(classes);
			});
		});
	}
}
// --------------------------------
// click toggle child
// ex) clickToglChild('.togl_child', 'on');
// ex) .togl_child의 자식요소를 클릭하면 클릭한 요소만 on 클래스 추가
function clickToglChild(toglChild, classes) {
	var $toglChild = $(toglChild);
	if ($toglChild.length) {
		$toglChild.each(function() {
			$(this).children().on('click', function() {
				$(this).addClass(classes).siblings().removeClass(classes);
			});
		});
	}
}
/* --------------------------------
<ul class="togl_child">
	<li class="on">togl_list_1</li>
	<li>togl_list_2</li>
	<li>togl_list_3</li>
</ul>
-------------------------------- */
// --------------------------------
// click tab panel
// ex) clickTabPanel('.tab_panel', '.tab_btn', '.tab_cont');
// ex) .tab_panel 안에 .tab_btn과 .tab_cont 구성
function clickTabPanel(tabPanel, tabBtn, tabCont) {
	var $tabPanel = $(tabPanel);
	if ($tabPanel.length) {
		$tabPanel.each(function() {
			$(this).find(tabBtn).on('click', function() {
				var $this = $(this);
				var index = $this.index();
				$this.addClass('on').siblings().removeClass('on');
				$this.parent().siblings(tabCont).eq(index).addClass('active').siblings(tabCont).removeClass('active');
			});
		});
	}
}
/* --------------------------------
<div class="tab_panel">
	<ul class="tab_btn_wrp">
		<li class="tab_btn on">tab_btn_1</li>
		<li class="tab_btn">tab_btn_2</li>
	</ul>
	<div class="tab_cont active">
		<div class="tab_cont_inr">
			tab_cont_1
		</div>
	</div>
	<div class="tab_cont">
		<div class="tab_cont_inr">
			tab_cont_2
		</div>
	</div>
</div>
-------------------------------- */
