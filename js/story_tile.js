function forEach(arr, action){
	var len = arr.length,
	i=0;
	for(;i<len;i++){
		action(arr[i]);
	}
}

$(document).ready(function(){
	var imgSrcArray = [];
	var so = localStorage.getItem('storyObject') || JSON.stringify({});
	var currentTileId;
	so = JSON.parse(so);
	imgSrcArray = so.tiles || [];
	currentTileId = so.currentTileId;
	console.log(so);

	// create thumbnail images for footer from storyobject
	forEach(imgSrcArray, function(i){
		var img = document.createElement('img');
		img.src = i.imgSrc;
		img.setAttribute('tile-id', i.tileId);
		if(i.tileId == currentTileId){
			img.className += ' current-tile';
			$('#question').val(so.tiles[currentTileId].question);
			$('#answer').val(so.tiles[currentTileId].answer);
			$('#prompt').val(so.tiles[currentTileId].prompt);
			// set canvas thumbnail
			$('.canvas img').get(0).src = i.imgSrc;	
		}
		$('.main-section-footer').append(img);
		// add click handler to footer thumbnails
		$(img).click(function(e){
			$('.canvas img').get(0).setAttribute('src', i.imgSrc);
			// change the current tile in local storage
			currentTileId = e.target.getAttribute('tile-id');
			so.currentTileId = currentTileId;
			console.log(so);
			localStorage.setItem('storyObject', JSON.stringify(so));
			// change the class name
			var previousCurrentTile = $('.main-section-footer img.current-tile').get(0);
			$(previousCurrentTile).removeClass('current-tile');
			$(e.target).addClass('current-tile');
			// populate text boxes
			$('#question').val(so.tiles[currentTileId].question);
			$('#answer').val(so.tiles[currentTileId].answer);
			$('#prompt').val(so.tiles[currentTileId].prompt);

		})
	});
	
	// toolbar click handlers
	// add images
	$('.toolbar-content').on('click', '.add-image', function(){
		window.location = '/avaz-project/story_home_page_new_story.html';
	});
	// save
	$('.toolbar-content').on('click', '#save', function(){
		// update the current tile's question, answer, prompt and notes
		console.log(currentTileId);
		so.tiles[currentTileId].question = $('#question').val();
		so.tiles[currentTileId].answer = $('#answer').val();
		so.tiles[currentTileId].prompt = $('#prompt').val();
		localStorage.setItem('storyObject', JSON.stringify(so));
		console.log(so.tiles);
	});
	// copy -- change the copy icon !
	$('.toolbar-content').on('click', '#copy', function(){
		// create a new thumbnail image
		// copy data from current tile 
		// insert into local storage
		var newTile = {imgSrc:so.tiles[currentTileId].imgSrc, question:so.tiles[currentTileId].question, answer:so.tiles[currentTileId].answer, prompt:so.tiles[currentTileId].prompt, comments:so.tiles[currentTileId].comments, notes:so.tiles[currentTileId].notes, tileId:so.tiles.length};
		so.tiles.push(newTile);
		so.currentTileId = newTile.tileId;
		localStorage.setItem('storyObject', JSON.stringify(so));
		console.log(so.tiles);

		var img = document.createElement('img');
		img.src = newTile.imgSrc;
		img.setAttribute('tile-id',newTile.tileId);
		$('.main-section-footer').append(img);
		
	});
});

