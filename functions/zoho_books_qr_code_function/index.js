'use strict';

module.exports = async (req, res) => {
	var url = req.url;

	switch (url) {
		case '/':
			res.writeHead(200);
			res.write('done');
			break;
		default:
			res.writeHead(404);
			res.write('You might find the page you are looking for at "/" path');
			break;
	}
	res.end();
};
