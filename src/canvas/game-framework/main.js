var FPS=30;

var SECONDS_BETWEEN_FRAMES=1/FPS;

var g_GameObjectManager=null;

var g_image=new Image();
g_image.src="smiley.jpg";

window.onload=init;

function init(){
	new GameObjectManager().startupGameObjectManager();
}