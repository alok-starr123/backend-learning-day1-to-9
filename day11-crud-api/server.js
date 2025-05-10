const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 8000;
const filePath = './data/users.json';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    const readUsers = () => {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    };

    const writeUsers = (users) => {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    };
    if (path === '/users' && method === 'GET') {
        const users = readUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    else if (path === '/users' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const newUser = JSON.parse(body);
            const users = readUsers();

            const id = users.length ?
            users[users.length - 1].id + 1 : 1;
            const userWithId = { id, ...newUser };

            users.push(userWithId);
            writeUsers(users);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(userWithId));
        });
    }
    else if (method === 'GET' && path.startsWith('/users/')) {
        const id = parseInt(path.split('/')
    [2]);
    const users = readUsers();
    const user = users.find(u => u.id === id);

    if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    }
    } else if (method === 'PUT' && path.startsWith('/users/')) {
        const id = parseInt(path.split('/')[2]);
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updateUser = JSON.parse(body);
            const users = readUsers();
            const userIndex = users.findIndex(u => u.id === id);

            if (userIndex !== -1) {
                users[userIndex] = { id, ...updateUser };
                writeUsers(users);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users[userIndex]));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        });
    } else if (method === 'DELETE' && path.startsWith('/users/')) {
        const id = parseInt(path.split('/')
        [2]);
        const users = readUsers();
        const filterdUsers = users.filter(u => u.id !== id);

        if (users.length === filterdUsers.length) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        } else {
            writeUsers(filterdUsers);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted' }));
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});