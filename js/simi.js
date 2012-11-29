(function(global){

    var SIMILARITY_THRESHOLD = 0.5;

    var utils = {
        desaturate: function(imageData){
            for(var i = 0; i < imageData.data.length; i+=4){
                var average = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3;
                imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = average;
            }
        }
    };

    function hash(image){
        var canvas = document.createElement("canvas");
        canvas.width = 8; canvas.height = 8;
        canvas.getContext("2d").drawImage(image, 0, 0, 8, 8);

        var imageData = canvas.getImageData();
        _desaturate(imageData);

        return canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, "");
    }

    function compare(first, second){
        first = (first instanceof ImageHash) ? first : hash(first);
        second = (second instanceof ImageHash) ? second : hash(second);
        return first == second;
    }

    function same(first, second){
        return compare(first, second) >= SIMILARITY_THRESHOLD;
    }

    global.simi = {
        hash: hash,
        compare: compare,
        same: same,
        utils: utils
    }
})(window);
