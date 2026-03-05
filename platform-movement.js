/* Copyright (C) 2026 DragWx <https://github.com/DragWx> */

window.onload = init;

var gamescreen;
var canvas;
var context;
var inputMap = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "KeyZ", "KeyX"];
var keyState = [false, false, false, false, false, false, false];
var keySingle = [false, false, false, false, false, false, false];

var fpsLimit = 1000/60.0;
var fpsDisplay = true;
var fpsCountA = 0;
var fpsCountB = 0;
var fpsAvg = fpsLimit;
var fpsDom;

function keydownhandler(e) {
    if (!e.repeat) {
        var i = inputMap.indexOf(e.code);
        keyState[i] = true;
        keySingle[i] = true;
    }
}

function keyuphandler(e) {
    var i = inputMap.indexOf(e.code);
    keyState[i] = false;
}

function flushkeys() {
	for (var i = 0; i < keySingle.length; i++) {
		keySingle[i] = false;
	}
}

function init() {
	document.onkeydown = keydownhandler;
	document.onkeyup = keyuphandler;
	fpsDom = document.getElementById('footer');
    gamescreen = document.getElementById("gamescreen");
    gamescreen.innerHTML = "";

    canvas = document.createElement("canvas");
    canvas.id = "gamecanvas";
    canvas.width = 320;
    canvas.height = 240;

    context = canvas.getContext("2d");
    context.fillStyle = "#000";
    context.fillRect(0,0,320,240);
    context.fillStyle = "#FFF";
    context.fillRect(159,119,3,3);
    context.fillStyle = "#000";
    context.fillRect(160,120,1,1);

    gamescreen.appendChild(canvas);

	if (fpsDisplay) {
		fpsDom.style.display = "block";
		fpsCountA = Date.now();
	}
    loadLevel();
    doNextFrame();
}

var nextFrame = 0;
function doNextFrame() {
    // FPS throttling.
    var currFrame = Date.now();
    if (currFrame >= nextFrame) {
		// Increase the timestamp for the next frame. If after doing that, the current timestamp
		// is still larger, then just drop the frames rather than fast forward to catch up.
		if (currFrame >= (nextFrame += fpsLimit)) {
            nextFrame = currFrame + fpsLimit;
        }
		// If enabled, calculate the game's FPS by comparing the timestamps and converting
		// ms into hz
		if (fpsDisplay) {
			fpsCountB = fpsCountA;
			fpsCountA = currFrame;
			fpsAvg = (fpsAvg * 0.75) + ((fpsCountA - fpsCountB) * 0.25);
			fpsDom.innerHTML = Math.round(1000/fpsAvg) + " fps";
		}
        // Update the game logic by one frame.
        game_update();
        // Clear out the single-keypress array
        flushkeys();
    }
    // Need to do the animation frame here or else game continues while
    // debugger is stopped.
    window.requestAnimationFrame(doNextFrame);
}

var layoutA = [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  2,  0, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  1,  0,  1,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  1,  2,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  2,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  2,  1,  1,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  5,  6,  2,  7,  8,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  5,  6,  1,  1,  1,  1,  1,  7,  8,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  5,  6,  1,  1,  1,  1,  1,  1,  1,  1,  1,  7,  8,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  2,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,  4,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,  1,  1,  4,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,  1,  1,  1,  1,  4,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1,  4,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  2,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  9,  2, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  9,  1,  1,  1,  2, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  9,  1,  1,  1,  1,  1,  1,  2, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 2,  2,  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2]
]

var layoutB = [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0, 13,  0, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0, 15,  0,  1,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0, 17, 19, 19, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 13, 12, 12, 12, 14,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  1,  1,  1, 16,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  1,  1,  1, 16,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  1,  1,  1, 16,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17, 19, 19, 19, 18,  0],
    [ 0,  0, 13, 14,  0,  0,  0,  0, 13, 14,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 13, 14,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0, 17, 18,  0,  0,  0,  0, 15, 16,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0, 15, 16,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,  1,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0, 15, 16,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,  1,  1,  1,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [12, 12, 12, 12, 12, 12, 12, 12,  1,  1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  1,  1,  1,  1,  1,  1,  1,  1, 12, 12, 12, 12, 12, 12, 12, 12, 12]
]

var layout = layoutB;


var tiles = [
    { columns: [0,0,0,0,0,0,0,0], speed: [1   , 1   ], top: false, bottom: false, left: false, right: false, image: null },   // 0
    { columns: [0,0,0,0,0,0,0,0], speed: [1   , 1   ], top:  true, bottom: false, left: false, right: false, image: null },   // 1
    { columns: [1,1,1,1,1,1,1,1], speed: [1   , 1   ], top:  true, bottom: false, left:  true, right:  true, image: null },   // 2
    { columns: [8,7,6,5,4,3,2,1], speed: [1   , 0.71], top:  true, bottom: false, left: false, right: false, image: null },   // 3
    { columns: [1,2,3,4,5,6,7,8], speed: [0.71, 1   ], top:  true, bottom: false, left: false, right: false, image: null },   // 4
    { columns: [8,8,7,7,6,6,5,5], speed: [1   , 0.89], top:  true, bottom: false, left: false, right: false, image: null },   // 5
    { columns: [4,4,3,3,2,2,1,1], speed: [1   , 0.89], top:  true, bottom: false, left: false, right: false, image: null },   // 6
    { columns: [1,1,2,2,3,3,4,4], speed: [0.89, 1   ], top:  true, bottom: false, left: false, right: false, image: null },   // 7
    { columns: [5,5,6,6,7,7,8,8], speed: [0.89, 1   ], top:  true, bottom: false, left: false, right: false, image: null },   // 8
    { columns: [5,5,5,5,1,1,1,1], speed: [1   , 0.71], top:  true, bottom: false, left: false, right: false, image: null },   // 9
    { columns: [1,1,1,1,5,5,5,5], speed: [0.71, 1   ], top:  true, bottom: false, left: false, right: false, image: null },   // 10
    { columns: [5,5,5,5,5,5,5,5], speed: [1   , 1   ], top:  true, bottom: false, left: false, right: false, image: null },   // 11
    { columns: [1,1,1,1,1,1,1,1], speed: [1   , 1   ], top:  true, bottom: false, left: false, right: false, image: null },   // 12
    { columns: [1,1,1,1,1,1,1,1], speed: [1   , 1   ], top:  true, bottom: false, left:  true, right: false, image: null },   // 13
    { columns: [1,1,1,1,1,1,1,1], speed: [1   , 1   ], top:  true, bottom: false, left: false, right:  true, image: null },   // 14
    { columns: [0,0,0,0,0,0,0,0], speed: [1   , 1   ], top:  true, bottom: false, left:  true, right: false, image: null },   // 15
    { columns: [0,0,0,0,0,0,0,0], speed: [1   , 1   ], top:  true, bottom: false, left: false, right:  true, image: null },   // 16
    { columns: [0,0,0,0,0,0,0,0], speed: [1   , 1   ], top:  true, bottom:  true, left:  true, right: false, image: null },   // 17
    { columns: [0,0,0,0,0,0,0,0], speed: [1   , 1   ], top:  true, bottom:  true, left: false, right:  true, image: null },   // 18
    { columns: [0,0,0,0,0,0,0,0], speed: [1   , 1   ], top:  true, bottom:  true, left: false, right: false, image: null }    // 19
]

// Speed makes it so you run slower uphill.
// Calculate with cos(arctan(y/x)), where y/x is the slope.

function loadLevel() {
    // Create tile graphics based on their column arrays, so we see the exact
    // collision map.
    var solidColor = [255,255,255,128,128,128];
    var leftColor = [255,255,255,192,192,192];
    var rightColor = [255,255,255,192,192,192];
    for (let i = 0; i < tiles.length; i++) {
        let currImage = context.createImageData(8,8);
        for (let x = 0; x < 8; x++) {
            let currTile = tiles[i];
            let currColumnHeight = tiles[i].columns[x] - 1;
            let currByte = x * 4;
            for (let y = 0; y < 8; y++) {
                let colors = solidColor;
                if ((x == 0) && currTile.left) { colors = leftColor; }
                else if ((x == 7) && currTile.right) { colors = rightColor; }
                if ((currTile.top | currTile.bottom | currTile.left | currTile.right) == false) {
                    currImage.data[currByte  ] = 0;
                    currImage.data[currByte+1] = 0;
                    currImage.data[currByte+2] = 0;
                    currImage.data[currByte+3] = 255;
                }
                if (currTile.bottom && (y == 7)) {
                    currImage.data[currByte  ] = colors[0];
                    currImage.data[currByte+1] = colors[1];
                    currImage.data[currByte+2] = colors[2];
                    currImage.data[currByte+3] = 255;
                } else if (y == currColumnHeight) {
                    currImage.data[currByte  ] = colors[0];
                    currImage.data[currByte+1] = colors[1];
                    currImage.data[currByte+2] = colors[2];
                    currImage.data[currByte+3] = 255;
                } else if (y >= currColumnHeight) {
                    currImage.data[currByte  ] = colors[3];
                    currImage.data[currByte+1] = colors[4];
                    currImage.data[currByte+2] = colors[5];
                    currImage.data[currByte+3] = 255;
                } else {
                    // Yes, this is intentional so the tile's boundaries are visible.
                    currImage.data[currByte  ] = 48;
                    currImage.data[currByte+1] = 48;
                    currImage.data[currByte+2] = 48;
                    currImage.data[currByte+3] = 255;
                }
                currByte += 32;
            }
        }
        tiles[i].image = currImage;
    }
}

var playerX = 160;
var playerY = 120;
var playerXInt = playerX;
var playerYInt = playerY;

var playerXSpeed = 0;
var playerYSpeed = 0;

var playerWidth = 15;
var playerHeight = 24;

var playerRunAcceleration = 16/256;
var playerRunDeceleration = 32/256;

var playerMaxRunSpeed = 2;
var playerMaxRunSpeedWhileHovering = 1;

// Speed set when jumping.
var playerJumpSpeed = -4;

// Gravity when holding jump.
var playerSlowGravity = 32/256;
// Gravity when not holding jump.
var playerFastGravity = 192/256;
var playerMaxFallSpeed = 3;
// Applied instead of gravity, when hovering.
var playerHoverAcceleration = 16/256;
// What fall speed must be before you can hover, for the first hover of the jump (usually the jump crest)
var playerInitialHoverThreshold = 1;
// What fall speed must be before you can hover additional times after first.
var playerAdditionalHoverThreshold = 384/256;
// What rise speed must be for hover to stop.
var playerHoverEndThreshold = -288/256;


var playerIsMidair = true;
// Determines gravity speed, can only become "true" at start of jump, or start of any hover.
var playerIsHoldingJump = false;
// Determines fall speed threshold, the first hover of a jump uses a different threshold.
var playerInitialHoverDone = false;
// Prevents hovering while true, is stuck true during cooldown, becomes false when player releases jump.
var playerHasHovered = false;
// Player is currently hovering.
var playerIsHovering = false;
// Cooldown amount when a hover is cancelled, before another hover can start.
var playerHoverCooldown = 8;
// Ticks down until zero, will prevent a hover while nonzero.
var playerHoverCooldownTimer = 0;

function player_Stand() {
    playerYSpeed = 0;
    playerIsMidair = false;
    playerIsHovering = false;
    playerHasHovered = false;
    playerHoverCooldownTimer = 0;
}

function player_InAir() {
    playerIsMidair = true;
    playerInitialHoverDone = false;
    playerHasHovered = false;
    playerIsHovering = false;
}
function player_GetSpeedAtPoint(pixelOffsetX, pixelOffsetY) {
    // Calculate the tile X and Y we need to check.
    var collTileX = (playerXInt + pixelOffsetX) / 8 |0;
    var collTileY = (playerYInt + pixelOffsetY) / 8 |0;

    var testTileNo = 0;
    if ((collTileY >= 0) && (collTileY < layout.length) && (collTileX >= 0) && (collTileX < layout[collTileY].length)) {
        testTileNo = layout[collTileY][collTileX];
    }

    if (testTileNo) {
        return tiles[testTileNo].speed;
    } else {
        return [1,1];
    }
}
function player_GetHeightAtPoint(pixelOffsetX, pixelOffsetY) {
    // Calculate the tile X and Y we need to check.
    var collTileX = (playerXInt + pixelOffsetX) / 8 |0;
    var collTileY = (playerYInt + pixelOffsetY) / 8 |0;
    var collTileYAbove = collTileY - 1;
    var collTileYBelow = collTileY + 1;

    // Calculate the pixel offset into the tile we're checking.
    var collTilePixelX = (playerXInt + pixelOffsetX) % 8 |0;
    var collTilePixelY = (playerYInt + pixelOffsetY) % 8 |0;

    var testTileNo = 0;
    if ((collTileY >= 0) && (collTileY < layout.length) && (collTileX >= 0) && (collTileX < layout[collTileY].length)) {
        testTileNo = layout[collTileY][collTileX];
    }

    var testTileAboveNo = 0;
    if ((collTileYAbove >= 0) && (collTileYAbove < layout.length) && (collTileX >= 0) && (collTileX < layout[collTileYAbove].length)) {
        testTileAboveNo = layout[collTileYAbove][collTileX];
    }

    var testTileBelowNo = 0;
    if ((collTileYBelow >= 0) && (collTileYBelow < layout.length) && (collTileX >= 0) && (collTileX < layout[collTileYBelow].length)) {
        testTileBelowNo = layout[collTileYBelow][collTileX];
    }

    var testHeight = null;
    if (testTileNo) {
        let testTile = tiles[testTileNo];
        testHeight = testTile.columns[collTilePixelX] - 1;
        // If the column height was 0 (now -1), we need to check the tile above.
        if (testHeight == -1) {
            if (testTileAboveNo == 0) {
                // Nothing above, reset height to top of tile.
                testHeight = 0;
            } else {
                let testTileAbove = tiles[testTileAboveNo];
                testHeight = testTileAbove.columns[collTilePixelX] - 9;
            }
        }
    } else {
        // Check tile below. This is necessary for when we're trying to stay
        // aligned to a downward-moving slope: the slope will eventually move
        // down one layout-row, and we have to be able to detect that.
        if (testTileBelowNo) {
            let testTileBelow = tiles[testTileBelowNo];
            testHeight = testTileBelow.columns[collTilePixelX] + 7
            if (testHeight == 7) {
                // This column indicates to check the tile above, but we know the
                // tile above is empty, so reset to top of tile.
                testHeight = 8;
            }
        } else {
            // There's also nothing below.
            return null;
        }
    }
    if (collTilePixelY >= testHeight) {
        return {colliding: true, height: testHeight, tileX: collTileX, tileY: collTileY};
    } else {
        return {colliding: false, height: testHeight, tileX: collTileX, tileY: collTileY};
    }
}

function player_CheckBottomEdge() {
    // Along the bottom edge, find the nearest tile boundary relative to the
    // bottom edge's midpoint.

    // First, check the midpoint itself to see if it overlaps a solid tile.

    var playerXMidpoint = (playerWidth / 2) |0;
    var playerOffsetX = playerXMidpoint;
    var checkPixelX = playerXInt + playerOffsetX;
    
    var checkTileX = checkPixelX / 8 |0;
    var checkTileY = (playerYInt + playerHeight) / 8 |0;

    var checkTileNo = 0;
    if ((checkTileY >= 0) && (checkTileY < layout.length)) {
        if ((checkTileX >= 0) && (checkTileX < layout[checkTileY].length)) {
            checkTileNo = layout[checkTileY][checkTileX];
        }
    } else {
        // Y is out of bounds.
        return null;
    }
    if ((checkTileNo != 0) && (tiles[checkTileNo].top)) {
        // Midpoint is on a solid tile, done.
        return { pointType: 2, offsetX: playerOffsetX };
    }

    // Midpoint is not on a solid tile. Next, keep checking progressively
    // outward until we find a solid tile.
    
    // First, determine whether we're closer to the left or right tile boundary.
    var tileOffsetX = checkPixelX % 8 |0;
    var pixelIncrementAmount = 1;
    var tileIncrementAmount = 1;
    var moveRightNotLeft = (tileOffsetX >= 4) ? true : false;
    if (moveRightNotLeft) {
        playerOffsetX = playerOffsetX - tileOffsetX + 7;
    } else {
        playerOffsetX = playerOffsetX - tileOffsetX;
    }

    // Now bounce left and right (or right and left), progressively getting
    // farther outward. Doing it this way means we check each boundary in order
    // from nearest to farthest.

    // We want to check the leftmost pixel of rightward tiles, and the rightmost
    // pixel of leftward tiles.

    for (let i = 0; i < 16; i++) {
        if (moveRightNotLeft) {
            playerOffsetX += pixelIncrementAmount;
            checkTileX += tileIncrementAmount;
        } else {
            playerOffsetX -= pixelIncrementAmount;
            checkTileX -= tileIncrementAmount;
        }
        if ((playerOffsetX < 0) || (playerOffsetX >= playerWidth)) {
            // The next boundary is outside of our bottom edge, so we didn't
            // find any solid tiles.
            return null;
        }
        if ((checkTileX >= 0) && (checkTileX < layout[checkTileY].length)) {
            checkTileNo = layout[checkTileY][checkTileX];
            if ((checkTileNo != 0) && (tiles[checkTileNo].top)) {
                // Found a tile!
                break;
            }
        }
        if (i == 15) {
            // Just preventing an infinite loop.
            return null;
        }
        pixelIncrementAmount += 8;
        tileIncrementAmount++;
        moveRightNotLeft = !moveRightNotLeft;
    }

    // See how long we can trace a continuous slope towards the midpoint.
    // Stop if the change is too great, or if we reach the midpoint.
    
    var checkTile = tiles[checkTileNo];
    var checkHeightPrev = null;
    var checkHeightNext = null;

    // TODO: This code relies on there only being three tiles to check, only
    // one boundary between a side tile and the midpoint tile. The correct
    // thing to do is to continue tracing the slope, column by column, crossing
    // tile boundaries, until you find two columns with too big of a change,
    // a cliff, or until you get to the midpoint.
    if (moveRightNotLeft) {
        // We're on the left boundary of a tile to the right.
        checkHeightPrev = checkTile.columns[0] - 1;
        if (checkHeightPrev < 0) {
            checkHeightPrev = 0;
        }
        checkTileX--;
        checkTileY++;
        checkTileNo = 0;
        if ((checkTileY < layout.length) && (checkTileX >= 0)) {
            checkTileNo = layout[checkTileY][checkTileX];
        }
        if (checkTileNo != 0) {
            checkTile = tiles[checkTileNo];
            if (checkTile.top) {
                checkHeightNext = checkTile.columns[7] + 7;
                if (checkHeightNext - checkHeightPrev <= 4) {
                    return { pointType: 2, offsetX: playerXMidpoint };
                }
            }
        }
    } else {
        // We're on the right boundary of a tile to the left.
        checkHeightPrev = checkTile.columns[7] - 1;
        if (checkHeightPrev < 0) {
            checkHeightPrev = 0;
        }
        checkTileX++;
        checkTileY++;
        checkTileNo = 0;
        if ((checkTileY < layout.length) && (checkTileX < layout[checkTileY].length)) {
            checkTileNo = layout[checkTileY][checkTileX];
        }
        if (checkTileNo != 0) {
            checkTile = tiles[checkTileNo];
            if (checkTile.top) {
                checkHeightNext = checkTile.columns[0] + 7;
                if (checkHeightNext - checkHeightPrev <= 4) {
                    return { pointType: 2, offsetX: playerXMidpoint };
                }
            }
        }
    }
    // pointType 1 = Away from midpoint
    // pointType 2 = Midpoint
    return { pointType: 1, offsetX: playerOffsetX };
}

function player_CheckTopEdge() {
    // First, check the midpoint itself to see if it overlaps a solid tile.

    var playerXMidpoint = (playerWidth / 2) |0;
    var playerOffsetX = playerXMidpoint;
    var checkPixelX = playerXInt + playerOffsetX;
    
    var checkTileX = checkPixelX / 8 |0;
    var checkTileY = playerYInt / 8 |0;

    var checkTileNo = 0;
    if ((checkTileY >= 0) && (checkTileY < layout.length)) {
        if ((checkTileX >= 0) && (checkTileX < layout[checkTileY].length)) {
            checkTileNo = layout[checkTileY][checkTileX];
        }
    } else {
        // Y is out of bounds.
        return null;
    }
    if ((checkTileNo != 0) && (tiles[checkTileNo].bottom)) {
        // Midpoint is on a solid tile, done.
        return { collisionType: 3 };
    }

    // Midpoint is not on a solid tile. Next, keep checking progressively
    // outward until we find a solid tile.

    // First, determine whether we're closer to the left or right tile boundary.
    var tileOffsetX = checkPixelX % 8 |0;
    var pixelIncrementAmount = 1;
    var tileIncrementAmount = 1;
    var moveRightNotLeft = (tileOffsetX >= 4) ? true : false;
    if (moveRightNotLeft) {
        playerOffsetX = playerOffsetX - tileOffsetX + 7;
    } else {
        playerOffsetX = playerOffsetX - tileOffsetX;
    }

    // Now bounce left and right (or right and left), progressively getting
    // farther outward. Doing it this way means we check each boundary in order
    // from nearest to farthest.

    // We want to check the leftmost pixel of rightward tiles, and the rightmost
    // pixel of leftward tiles.

    var collisionType = 0;
    for (let i = 0; i < 16; i++) {
        if (moveRightNotLeft) {
            playerOffsetX += pixelIncrementAmount;
            checkTileX += tileIncrementAmount;
        } else {
            playerOffsetX -= pixelIncrementAmount;
            checkTileX -= tileIncrementAmount;
        }
        if ((playerOffsetX < 0) || (playerOffsetX >= playerWidth)) {
            // The next boundary is outside of our top edge, so exit.
            break;
        }
        if ((checkTileX >= 0) && (checkTileX < layout[checkTileY].length)) {
            checkTileNo = layout[checkTileY][checkTileX];
            if ((checkTileNo != 0) && (tiles[checkTileNo].bottom)) {
                // Found a tile!
                if ((collisionType == 0) && (playerOffsetX <= 3)) {
                    // Left corner
                    collisionType = 1;
                } else if ((collisionType == 0) && (playerOffsetX >= playerWidth - 4)) {
                    // Right corner
                    collisionType = 2;
                } else {
                    // Ceiling
                    return { collisionType: 3 };
                }
            }
        }
        if (i == 15) {
            // Just preventing an infinite loop.
            return null;
        }
        pixelIncrementAmount += 8;
        tileIncrementAmount++;
        moveRightNotLeft = !moveRightNotLeft;
    }

    // Return whatever we found.

    // collisionType 1 = Left corner
    // collisionType 2 = Right corner
    // collisionType 3 = Ceiling
    if (collisionType) {
        return { collisionType: collisionType };
    }
    return null;
}

function player_CheckSideEdge_old(rightNotLeft = false) {

    // Start at the corner. If it overlaps something solid, find the top of it
    //  and check if it's continuous with the adjacent tile closer inward.
    
    // If the top is too high, we assume it's a wall and it's a collision.

    // If there's too big of an up-step between the two tiles, they're not
    //  continuous (it's a ledge instead) and it's a collision.
    
    // If there's no adjacent tile, there's a gap. If we're in mid air, this
    //  is a collision, but if we're standing on something solid
    //  (like a U-shaped platform where one pillar is slightly higher), it's a
    //  collision only if it's too high of a step-up from where we're standing.

    // After checking one or more tiles of the bottom of the edge, check the
    //  remaining tiles above, until the top is reached. If anything's solid,
    //  it's a collision.

    var standTileYPixelOffset = playerIsMidair ? null : (playerYInt + playerHeight) % 8 |0;
    var checkPixelX = rightNotLeft ? (playerXInt + playerWidth) : (playerXInt - 1);
    var checkPixelY = playerYInt + playerHeight - 1 |0;
    var checkTileX = checkPixelX / 8 |0;
    var checkTileY = checkPixelY / 8 |0;
    var checkTileYTop = playerYInt / 8 |0;
    var checkTileYPixelOffset = checkPixelY % 8;
    var checkColumn = rightNotLeft ? 0 : 7;

    var checkTileNo = 0;
    if ((checkTileX >= 0) && (checkTileY >= 0) && (checkTileY < layout.length) && (checkTileX < layout[checkTileY].length)) {
        checkTileNo = layout[checkTileY][checkTileX];
    }

    var colliding = false;

    // 0 = No collision
    // 1 = Corner collision
    // 2 = Wall collision
    var collisionType = 0;

    if (checkTileNo != 0) {
        // The corner is overlapping a solid tile, so find the top.
        let columnHeight = tiles[checkTileNo].columns[checkColumn] - 1;
        let columnHeightRelativeToPlayer = 0;
        let aboveSurface = false;

        if (columnHeight == -1) {
            // Keep checking tiles above.
            while (columnHeight == -1) {
                // Check tile above.
                checkTileY--;
                if (checkTileY < checkTileYTop) {
                    // Too tall, just assume it's a wall.
                    colliding = true;
                    collisionType = 2;
                    break;
                }

                columnHeightRelativeToPlayer -= 8;
                
                if (checkTileY >= 0) {
                    checkTileNo = layout[checkTileY][checkTileX];
                    if (checkTileNo != 0) {
                        columnHeight = tiles[checkTileNo].columns[checkColumn] - 1;
                    } else {
                        // No additional solid tile above.
                        columnHeight = 0;
                        checkTileY++;
                        columnHeightRelativeToPlayer += 9;
                        break;
                    }
                } else {
                    // We've gone off the top of the stage.
                    columnHeight = 0;
                    checkTileY++;
                    columnHeightRelativeToPlayer += 9;
                    break;
                }
                
            }

        } else if (checkTileYPixelOffset < columnHeight) {
            // The bottom of our edge is above the tile's column height on that
            // boundary, so we're going to assume we won't collide with it.
            aboveSurface = true;
        }
        columnHeightRelativeToPlayer = (standTileYPixelOffset === null) ? null : columnHeightRelativeToPlayer + standTileYPixelOffset;

        if (!colliding && !aboveSurface) {
            // Now check the adjacent tile's heightmap, to see if the
            // boundary is a continuous surface.
            let adjacentCheckColumn = rightNotLeft ? 7 : 0;
            let adjacentColumnHeight = null;
            checkTileNo = 0;
            
            checkTileX += rightNotLeft ? -1 : 1;
            if ((rightNotLeft && (checkTileX >= 0)) || (!rightNotLeft && (checkTileX < layout[checkTileY].length))) {
                checkTileNo = layout[checkTileY][checkTileX];
                
                if (checkTileNo != 0) {
                    adjacentColumnHeight = tiles[checkTileNo].columns[adjacentCheckColumn] - 1;
                } else {
                    // No tile directly adjacent, so check tile below.
                    checkTileY++;
                    if (checkTileY < layout.length) {
                        checkTileNo = layout[checkTileY][checkTileX];
                    }
                    checkTileY--;
                    if (checkTileNo != 0) {
                        adjacentColumnHeight = tiles[checkTileNo].columns[adjacentCheckColumn] + 7;
                        if (adjacentColumnHeight == 7) {
                            // We already know the tile above is blank.
                            adjacentColumnHeight = 8;
                        }
                    }
                }
            }
            checkTileX -= rightNotLeft ? -1 : 1;

            // If adjacentColumnHeight is still null here, then there's
            // a gap before the column we're checking.
            if (adjacentColumnHeight !== null) {
                if ((adjacentColumnHeight - columnHeight) > 4) {
                    // The surface is not continuous because there's too big of
                    // a step.
                    colliding = true;
                    collisionType = 1;
                }
            } else {
                // There's a gap before the column we're checking.
                // If we're standing on something solid, check if the top of the
                // wall is low enough to step up onto.
                if ((columnHeightRelativeToPlayer === null) || (columnHeightRelativeToPlayer <= -4)) {
                    // We're in mid air, or the wall is too high to step up to.
                    colliding = true;
                    collisionType = 1;
                }
            }
        }
    }

    // At this point of the code, we've checked if the bottom of the edge was
    // overlapping something solid.
    // If it was, we traced to the top of it and detected any collision.
    // If it wasn't, then we know the bottom-most tile is empty.
    // Either way, checkTileX/Y is now pointing at the last checked tile.

    if (collisionType != 2) {
        checkTileY--;
        // checkTileX/Y is now pointing at the next unchecked tile.

        // Check the remainder of the tiles, up to and including the topmost,
        // for being solid.
        while ((checkTileY >= checkTileYTop) && (checkTileY >= 0)) {
            checkTileNo = layout[checkTileY][checkTileX];
            if (checkTileNo != 0) {
                colliding = true;
                collisionType = 2;
                break;
            }
            checkTileY--;
        }
    }

    if (colliding) {
        if (rightNotLeft) {
            return { colliding: true, collisionType: collisionType, alignX: checkTileX * 8 - playerWidth + 0.5 };
        } else {
            return { colliding: true, collisionType: collisionType, alignX: (checkTileX+1) * 8 + 0.5 };
        }
    }
    return null;
}

function player_CheckSideEdge(rightNotLeft = false) {
    // Check if any tiles overlapping the player's side edge are an opposing
    // wall.

    var checkPixelX = rightNotLeft ? (playerXInt + playerWidth) : (playerXInt - 1);
    var checkPixelY = playerYInt + playerHeight - 1 |0;
    var checkTileX = checkPixelX / 8 |0;
    var checkTileY = checkPixelY / 8 |0;
    var checkTileYTop = playerYInt / 8 |0;
    if (checkTileYTop < 0) {
        checkTileYTop = 0;
    }

    var edgeName = rightNotLeft ? "left" : "right";

    // 0 = No collision
    // 1 = Corner collision
    // 2 = Wall collision
    var collisionType = 0;

    if ((checkTileX < 0) || checkTileX >= layout[0].length) {
        // Edge is off the stage.
        return null;
    }

    // Continue checking along the edge to see if there's any more collision.
    let isCorner = true;
    for (; checkTileY >= checkTileYTop; checkTileY--) {
        var checkTileNo = 0;
        if ((checkTileY >= 0) && (checkTileY < layout.length)) {
            checkTileNo = layout[checkTileY][checkTileX];
        }
        var currTile = tiles[checkTileNo];
        if (currTile[edgeName]) {
            // This tile is solid and overlapping our edge.
            if (isCorner) {
                // Corner collision, keep checking after this.
                collisionType = 1;
            } else {
                // Wall collision, we can stop here.
                collisionType = 2;
                break;
            }
        }
        if (isCorner) {
            isCorner = false;
        }
    }

    if (collisionType != 0) {
        if (rightNotLeft) {
            return { colliding: true, collisionType: collisionType, alignX: checkTileX * 8 - playerWidth + 0.5 };
        } else {
            return { colliding: true, collisionType: collisionType, alignX: (checkTileX+1) * 8 + 0.5 };
        }
    }
    return null;
}

function game_update() {

    /* #region Handle movement */
    var maxRunSpeed = (playerIsHovering ? playerMaxRunSpeedWhileHovering : playerMaxRunSpeed);
    if (!playerIsMidair) {
        let testResult = player_CheckBottomEdge();
        if (testResult !== null) {
            maxRunSpeed *= player_GetSpeedAtPoint(testResult.offsetX, playerHeight)[(playerXSpeed > 0) ? 1 : 0];
        }
    }
    if (keyState[2]) {  // Left
        if (playerXSpeed < -maxRunSpeed) {
            // Player is going faster than max speed.
            playerXSpeed += playerRunDeceleration;
            if (playerXSpeed > -maxRunSpeed) {
                // Player has decelerated enough to reach max speed.
                playerXSpeed = -maxRunSpeed;
            }
        } else {
            // Player is not max speed yet.
            if (playerXSpeed > 0) {
                // Speed is opposite direction, so skid.
                playerXSpeed -= playerRunDeceleration;
            } else {
                playerXSpeed -= playerRunAcceleration;
            }
            if (playerXSpeed < -maxRunSpeed) {
                // Player has reached max speed.
                playerXSpeed = -maxRunSpeed;
            }
        }
    } else if (keyState[3]) {
        if (playerXSpeed > maxRunSpeed) {
            // Player is going faster than max speed.
            playerXSpeed -= playerRunDeceleration;
            if (playerXSpeed < maxRunSpeed) {
                // Player has decelerated enough to reach max speed.
                playerXSpeed = maxRunSpeed;
            }
        } else {
            // Player is not max speed yet.
            if (playerXSpeed < 0) {
                // Speed is opposite direction, so skid.
                playerXSpeed += playerRunDeceleration;
            } else {
                playerXSpeed += playerRunAcceleration;
            }
            if (playerXSpeed > maxRunSpeed) {
                // Player has reached max speed.
                playerXSpeed = maxRunSpeed;
            }
        }
    } else {
        if (playerIsMidair) {
            // If in midair, decelerate only if player is faster than max speed.
            if (playerXSpeed > maxRunSpeed) {
                // Player is going faster than max speed.
                playerXSpeed -= playerRunDeceleration;
                if (playerXSpeed < maxRunSpeed) {
                    // Player has decelerated enough to reach max speed.
                    playerXSpeed = maxRunSpeed;
                }
            } else if (playerXSpeed < -maxRunSpeed) {
                // Player is going faster than max speed.
                playerXSpeed += playerRunDeceleration;
                if (playerXSpeed > -maxRunSpeed) {
                    // Player has decelerated enough to reach max speed.
                    playerXSpeed = -maxRunSpeed;
                }
            }
        } else {
            // Unconditional deceleration to 0.
            if (playerXSpeed > 0) {
                playerXSpeed -= playerRunDeceleration;
                if (playerXSpeed < 0) {
                    playerXSpeed = 0;
                }
            } else {
                playerXSpeed += playerRunDeceleration;
                if (playerXSpeed > 0) {
                    playerXSpeed = 0;
                }
            }
        }
    }

    // Apply variable gravity.
    if (playerIsMidair && !playerIsHovering && (playerYSpeed < playerMaxFallSpeed)) {
        if (playerIsHoldingJump) {
            playerYSpeed += playerSlowGravity;
        } else {
            playerYSpeed += playerFastGravity;
        }
        if (playerYSpeed > playerMaxFallSpeed) {
            playerYSpeed = playerMaxFallSpeed;
        }
    }

    // When jump is pressed while standing.
    if (keySingle[6] && !playerIsMidair) {
        playerYSpeed = playerJumpSpeed;
        playerIsHoldingJump = true;
        player_InAir();
    }

    // If jump is released in mid-air or mid-hover.
    if (playerIsHoldingJump && !keyState[6]) {
        playerIsHoldingJump = false;
        if (playerIsHovering) {
            // When hover is cancelled, use the cooldown timer to inhibit
            // another hover.
            playerIsHovering = false;
            playerInitialHoverDone = true;
            playerHoverCooldownTimer = playerHoverCooldown;
        }
    }


    if (playerIsMidair) {
        // Inhibit hover if cooling down.
        if (playerHoverCooldownTimer > 0) {
            playerHoverCooldownTimer--;
            playerHasHovered = true;
        }

        // Listen for the jump button being held, so we can hover (when ok to do so)
        // The first hover (at the crest of the jump) has a different start
        // threshold than additional hovers after that.
        if (keyState[6] && !playerHasHovered && !playerIsHovering && (playerYSpeed > (playerInitialHoverDone ? playerAdditionalHoverThreshold : playerInitialHoverThreshold))) {
            playerYSpeed = (playerInitialHoverDone ? playerAdditionalHoverThreshold : playerInitialHoverThreshold);
            playerIsHovering = true;
            playerIsHoldingJump = true;
        }

        if (playerIsHovering) {
            if ((playerYSpeed -= playerHoverAcceleration) < playerHoverEndThreshold) {
                playerYSpeed = playerHoverEndThreshold;
                playerIsHovering = false;
                playerHasHovered = true;
                playerInitialHoverDone = true;
            }
        }

        // After a hover is finished, allow the player to retrigger a hover.
        if (playerHasHovered && !keyState[6]) {
            playerHasHovered = false;
        }
    }

    /* #endregion */

    playerY += playerYSpeed;
    playerYInt = playerY |0;
    playerX += playerXSpeed;
    playerXInt = playerX |0;

    
    // Adjust height for slope.
    if (!playerIsMidair) {
        var testResult = player_CheckBottomEdge();
        if (testResult !== null) {
            testResult = player_GetHeightAtPoint(testResult.offsetX, playerHeight);
        }
        if (testResult !== null) {
            let adjustedPlayerY = (testResult.tileY * 8) - playerHeight + testResult.height;
            let difference = adjustedPlayerY - playerYInt;
            if ((difference >= -6) && (difference <= 6)) {
                playerY = adjustedPlayerY;
                playerYInt = playerY |0;
            }
        }
    }

    var ceilingTestResult = null;
    if (playerIsMidair && (playerYSpeed < 0)) {
        ceilingTestResult = player_CheckTopEdge();
    }

    // When jumping into a corner:
    //  - Moving into corner, or hovering, bonk.
    //  - Neutral or moving away from corner, snap away and don't bonk.
    // After any bonk, redo the wall check (if it was done already).
    //  Otherwise, corner tiles embedded into the ceiling can cause a horizontal
    //  snap, including when jumping against actual corners.

    if (ceilingTestResult !== null) {
        let bonk = false;
        switch (ceilingTestResult.collisionType) {
        case 1: // Left corner
            if ((playerXSpeed < 0) || playerIsHovering) {
                // Moving into it, so bonk.
                bonk = true;
            } else {
                // Not moving into it, so snap away and don't bonk.
                playerX += 8 - (playerX % 8);
                playerXInt = playerX |0;
            }
            break;
        case 2: // Right corner
            if ((playerXSpeed > 0) || playerIsHovering) {
                // Moving into it, so bonk.
                bonk = true;
            } else {
                // Not moving into it, so snap away and don't bonk.
                playerX -= (playerX + playerWidth) % 8;
                playerXInt = playerX |0;
            }
            break;
        case 3: // Ceiling
            bonk = true;
            break;
        }
        if (bonk) {
            playerY += 8 - (playerY % 8);
            playerYInt = playerY |0;
            playerYSpeed = 0;
            if (playerIsHovering) {
                playerIsHovering = false;
                playerInitialHoverDone = true;
                playerHasHovered = true;
            }
        }
    }


    // Do ground scan.
    var groundTestResult = player_CheckBottomEdge();
    if (groundTestResult !== null) {
        groundTestResult = {...player_GetHeightAtPoint(groundTestResult.offsetX, playerHeight), pointType: groundTestResult.pointType };
    }

    // Do wall scan.
    var wallTestResult = null;
    if (playerXSpeed != 0) {
        wallTestResult = player_CheckSideEdge((playerXSpeed > 0) ? true : false);
    }

    // This is not what this code currently does, but ideally:
    // Normally, do ground then wall, except:
    // On corner-wall + corner-ground (on same corner), do ground, ignore wall.
    // On full-wall + corner-ground (on same side), do wall, ignore ground.

    // Detect whether player is standing or midair.
    if (!playerIsMidair && (groundTestResult == null || !groundTestResult.colliding)) {
        playerIsHoldingJump = keyState[6];
        player_InAir();
    } else if (playerIsMidair && (groundTestResult !== null) && groundTestResult.colliding) {
        let newPlayerY = (groundTestResult.tileY * 8) - playerHeight + groundTestResult.height;
        if ((newPlayerY - playerY) >= -8) {
            player_Stand();
            playerY = newPlayerY;
            playerYInt = playerY |0;
            if (wallTestResult !== null && (wallTestResult.collisionType == 1)) {
                wallTestResult = null;
            }
        }
    }

    if ((groundTestResult !== null) && (groundTestResult.pointType == 2) && (groundTestResult.height <= -9)) {
        // Need to do wall ejection.
        player_Stand();
        playerY = playerY - (playerY % 8);
        playerYInt = playerY |0;
        wallTestResult = null;
        if (playerXSpeed != 0) {
            playerX += (playerXSpeed < 0) ? 8 : -8;
            playerXInt = playerX |0;
        }
    }

    if ((wallTestResult !== null) && (wallTestResult.colliding)) {
        playerXSpeed = 0;
        playerX = wallTestResult.alignX;
        playerXInt = playerX |0;
    }

    // Basic collision with the screen edges.
    if (playerY > 240) {
        playerY = 0;
    }
    
    if (playerX < 0) {
        playerX = 0;
        playerXSpeed = 0;
    } else if (playerX + playerWidth > 320) {
        playerX = 320 - playerWidth;
        playerXSpeed = 0;
    }
    
    // Clear the screen to get ready for drawing on it.
    context.fillStyle = "#000";
    context.fillRect(0,0,320,240);
    

    // Draw the layout.
    for (let y = 0; y < layout.length; y++) {
        let drawY = y * 8;
        for (let x = 0; x < layout[y].length; x++) {
            let drawX = x * 8;
            let currTile = layout[y][x]
            if (currTile > 0) {
                let tileDef = tiles[currTile];
                context.putImageData(tileDef.image, drawX, drawY);
            }
        }
    }


    // Draw Player
    if (playerIsHovering) {
        context.fillStyle = "#F00";
    } else if (playerHoverCooldownTimer > 0) {
        context.fillStyle = "#800";
    } else if (playerIsMidair) {
        context.fillStyle = "#FFF";
    } else {
        context.fillStyle = "#48F";
    }
    context.fillRect(playerXInt, playerYInt, playerWidth, playerHeight);

}
