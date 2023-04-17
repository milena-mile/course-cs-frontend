document.addEventListener('DOMContentLoaded', function () {
    var _a;
    var canvasWrapper = document.querySelector(".canvas-wrapper");
    var canvas = document.createElement("canvas");
    if (!(canvasWrapper === null || canvasWrapper === void 0 ? void 0 : canvasWrapper.querySelector('canvas')))
        canvasWrapper === null || canvasWrapper === void 0 ? void 0 : canvasWrapper.append(canvas);
    var ctx = canvas.getContext("2d");
    function fetchImage(path) {
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.src = path;
            image.crossOrigin = "Anonymous";
            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                resolve(imgData);
                reject('Image was not found');
            };
        });
    }
    var imgData = fetchImage('cat.jpg');
    function applyFilter(elem) {
        var ctx = canvas.getContext("2d");
        return imgData.then(function (res) {
            var newImgPixels = new Uint8Array(res.data);
            var newImgData = ctx.createImageData(canvas.width, canvas.height);
            var resImgPixels = filterType(elem, newImgPixels);
            newImgData.data.set(resImgPixels);
            ctx.putImageData(newImgData, 0, 0);
            return newImgData;
        });
    }
    (_a = document.querySelectorAll('.canvas-btn')) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
        item.addEventListener('click', function (e) {
            var elem = item === null || item === void 0 ? void 0 : item.getAttribute('data-filter');
            applyFilter(elem);
        });
    });
});
function inverse(newImgPixels) {
    var resImgPixels = new Uint8Array(newImgPixels);
    for (var i = 0; i < newImgPixels.length; i += 4) {
        resImgPixels[i] = 255 ^ newImgPixels[i];
        resImgPixels[i + 1] = 255 ^ newImgPixels[i + 1];
        resImgPixels[i + 2] = 255 ^ newImgPixels[i + 2];
        resImgPixels[i + 3] = 255;
    }
    return resImgPixels;
}
function grayscale(newImgPixels) {
    var resImgPixels = new Uint8Array(newImgPixels);
    for (var i = 0; i < newImgPixels.length; i += 4) {
        var grayscale_1 = (newImgPixels[i] + newImgPixels[i + 1] + newImgPixels[i + 2]) / 3;
        resImgPixels[i] = grayscale_1;
        resImgPixels[i + 1] = grayscale_1;
        resImgPixels[i + 2] = grayscale_1;
    }
    return resImgPixels;
}
function bright(newImgPixels) {
    var resImgPixels = new Uint8Array(newImgPixels);
    for (var i = 0; i < newImgPixels.length; i += 4) {
        var brightness = 0.299 * newImgPixels[i] + 0.587 * newImgPixels[i + 1] + 0.144 * newImgPixels[i + 2];
        resImgPixels[i] = newImgPixels[i];
        resImgPixels[i + 1] = newImgPixels[i + 1];
        resImgPixels[i + 2] = newImgPixels[i + 2];
        resImgPixels[i + 3] = brightness;
    }
    return resImgPixels;
}
function reset(newImgPixels) {
    var resImgPixels = new Uint8Array(newImgPixels);
    for (var i = 0; i < newImgPixels.length; i += 4) {
        resImgPixels[i] = newImgPixels[i];
        resImgPixels[i + 1] = newImgPixels[i + 1];
        resImgPixels[i + 2] = newImgPixels[i + 2];
        resImgPixels[i + 3] = 255;
    }
    return resImgPixels;
}
function filterType(elem, newImgPixels) {
    var filter;
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
