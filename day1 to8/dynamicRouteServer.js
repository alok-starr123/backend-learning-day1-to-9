const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const parts = url.split('/');

    if (parts[1] === 'greet' && parts[2]) {
        const name = parts[2];
        res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end(`Hey ${name}, this is a dynamic route!`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});