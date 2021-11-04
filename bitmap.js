class Bitmap {
    constructor(arg1, arg2) {
	if (arg2 === undefined) {
	    this.imageData = arg1;
	} else {
	    this.imageData = new ImageData(arg1, arg2);
	}
    }

    get width() {
	return this.imageData.width;
    }

    get height() {
	return this.imageData.height;
    }

    get pixels() {
	return this.imageData.data;
    }

    clear(r, g, b, a) {
	let pixels = this.imageData.data;
	for (let i = 0; i < pixels.length; i += 4) {
	    pixels[i] = r;
	    pixels[i+1] = g;
	    pixels[i+2] = b;
	    pixels[i+3] = a || 255;
	}
    }

    draw(bitmap, srcx, srcy, width, height, dstx, dsty) {
	if (srcx < 0) {
	    width += srcx;
	    dstx -= srcx;
	    srcx = 0;
	} else if (srcx + width >= bitmap.width) {
	    width -= srcx + width - bitmap.width;
	}

	if (srcy < 0) {
	    height += srcy;
	    dsty -= srcy;
	    srcy = 0;
	} else if (srcy + height >= bitmap.height) {
	    height -= srcy + height - bitmap.height;
	}

	if (dstx < 0) {
	    width += dsty;
	    srcx -= dstx;
	    dstx = 0;
	} else if (dstx + width >= this.width) {
	    width -= dstx + width - this.width;
	}

	if (dsty < 0) {
	    height += dsty;
	    srcy -= dsty;
	    dsty = 0;
	} else if (dsty + height >= this.height) {
	    height -= dsty + height - this.height;
	}

	let src_pixels = bitmap.pixels;
	let dst_pixels = this.pixels;
	
	let srci = (srcx + srcy * bitmap.width) * 4;
	let dsti = (dstx + dsty * this.width) * 4;

	for (let y = 0; y < height; y++) {
	    for (let x = 0; x < width; x++) {
		for (let j = 0; j < 3; j++) {
		    dst_pixels[dsti + j] = src_pixels[srci + j];
		}
		
		srci += 4;
		dsti += 4;
	    }

	    srci += (bitmap.width - width) * 4;
	    dsti += (this.width - width) * 4;
	}
    }
}
