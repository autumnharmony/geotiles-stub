var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});

module.exports = MockBase => class MockRivers extends MockBase {

  mocks (options) {
    return [
	   	{
		 route: '/tiles/:z/:x\::y/tile.png',
	         responses: [
                        {
			request: {
				method: 'GET'
			},
                        response: function(ctx, z, x, y){
				ctx.respond = false;
				ctx.type ="image/png";
				ctx.res.writeHead(200, {'Content-Type': 'image/png'});

				var color = x * y * z;
				color = String("000000" + color).slice(-6);

				gm(256, 256, "#"+color)
				.fontSize(20)
				.drawText(10, 50, "/"+z+"/" + x + ":" + y)
				.drawText(10, 100, "/tile.png")
				.toBuffer("PNG", function (err, buffer) {
					if (err) console.log(err);
					ctx.res.write(buffer);
					ctx.res.end();
			        });
	  	        }
		  }
		]
	    }
       ];
  }

}
