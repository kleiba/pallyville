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
	    const image = new Image();
	    image.onload = function() {
		resolutionFunction(new SpriteSheet(image, spriteWidth, spriteHeight));
	    }
	    image.src = url;
	});
    }

    render(ctx, dstx, dsty, spriteX, spriteY) {
	ctx.drawImage(this.bitmap,
		      spriteX * this.spriteWidth, spriteY * this.spriteHeight,
		      this.spriteWidth, this.spriteHeight,
		      dstx, dsty,
		      this.spriteWidth, this.spriteHeight);
    }
}
