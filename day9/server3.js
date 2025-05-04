const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const html = fs.readFileSync('./index.html', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }

    else if (req.url.startsWith('/public/')) {
        const filePath = '.' + req.url;
        const ext = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
        }[ext] || 'text/plain';

        try {
            const data = fs.readFileSync(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        } catch (err) {
            res.writeHead(404);
            res.end( 'File not found');
        }
    }
    else {
        res.writeHead(404);
        res.removeHeader('404 Not Found');
    }
});

server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});