$(function() {
	$('#post').keypress(function(event) {
		if (event.which == 13) {
			var node = document.createElement('div');
			node.setAttribute('class', 'feed-item');
			var d = new Date();
			node.innerHTML = "[" + (d.getMonth()+1) + "/" + d.getDate() + "] " + "<a href='denkrick.html'><b>Anna</b></a>: " + $(this).val();
			$('#board').prepend(node);
			$(this).val('');
		}
	});

	$('.input-comment').keypress(function(event) {
		if (event.which == 13) {
			var node = document.createElement('div');
			node.setAttribute('class', 'comment');
			var d = new Date();
			node.innerHTML = "[" + (d.getMonth()+1) + "/" + d.getDate() + "] " + "<b>Anna:</b> " + $(this).val();
			this.parentNode.insertBefore(node, this);
			$(this).val('');
		}
	});

	<!-- FILTER RECORDINGS -->
	$('#filter').keyup(function() {
		var a = $(this).val();
		if (a.length > 0) {
			children = ($("#accordion1").children());
			var containing = children.filter(function() {
				var regex = new RegExp('\\b'+a, 'i');
				return regex.test($('a', this).text());
			}).slideDown();
			children.not(containing).slideUp();
		} else {
			children.slideDown();
		}
		return false;
	});

	$('#post').focus();
});