$(document).ready(function(){
	var so = localStorage.getItem('storyObject') || JSON.stringify({});
	so = JSON.parse(so);
	if(!$.isEmptyObject(so)){
		$('.big-thumbnail').attr('src', so.tiles[0].imgSrc);
	}
});