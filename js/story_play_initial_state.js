//story_play_initial_state
$(document).ready(function(){
	$('.answer-tag').on('click', function(){
			$('.btn-container').show();
			$(this).hide();
			$('.main-section-footer').addClass('show-options');
	})
});
