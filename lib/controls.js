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

	window.addEventListener("keydown", function(e) {
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);
})();