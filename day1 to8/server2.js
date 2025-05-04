const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        const html = fs.readFileSync('./form.html', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }

    else if (req.url === '/submit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const message = new URLSearchParams(body).get('message');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>You said: ${message}</h1>`);
        });
    }
    else {
        res.writeHead(404);
        res.end('Page not found');
        }
    });

    server.listen(5000, () => {
        console.log('Server running on http://localhost:5000');
    });
