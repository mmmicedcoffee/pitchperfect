$(function() {
	var user = "Anna";

	$('.input-comment').keypress(function(event) {
		if (event.which == 13) {
			var node = document.createElement('div');
			node.setAttribute('class', 'comment');
			var d = new Date();
			node.innerHTML = "[" + (d.getMonth()+1) + "/" + d.getDate() + "] " + "<b>" + user + ":</b> " + $(this).val();
			this.parentNode.insertBefore(node, this);
			$(this).val('');
		}
	});
});