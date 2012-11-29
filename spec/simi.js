describe("simi", function () {

    describe("utils", function () {

        describe("mapToBits", function () {
            it("generates a bit mask out of a callback run on each element of an array", function () {
                var bitMask = simi.utils.mapToBits([1, 2, 3, 4], function (item) {
                    return item % 2 == 0;
                });

                assert.equal('1010', bitMask.toString(2));
            });
        });

        describe("thresholdMask", function () {
            it("returns the correct lower bits of the mask", function () {
                var input = new Array(64);
                input[0] = 10;
                input[1] = 20;
                input[2] = 30;

                var threshold = 20;

                var expectedOutput = '110';

                var bitMask = simi.utils.thresholdMask(input, threshold);

                assert.equal(expectedOutput, bitMask[0].toString(2));
            });

            it("returns the correct higher bits of the mask", function () {
                var input = new Array(64);
                input[32+0] = 10;
                input[32+1] = 20;
                input[32+2] = 30;

                var threshold = 20;

                var expectedOutput = '110';

                var bitMask = simi.utils.thresholdMask(input, threshold);

                assert.equal(expectedOutput, bitMask[1].toString(2));
            });
        });

    });

});
