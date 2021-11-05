const width = 320;
const height = 240;
const coverage = .75;

let zoom;
let gameState;
let ctx;
let screen;
let spriteSheet = null;

function resizeCanvas() {
    let canvas = document.getElementById('game');

    // I want the actual resolution of the game to be pretty low, but
    // then scale it up to fill almost all of the browser window
    const windowWidth  = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // let's compute the (integer) zoom factor that would scale our
    // canvas to roughly 75% of the browser width or height
    if (windowWidth * height < windowHeight * width) {
        zoom = Math.floor(coverage * windowWidth / width);
        // the above computes zoom as being at most 75% of the browser
        // width but a little bit bigger is also okay
        if (windowWidth - (zoom + 1) * width >= 0 &&
            (zoom+1) * width - coverage * windowHeight < coverage * windowWidth - zoom * width) {
            zoom++;
        }
    } else {
        zoom = Math.floor(coverage * windowHeight / height);
        if (windowHeight - (zoom + 1) * height >= 0 &&
            (zoom+1) * height - coverage * windowWidth < coverage * windowHeight - zoom * height) {
            zoom++;
        }
    }

    // resize and place the canvas
    // canvas.width = zoom * width;
    // canvas.height = zoom * height;
    canvas.width = width;
    canvas.height = height;
    canvas.style.transform = 'scale(' + zoom + ')';
    canvas.style.marginTop = ((windowHeight - canvas.height) / 2) + 'px';

    ctx = canvas.getContext('2d', { alpha: false }); 
}

function toggleFullscreen() {
    let canvas = document.getElementById('game');

    if (!document.fullscreenElement) {
	canvas.requestFullscreen().catch(err => {
	    // TODO
	    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
	});
    } else {
	document.exitFullscreen();
    }
}

function loadSprites() {
    url = "/art/sprites.png";
    SpriteSheet.load(url, 32).then(result => {
	spriteSheet = result;
    });
}

function init() {
    // set the initial size of the canvas dynamically.
    resizeCanvas();

    // define the offscreen image
    screen = new Bitmap(ctx.createImageData(width, height));
    
    // load art
    loadSprites();
    
    // TODO: define initial game state
    gameState = { 'color': 'white' };

    // DEBUG: toggle fullscreen on click
    let canvas = document.getElementById('game');
    canvas.addEventListener('mousedown', e => {
	toggleFullscreen();
    });
}

function cleanup() {
    // TODO
}

function update(dtime) {
    // TODO
}

function render() {
    // clear to white
    screen.clear(255, 255, 255);

    if (spriteSheet != null) {
	spriteSheet.render(screen, 0, 0, 0, 0);
    }
    
    // show
    ctx.putImageData(screen.imageData, 0, 0);
}

let lastLoopTime;
function loop(time) {
    let dtime = time - lastLoopTime;
    lastLoopTime = time;

    if (time - debugStartTime < 5000) {
	update(dtime);
	render();

	requestAnimationFrame(loop);
    }
}

let debugStartTime;
function main() {
    init();
    lastLoopTime = performance.now();
    debugStartTime = lastLoopTime;
    requestAnimationFrame(loop);
}


window.onload = main;
window.onresize = resizeCanvas;
window.onclose = cleanup;
