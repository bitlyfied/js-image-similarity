JavaScript Image Similarity Comparison
=======================

[![Build Status](https://travis-ci.org/bitlyfied/js-image-similarity.png)](https://travis-ci.org/bitlyfied/js-image-similarity)

This is a first draft of a basic image comparison algorithm using average hashes.
The algorithm used is the one described here:

http://www.hackerfactor.com/blog/index.php?/archives/432-Looks-Like-It.html

The library is only supposed to work in latest WebKit.
Supports for Canvas and Array.forEach is required.

Usage
-----

    var img1 = $('#image1'),
        img2 = $('#imge2');

    // returns a difference rate (from 0 to 1)
    simi.compare(img1, img2);

    // returns true or false (same as compare with a default threshold)
    simi.same(img1, img2);

    // returns a hash of the image
    // simi.hash could be invoked to cache the hash
    var hash = simi.hash(img1);
    simi.compare(hash, img2); // only img2 will be hashed


Dependencies
-----

The library doesn't have any external dependencies, but you need bower, jquery, underscore, mocha and chai to run tests


How to run tests
----

Tests are now run automatically using Travis CI.
If you need to run tests manually you just need to use Grunt and run the default task.

If you want to run tests manually from a browser you can follow this process:

    # run tests inside the browser
    cd ..
    python -m SimpleHTTPServer
    open http://localhost:8000/spec/index.html

Always remember to download spec depdencies using bower before doing anything:

    # install tests dependencies using bower
    cd spec
    bower install
