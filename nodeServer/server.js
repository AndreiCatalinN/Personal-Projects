function Server() {
    const http = require('http');
    const formidable = require('formidable');
    const util = require('util');

    const server = http.createServer( function(req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            //res.setHeader('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method.toLowerCase() == 'post') {
        processForm(req, res);
        return;
    }
    res.end();
    });

    function processForm(req, res) {
        const form = new formidable.IncomingForm();

        form.parse(req, function(err, fields) {
            fields.id = 'ABC123';
            var data = JSON.stringify({fields: fields});
                res.writeHead(200, {'content-type': 'text/plain'});
            res.end(data);
            console.log('posted fields:\n');
            console.log(data);

    });
    }

    const port = 3100;
    server.listen(port);
    console.log("server listening on port " + port);
}

Server();