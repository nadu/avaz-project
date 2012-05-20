function forEach(arr, action){
	var len = arr.length,
	i=0;
	for(;i<len;i++){
		action(arr[i]);
	}
}
function filter(arr, condition){
	var results = [];
	forEach(arr, function(i){
		if(condition(i))
			results.push(i);
	});
	return results;
}

$(document).ready(function(){
	var so = localStorage.getItem('storyObject') || JSON.stringify({});
	so = JSON.parse(so);
  var selectedStudents = so.selectedStudents || [];
  console.log(so); 
	if(!$.isEmptyObject(so)){
		$('.big-thumbnail').attr('src', so.tiles[0].imgSrc);
	}
  // show selected students if they exist
  if(selectedStudents.length){
    $.each(selectedStudents, function(index, val){
      addToSelectedStudents(val, true);
    })
  }
  function addToSelectedStudents(student,cacheFlag){

    if(cacheFlag !== true){
      // add to the array - push to local storage when save is clicked
      selectedStudents.push(student);
    }
    // TODO check if already added to DOM?
    // if yes then don't add to the container

    // insert the image into the screen
    $('.selected-students-container').append("<div class='selected-student' style='background:url("+student.img+") no-repeat center center'> <span>"+student.name+"</span></div>");
  }
  
	var values = AVAZ.students;
	// values to be passed to the autocomplete method is an array of objects with the property of value
	// when a particular value is selected, a callback function is called with the entire object
	$('#students').autocomplete({values:values, key:'name'},
    function(student){
	   	console.log(student);
      // insert the image into the screen
      // $('.selected-students-container').append("<div class='selected-student'><img src='"+student.img+"' /><span>"+student.name+"</span></div>");
      addToSelectedStudents(student);
      $('#students').val('');
  });
  $('.toolbar-content').on('click', '#save', function(){
    $('.loading-icon').show();
    so.selectedStudents = selectedStudents;
    localStorage.setItem('storyObject', JSON.stringify(so));    
    setTimeout(function(){ $('.loading-icon').hide();}, 500);
  });

  // clear local storage
  $('.toolbar-content').on('click', '#off', function(){
    //$('#canvas-area').append("<div style='width:50px; height:20px; border:1px solid #333; background-image:url(img/comments.png) no-repeat'></div>");
    localStorage.clear();
    window.location = '/avaz-project/story_home_page.html'
  });

});