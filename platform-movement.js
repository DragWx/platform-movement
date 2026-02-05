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
    window.requestAnimationFrame(doNextFrame);
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
}

var layout = [
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
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2]
]

var tiles = [
    { columns: [0,0,0,0,0,0,0,0], speed: [1   , 1   ], image: null },
    { columns: [1,1,1,1,1,1,1,1], speed: [1   , 1   ], image: null },
    { columns: [8,7,6,5,4,3,2,1], speed: [1   , 0.71], image: null },
    { columns: [1,2,3,4,5,6,7,8], speed: [0.71, 1   ], image: null },
    { columns: [8,8,7,7,6,6,5,5], speed: [1   , 0.89], image: null },
    { columns: [4,4,3,3,2,2,1,1], speed: [1   , 0.89], image: null },
    { columns: [1,1,2,2,3,3,4,4], speed: [0.89, 1   ], image: null },
    { columns: [5,5,6,6,7,7,8,8], speed: [0.89, 1   ], image: null }
]

// Speed makes it so you run slower uphill.
// Calculate with cos(arctan(y/x)), where y/x is the slope.

function loadLevel() {
    // Create tile graphics based on their column arrays, so we see the exact
    // collision map.
    for (let i = 0; i < tiles.length; i++) {
        let currImage = context.createImageData(8,8);
        for (let x = 0; x < 8; x++) {
            let currColumnHeight = tiles[i].columns[x] - 1;
            let currByte = x * 4;
            for (let y = 0; y < 8; y++) {
                if (y == currColumnHeight) {
                    currImage.data[currByte  ] = 255;
                    currImage.data[currByte+1] = 255;
                    currImage.data[currByte+2] = 255;
                    currImage.data[currByte+3] = 255;
                } else if (y >= currColumnHeight) {
                    currImage.data[currByte  ] = 128;
                    currImage.data[currByte+1] = 128;
                    currImage.data[currByte+2] = 128;
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
        return tiles[testTileNo-1].speed;
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
        let testTile = tiles[testTileNo-1];
        testHeight = testTile.columns[collTilePixelX] - 1;
        // If the column height was 0 (now -1), we need to check the tile above.
        if (testHeight == -1) {
            if (testTileAboveNo == 0) {
                // Nothing above, reset height to top of tile.
                testHeight = 0;
            } else {
                let testTileAbove = tiles[testTileAboveNo-1];
                testHeight = testTileAbove.columns[collTilePixelX] - 9;
            }
        }
    } else {
        // Check tile below. This is necessary for when we're trying to stay
        // aligned to a downward-moving slope: the slope will eventually move
        // down one layout-row, and we have to be able to detect that.
        if (testTileBelowNo) {
            let testTileBelow = tiles[testTileBelowNo-1];
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

function game_update() {
    /* #region Handle movement */
    var maxRunSpeed = (playerIsHovering ? playerMaxRunSpeedWhileHovering : playerMaxRunSpeed);
    if (!playerIsMidair) {
        maxRunSpeed *= player_GetSpeedAtPoint(playerWidth/2, playerHeight)[(playerXSpeed > 0) ? 1 : 0];
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

    playerY += playerYSpeed;
    playerYInt = playerY |0;
    playerX += playerXSpeed;
    playerXInt = playerX |0;

    // Adjust height for slope.
    if (!playerIsMidair) {
        var testResult = player_GetHeightAtPoint(playerWidth/2, playerHeight);
        if (testResult != null) {
            let adjustedPlayerY = (testResult.tileY * 8) - playerHeight + testResult.height;
            let difference = adjustedPlayerY - playerYInt;
            if ((difference > -4) && (difference < 4)) {
                playerY = adjustedPlayerY;
                playerYInt = playerY |0;
            }
        }
    }


    /* #endregion */

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
    
    testResult = player_GetHeightAtPoint(playerWidth/2, playerHeight);

    if (!playerIsMidair && (testResult == null || !testResult.colliding)) {
        playerIsHoldingJump = keyState[6];
        player_InAir();
    } else if (playerIsMidair && (testResult != null) && testResult.colliding) {
        player_Stand();
        playerY = (testResult.tileY * 8) - playerHeight + testResult.height;
        playerYInt = playerY |0;
    }
    
    // Draw the layout.
    for (let y = 0; y < layout.length; y++) {
        let drawY = y * 8;
        for (let x = 0; x < layout[y].length; x++) {
            let drawX = x * 8;
            let currTile = layout[y][x]
            if (currTile > 0) {
                let tileDef = tiles[currTile-1];
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
