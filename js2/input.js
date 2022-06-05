var onKeyDown = function ( event ) {

	switch ( event.keyCode ) {

		case 38: // up
		case 87: // w
			moveForward = true;
			break;

		case 37: // left
		case 65: // a
			moveLeft = true;
			  break;

		case 40: // down
		case 83: // s
			moveBackward = true;
			break;

		case 39: // right
		case 68: // d
			moveRight = true;
			break;

		case 16: //shift
			shift = true;
			break;
		
		case 32: //space
			space = true;
			break;
	}

};

var onKeyUp = function ( event ) {

	switch( event.keyCode ) {

		case 38: // up
		case 87: // w
			moveForward = false;
			break;

		case 37: // left
		case 65: // a
			moveLeft = false;
			break;

		case 40: // down
		case 83: // s
			moveBackward = false;
			break;

		case 39: // right
		case 68: // d
			moveRight = false;
			break;

		case 16: //shift
			shift = false;
			break;
			
		case 32: //space
		space = false;
		break;

	}
};

document.onkeydown = function(e) {
	if (e.keyCode == 69) {
		generateBuilding(controls.getObject().position.x , controls.getObject().position.z, buildingScale);
	}
}

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );
