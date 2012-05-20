$(document).ready(function(){
	var imgSrcArray = [];
	var so = localStorage.getItem('storyObject') || JSON.stringify({});
	so = JSON.parse(so);
	var selectedStudents = so.selectedStudents.length ? so.selectedStudents : AVAZ.students ;
	// get the student images
	$.each(selectedStudents, function(index, student){
		 $('.main-section').append("<div class='selected-student' style='background:url("+student.img+") no-repeat center center'> <span>"+student.name+"</span></div>");		  	
	});

});