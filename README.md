JavaScript Image Similarity Comparison
=======================

This is a first draft of a basic image comparison algorithm using perceptual hashes.
The algorithm used is the one described here:

http://www.hackerfactor.com/blog/index.php?/archives/432-Looks-Like-It.html

The library is only supposed to work in WebKit.

Usage
-----

    var img1 = $('#image1'),
        img2 = $('#imge2');

    // returns a difference rate (from 0 to 1)
    simi.compare(img1, img2);

    // returns true or false (same as compare with a default threshold)
    simi.same(img1, img2);

    // returns a perceptual hash of the image
    // simi.hash could be invoked to cash the hash
    var hash = simi.hash(img1);
    simi.compare(hash, img2); // only img2 will be hashed