$(function(){

    $("#fullpage").fullpage({
        autoScrolling:true,
	    scrollHorizontally: true,

        // onLeave: function(index, nextIndex, direction){
        //     var leavingSection = $(this);

        //     if(index == 1 && direction =='down'){
        //         $('.header_wrap').addClass('on');
        //     }else{
        //         $('.header_wrap').removeClass('on');
        //     }
        // }
        'afterLoad': function (anchorLink, index) {
			if (index == 1){
				$('.header_wrap').removeClass("on").addClass('on');
			}else{
                $('.header_wrap').removeClass('on');
            }
		},
    });
});