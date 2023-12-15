$(document).ready(function(){
	$(".button-search").click(function() {
		$(".form-search").toggle('slow/400/fast', function() {
			$(this).css({
				transition: 'all 1s'
			});
		});
	});
});