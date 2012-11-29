(function(global){

    var SIMILARITY_THRESHOLD = 0.5;

    var utils = {
        /**
         * Returns an array with averaged colors (shades of gray)
         * @param data
         */
        desaturate: function(data){
            var grays = new Array(data.length / 4);
            for(var i = 0; i < data.length; i+=4){
                grays[i] = (data[i] + data[i+1] + data[i+2]) / 3;
            }
        },

        /**
         * Returns the average of an array of numbers
         * @param data
         * @return Number
         */
        average: function(data){
            var total = 0;
            for(var i = 0; i < data.length; i++){
                total += data[i];
            }
            return Math.round(total / data.length);
        },

        /**
         * Generates a long bitmask (64bit) from an array of 64 bytes.
         * Each byte is converted in a positive bit if the byte is greater
         * or equal than the specified threshold
         *
         * @param data
         * @param threshold
         * @return Array [int lowBits, int hightBits]
         */
        thresholdMask: function(data, threshold){
            return [0,1].map(function(element, index){
                return utils.mapToBits(data.splice(0,32), function(byte){
                    return byte >= threshold;
                });
            });
        },

        /**
         * Generates a bit mask by invoking the callback on each element
         * of the provided array and computing the result as a series of bit.
         * The callback must return a boolean.
         *
         * @param data
         * @param callback
         * @return Number bitMask
         */
        mapToBits: function(data, callback){
            var result = 0, bit = 0;
            data.forEach(function(element){
                result |= callback(element) << bit++;
            });
            return result;
        }
    };

    function hash(image){
        var canvas = document.createElement("canvas");
        canvas.width = 8; canvas.height = 8;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, 8, 8);


        var imageData = context.getImageData(0, 0, 8, 8);
        var matrix = utils.desaturate(imageData.data);
        var average = utils.average(matrix);
        var bits = utils.bits(matrix, average);

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
