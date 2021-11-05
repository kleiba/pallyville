// TODO: move from 'ImageData' to 'ImageBitmap'

class Bitmap {
    constructor(arg1, arg2) {
	if (arg2 === undefined) {
	    this.imageData = arg1;
	} else {
	    this.imageData = new ImageData(arg1, arg2);
	}
    }

    static load(url) {
	return new Promise((resolutionFunction, rejectionFunction) => {
	    const image = new Image();
	    image.onload = function() {
		let width = image.width;
		let height = image.height;
		
		let tempCanvas =  document.createElement('canvas');
		tempCanvas.width = width;
		tempCanvas.height = height;
		
		let tempContext = tempCanvas.getContext('2d');
		tempContext.drawImage(image, 0, 0);
		
		let imageData = tempContext.getImageData(0, 0, width, height);
		
		resolutionFunction(new Bitmap(imageData));
	    }
	    image.src = url;
	});
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

    render(destination, dstx, dsty, width, height, srcx, srcy) {
	if (width === undefined) {
	    width = this.width;
	}

	if (height === undefined) {
	    height = this.height;
	}

	if (srcx === undefined) {
	    srcx = 0;
	}

	if (srcy === undefined) {
	    srcy = 0;
	}
	
	if (srcx < 0) {
	    width += srcx;
	    dstx -= srcx;
	    srcx = 0;
	} else if (srcx + width >= this.width) {
	    width -= srcx + width - this.width;
	}

	if (srcy < 0) {
	    height += srcy;
	    dsty -= srcy;
	    srcy = 0;
	} else if (srcy + height >= this.height) {
	    height -= srcy + height - this.height;
	}

	if (dstx < 0) {
	    width += dsty;
	    srcx -= dstx;
	    dstx = 0;
	} else if (dstx + width >= destination.width) {
	    width -= dstx + width - destination.width;
	}

	if (dsty < 0) {
	    height += dsty;
	    srcy -= dsty;
	    dsty = 0;
	} else if (dsty + height >= destination.height) {
	    height -= dsty + height - destination.height;
	}

	let src_pixels = this.pixels;
	let dst_pixels = destination.pixels;
	
	let srci = (srcx + srcy * this.width) * 4;
	let dsti = (dstx + dsty * destination.width) * 4;
	
	for (let y = 0; y < height; y++) {
	    for (let x = 0; x < width; x++) {
		if (src_pixels[srci + 3] == 0) {
		    // ignore this pixel
		} else if (src_pixels[srci + 3] == 255) {
		    for (let j = 0; j < 3; j++) {
			dst_pixels[dsti + j] = src_pixels[srci + j];
		    }
		} else {
		    a = src_pixels[srci + 3] / 255.0;
		    for (let j = 0; j < 3; j++) {
			dst_pixels[dsti + j] = Math.round((1.0 - a) * dst_pixels[dsti + j] + a * src_pixels[srci + j]);
		    }
		}
		
		srci += 4;
		dsti += 4;
	    }

	    srci += (this.width - width) * 4;
	    dsti += (destination.width - width) * 4;
	}
    }
}
