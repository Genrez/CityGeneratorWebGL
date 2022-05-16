/*
		var raycaster = new THREE.Raycaster();
        var selectedObj = false;
		 
function onDocumentMouseDown( event ) {
   var mouse = new THREE.Vector2;
   mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
   mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

   raycaster.setFromCamera( mouse, camera );

   var intersects = raycaster.intersectObjects( scene.children, false );

   if ( intersects.length > 0 ) {
	   if ((intersects[ 0 ].object.name=="loaded_mesh")&&(!selectedObj))
	   {
		 console.log("Selected!");
		 var FaceI=intersects[ 0 ].face;
		 intersects[ 0 ].object.material.color= new THREE.Color(1,0.5,0.5);
		 selectedObj = true;
	   }
	   if ((intersects[ 0 ].object.name!="loaded_mesh")&&(selectedObj))
	   {
		 mesh.material.color= new THREE.Color(0.9,0.9,0.9);
		 var pos=intersects[0].point;
		 console.log("Placed!");
		 mesh.position.x=pos.x;
		 mesh.position.y=pos.y;
		 selectedObj = false;
	   }
   }
}


function onDocumentKeyDown(event) {
    if (event.keyCode == 69) {
        if (selectedObj) {
            scene.remove(mesh);
            selectedObj = false;
        }
    }
}

document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'keydown', onDocumentKeyDown, false );
*/