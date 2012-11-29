describe("simi", function() {
  describe("utils", function() {
    describe("desaturate", function() {
      it("removes colors from an ImageData", function() {
          var image = document.getElementById('colorful-picture');
          var width = image.width,
              height = image.height;
          var canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;

          var context = canvas.getContext('2d');
          context.drawImage(image,0,0,width,height);

          var imageData = context.getImageData(0,0,width,height);

          simi.utils.desaturate(imageData);

          context.putImageData(imageData,0,0);
          document.getElementsByTagName('body')[0].insertBefore(canvas, image);
      });
    });
  });
});
