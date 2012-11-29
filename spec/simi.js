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

        describe("thresholdMap", function () {
            it("returns the correct bits", function () {
                var input = new Array(64);
                input[0] = 10;
                input[1] = 20;
                input[2] = 30;

                var threshold = 20;

                var expectedOutput = '110';

                var bitMask = simi.utils.thresholdMap(input, threshold);

                assert.equal(expectedOutput, bitMask.toString(2));
            });
        });

        describe("hammingDistance", function () {
            it("returns the correct distance", function () {
                var from   = parseInt('11111', 2),
                    to     = parseInt('10110', 2);

                var distance = simi.utils.hammingDistance(from, to);

                assert.equal(2, distance);
            });
        });


    });

});
