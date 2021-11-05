class SpriteSheet {
    constructor(bitmap, spriteWidth, spriteHeight) {
	this.bitmap = bitmap;
	this.spriteWidth = spriteWidth;

	if (spriteHeight === undefined) {
	    this.spriteHeight = spriteWidth;
	} else {
	    this.spriteHeight = spriteHeight;
	}
    }

    static load(url, spriteWidth, spriteHeight) {
	return new Promise((resolutionFunction, rejectionFunction) => {
	    Bitmap.load(url).then(bitmap => {
		resolutionFunction(new SpriteSheet(bitmap, spriteWidth, spriteHeight));
	    }, error => {
		rejectionFunction(error);
	    });
	});
    }

    render(targetBitmap, dstx, dsty, spriteX, spriteY) {
	this.bitmap.render(targetBitmap, dstx, dsty, width, height,
			   spriteX * this.spriteWidth, spriteY * this.spriteHeight);
    }
}
