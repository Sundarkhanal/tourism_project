const http = require("http")
const app = require("./src/config/express.config")

const server = http.createServer(app)

const PORT = "9005"
const HOST = "localhost"

server.listen(PORT, HOST, (e) => {
    if (!e) {
        console.log(`Your server is running on Port: ${PORT} and Host: ${HOST}`);
        console.log("**** Press Ctrl + C to stop the server ****");
        
    }
})

