document.addEventListener('DOMContentLoaded', () => {
    let canvasWrapper = document.querySelector(".canvas-wrapper");
    let canvas = document.createElement("canvas");
    if (!canvasWrapper?.querySelector('canvas')) canvasWrapper?.append(canvas);
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    function fetchImage(path: string) {
        return new Promise<ImageData>((resolve, reject) => {
            const image = new Image();
            image.src = path;
            image.crossOrigin = "Anonymous";

            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                resolve(imgData);
                reject('Image was not found');
            }
        })
        
    }

    let imgData = fetchImage('cat.jpg');

    function applyFilter(elem: string): Promise<ImageData> {
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        return imgData.then(res => {
            const newImgPixels = new Uint8Array(res.data);
            let newImgData = ctx.createImageData(canvas.width, canvas.height);
            let resImgPixels = filterType(elem, newImgPixels);
            newImgData.data.set(resImgPixels);
            ctx.putImageData(newImgData,0,0);
            return newImgData;
        });  
    }

    document.querySelectorAll('.canvas-btn')?.forEach((item: Element): void => {
        item.addEventListener('click', (e) => {
            let elem = item?.getAttribute('data-filter') as string;
            applyFilter(elem);
            
        });
    })
})

function inverse(newImgPixels: Uint8Array): Uint8Array { 
    let resImgPixels = new Uint8Array(newImgPixels);
    for (let i = 0; i < newImgPixels.length; i+=4) {
        resImgPixels[i] = 255 ^ newImgPixels[i];
        resImgPixels[i + 1] = 255 ^ newImgPixels[i + 1];
        resImgPixels[i + 2] = 255 ^newImgPixels[i + 2];
        resImgPixels[i + 3] = 255;
    }
    return resImgPixels;
}

function grayscale(newImgPixels: Uint8Array): Uint8Array {
    let resImgPixels = new Uint8Array(newImgPixels);
    for (let i = 0; i < newImgPixels.length; i+=4) {
        let grayscale = (newImgPixels[i] + newImgPixels[i + 1] + newImgPixels[i + 2]) / 3;
        resImgPixels[i] = grayscale;
        resImgPixels[i + 1] = grayscale;
        resImgPixels[i + 2] = grayscale;
    }
    return resImgPixels;
}

function bright(newImgPixels: Uint8Array): Uint8Array {
    let resImgPixels = new Uint8Array(newImgPixels);
    for (let i = 0; i < newImgPixels.length; i+=4) {
        let brightness = 0.299 * newImgPixels[i] + 0.587 * newImgPixels[i + 1] + 0.144 * newImgPixels[i + 2];
        resImgPixels[i] = newImgPixels[i];
        resImgPixels[i + 1] = newImgPixels[i + 1];
        resImgPixels[i + 2] = newImgPixels[i + 2];
        resImgPixels[i + 3] = brightness;
    }
    return resImgPixels;
}

function reset(newImgPixels: Uint8Array): Uint8Array {
    let resImgPixels = new Uint8Array(newImgPixels);
    for (let i = 0; i < newImgPixels.length; i+=4) {
        resImgPixels[i] = newImgPixels[i];
        resImgPixels[i + 1] = newImgPixels[i + 1];
        resImgPixels[i + 2] = newImgPixels[i + 2];
        resImgPixels[i + 3] = 255;
    }
    return resImgPixels;
}

function filterType(elem: string, newImgPixels: Uint8Array): Uint8Array {
    let filter;
    switch (elem) {
        case 'reset':
            filter = reset(newImgPixels);
            break;
        case 'inverse':
            filter = inverse(newImgPixels);
            break;
        case 'grayscale':
            filter = grayscale(newImgPixels);
            break;
        case 'bright':
            filter = bright(newImgPixels);
            break;
    }
    return filter;
}