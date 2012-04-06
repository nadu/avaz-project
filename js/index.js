$(document).ready(function(){
	$('.main-content').on("click", "#create-new-story", function(event){
		window.location = '/avaz-project/story_home_page_new_story.html';
	});

	$('.main-content').on("click", "#edit-story", function(event){
		window.location = '/avaz-project/story_home_page_all_tiles.html';
	});


})