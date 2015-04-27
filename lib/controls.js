(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var currentlyPressed = Relativity.currentlyPressed = {};
	addEventListener('keydown', function (event) {
		currentlyPressed[event.keyCode] = true;
	}, false);
 
	addEventListener('keyup', function (event) {
		delete currentlyPressed[event.keyCode];
	}, false);
})();