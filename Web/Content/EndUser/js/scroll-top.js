$(window).scroll(function(){
	if($(window).scrollTop() >= 20) {
		$('.scroll').show();
	} else {
		$('.scroll').hide();
	}
});

function scrolltop(){
	$('html,body').animate({
		scrollTop: 0
	}, 'slow');
}