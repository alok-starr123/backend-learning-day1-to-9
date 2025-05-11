const http = require("http");
const { v4: uuidv4 } = require("uuid");

let users = [];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/users" && method === "GET") {
        res.writeHead(200,
            { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    }
    else if (url === "/users" && method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            const newUser = { id: uuidv4(), ...data };
            users.push(newUser);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newUser));
        });
    }
    else if (url.startsWith("/users/") && method === "PUT") {
        const id = url.split("/")[2];
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            const index = users.findIndex(u => u.id === id);

            if (index !== -1) {
                users[index] = { ...users[index], ...data };
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(users[index]));
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("User not find");
            }
        });
    }
    else if (url.startsWith("/users/") && method === "DELETE") {
        const id = url.split("/")[2];
        const index = users.findIndex(user => user.id === id);

        if (index !== -1) {
            const deletedUser = users.splice(index, 1);
            res.writeHead(200, { "Content-Type": "apllication/json" });
            res.end(JSON.stringify(deletedUser[0]));
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("User not Found");
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});