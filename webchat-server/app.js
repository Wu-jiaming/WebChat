global._ = require("lodash")
global.Promise = require("bluebird")

const http = require('http')
const fs = require('fs')

let types = {
    'jpg': 'image/jpeg', 
    'gif': 'image/gif',
    'png': 'image/png'
}

let server = http.createServer((req, res) => {
    let url = req.url
    if (/^\/img\//.test(url)) {
        let ext = url.substring(url.lastIndexOf('.')+1)
        res.writeHead(200, {'content-type': types[ext]})
        let imgUrl = `./static/${url.replace('/img/', '')}`
        if(fs.existsSync(imgUrl)){
            fs.createReadStream(imgUrl).pipe(res)
        }
    }
})

let io = require('socket.io')(server);
let eventsMap = require("./eventsMap")('./events')

server.listen(3004, () => {
    console.log(`server listening on ${server.address().port}`)
});

io.on('connection', function (socket) {
    eventsMap(socket, io)
});
