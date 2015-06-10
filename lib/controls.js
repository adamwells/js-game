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

	window.addEventListener("keydown", function(event) {
      if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
      }
    }, false);
})();