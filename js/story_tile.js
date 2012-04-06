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
	currentTileId = parseInt(so.currentTileId,10);

	// set story name from local storage
	$('#story-title').html(so.storyName);

	// create thumbnail images for footer from storyobject
	forEach(imgSrcArray, createFooterThumbnails);

	function createFooterThumbnails(i){
		var img = document.createElement('img');
		img.src = i.imgSrc;
		img.setAttribute('tile-id', i.tileId);
		if(i.tileId == currentTileId){
			img.className += ' current-tile';
			loadContent(currentTileId);
			changeCurrentTileClass(img);
		}
		$('.main-section-footer').append(img);
		// add click handler to footer thumbnails
		$(img).click(function(e){
			// save the changes that were made to questions, answers, notes
			autoSave();
			// change the current tile in local storage
			currentTileId = e.target.getAttribute('tile-id');
			so.currentTileId = currentTileId;
			console.log(so);
			localStorage.setItem('storyObject', JSON.stringify(so));
			// change the class name
			changeCurrentTileClass(e.target);
			// populate text boxes
			loadContent(currentTileId);
		});
	}

	function loadContent(tileId){
		console.log(tileId);
		$('#question').val(so.tiles[tileId].question);
		$('#answer').val(so.tiles[tileId].answer);
		$('#prompt').val(so.tiles[tileId].prompt);
	}
	
	function autoSave(){
		if(isNaN(currentTileId)) return;
		so.tiles[currentTileId].question = $('#question').val();
		so.tiles[currentTileId].answer = $('#answer').val();
		so.tiles[currentTileId].prompt = $('#prompt').val();
		localStorage.setItem('storyObject', JSON.stringify(so));
	}

	function changeCurrentTileClass(el){
		console.log(el);
		var previousCurrentTile = $('.main-section-footer img.current-tile').get(0);
		$(previousCurrentTile).removeClass('current-tile');
		$(el).addClass('current-tile');
		// set canvas thumbnail
		$('.canvas img').attr('src',$(el).attr('src'));	
	}
	
	/* toolbar click handlers */
	// add new tile
	$('.toolbar-content').on('click', '.add-image', function(){
		autoSave();
		window.location = '/avaz-project/story_home_page_new_story.html';
	});

	// save
	$('.toolbar-content').on('click', '#save', function(){
		// empty the tiles in the deletedTiles list

		console.log("organized ", so.tiles);
		// update the current tile's question, answer, prompt and notes
		console.log(currentTileId);
		autoSave();
		so.storyName = $('#story-title').html();
		localStorage.setItem('storyObject', JSON.stringify(so));
		console.log(so.tiles);
	});

	function organizeTiles(tiles){
		var count = 0;
		var flag = false;
		forEach(tiles, function(tile){
			if(!flag && currentTileId == tile.tileId){
				currentTileId = count;
				flag = true;
			}
			$('[tile-id='+tile.tileId+']').attr('tile-id', count);
			tile.tileId = count++;
		});

	}
	// copy tile -- change the copy icon !
	$('.toolbar-content').on('click', '#copy', function(){
		// copy data from current tile (have to copy individually else they are the same object)
		// insert into local storage
		// create a new thumbnail image
		var newTile = {imgSrc:so.tiles[currentTileId].imgSrc, question:so.tiles[currentTileId].question, answer:so.tiles[currentTileId].answer, prompt:so.tiles[currentTileId].prompt, comments:so.tiles[currentTileId].comments, notes:so.tiles[currentTileId].notes, tileId:so.tiles.length};
		so.tiles.push(newTile);
		so.currentTileId = newTile.tileId;
		currentTileId = newTile.tileId;
		localStorage.setItem('storyObject', JSON.stringify(so));
		console.log(so.tiles);
		createFooterThumbnails(so.tiles[currentTileId]);		
	});

	// delete tile
	$('.toolbar-content').on('click', '#delete', function(){
		// hide selected tile
		var deletedTileId = currentTileId;
		//$('.main-section-footer img.current-tile').hide();
		$('[tile-id='+currentTileId+']').hide().attr('tile-id',-99);
		//$('[tile-id='+currentTileId+']').setAttribute('tile-id',-99);
		currentTileId = (currentTileId > 0) ? currentTileId-1 : 1;
		// check if last tile

		changeCurrentTileClass($('[tile-id='+currentTileId+']'));
		loadContent(currentTileId);
		so.deletedTiles.push(deletedTileId);	
		so.tiles.splice(deletedTileId,1);
		organizeTiles(so.tiles);
		console.log(so.tiles);
	});
});

