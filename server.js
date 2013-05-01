var http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs");

http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname,
		filename = path.join(process.cwd(), uri);

	var contentTypesByExt = {
		'.html': "text/html",
		'.css': "text/css",
		'.js': "text/javascript"
	};

	fs.exists(filename, function(exists) {
		if(!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.end("404 Not Found\n");
			return;
		}

		if (fs.statSync(filename).isDirectory()) {
			filename += '/index.html';
		}

		fs.readFile(filename, function(err, file) {
			if (err) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.end(err + "\n");
				return;
			}

			var contentType = contentTypesByExt[path.extname(filename)] || "text/plain";
			response.writeHead(200, {"Content-Type": contentType});
			response.end(file);
		});
	});
}).listen(8888);

console.log("Server has started.");