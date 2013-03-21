(function(global){

    var SIMILARITY_THRESHOLD = 0.15;

    function hash(image){
        var pixelsMap = utils.pixelsMap(image,8,8),
            bytesMap = utils.desaturate(pixelsMap),
            average = utils.average(bytesMap),
            thresholdMap = utils.thresholdMap(bytesMap, average);

        return thresholdMap;
    }

    function compare(first, second){
        first = (first instanceof HTMLImageElement) ? hash(first) : first;
        second = (second instanceof HTMLImageElement) ? hash(second) : second;

        var distance = utils.hammingDistance(first, second);

        return (distance / 64).toFixed(3);
    }

    function same(first, second){
        return compare(first, second) <= SIMILARITY_THRESHOLD;
    }

    var utils = {
        /**
         * Returns an array with averaged colors (shades of gray)
         * @param data
         */
        desaturate: function(data){
            var grays = new Array(data.length / 4);
            for(var i = 0; i < grays.length; i++){
                var j = i * 4;
                grays[i] = Math.round((data[j] + data[j+1] + data[j+2]) / 3);
            }
            return grays;
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
         * @return Number bitmap
         */
        thresholdMap: function(data, threshold){
            return utils.mapToBits(data, function(byteData){
                return byteData >= threshold;
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
        },

        /**
         * Scale down the image to the specified width ad height and returns
         * an array of the resulting pixels
         *
         * @param image
         * @param width
         * @param height
         * @return CanvasPixelArray
         */
        pixelsMap: function(image,width,height){
            var canvas = document.createElement("canvas");
            canvas.width = width; canvas.height = height;

            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, width, height);

            return context.getImageData(0, 0, width, height).data;
        },

        /**
         * Returning the Hamming distance between two series of bits
         *
         * @param bitsA
         * @param bitsB
         * @return Number distance
         */
        hammingDistance: function(bitsA, bitsB){
            var diffMask = (bitsA ^ bitsB).toString(2);
            return (diffMask.match(/1/g)||[]).length;
        }
    };

    global.simi = {
        hash: hash,
        compare: compare,
        same: same,
        utils: utils
    };
})(window);
