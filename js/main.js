;(function() {
	$(document).ready(function() {
		var directoryAPI = 'http://apis.scottylabs.org/directory/v1/andrewID/';
		var $searchField =  $('#searchID');
		$searchField.focus();
		$searchField.keypress(function(e) {
			var key = e.which;
			if (key == 13) {
				$.ajax(directoryAPI.concat($searchField.val()), {
					timeout: 3000,
					success: function(student) {
						if (Array.isArray(student.department) && student.department.length > 0) {
							student.department = student.department[0];
						}
						$('.student-info').show();
						$('.student-info').addClass('animated zoomIn');
						$('.error').hide();
						$('.circle').html(student.first_name.charAt(0) + student.last_name.charAt(0));
						$('.fullname').html(student.first_name + ' ' + student.last_name);
						$('.username').html(student.andrewID ? student.andrewID : "N/A");
						$('.department').find('.content').html(student.department ? student.department : "N/A");
						$('.affiliation').find('.content').html(student.affiliation ? student.affiliation : "N/A");
						$('.level').find('.content').html(student.student_level ? student.student_level : "N/A");
						$('.class').find('.content').html(student.student_class ? student.student_class : "N/A");
						$('.campus').find('.content').html(student.campus ? student.campus : "N/A");
						$('.email').find('.content').html(student.preferred_email ? student.preferred_email : "N/A");
					},
					error: function() {
						$('.student-info').hide();
						$('.error').show();
						$('.error').addClass('animated zoomIn');
					},
					beforeSend: function() {
						$('.student-info').hide();
						$('.error').hide();
						$('.loading').addClass('wrapper');
						$('.loading-bar').addClass('cssload-loader');
					},
					complete: function () {
						$('.loading').removeClass('wrapper');
						$('.loading-bar').removeClass('cssload-loader');
						$searchField.select();
					}
				});
			}
		});
	});
})();