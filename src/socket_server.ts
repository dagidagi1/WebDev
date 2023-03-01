import { Server } from "socket.io"
import http from 'http'
import echoHandler from "./socket/events/echoHandler"
import postHandler from "./socket/events/postHandler"
import chatHandler from "./socket/events/chatHandler"
import jwt from 'jsonwebtoken'
export = (server: http.Server) => {
    const io = new Server(server)
    io.use(async (socket, next) => {
        let token = socket.handshake.auth.token;
        if (token == null) return next(new Error('Authentication error'))
        token = token.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return next(new Error('Authentication error'));
            } else {
                socket.data.user = user._id
                return next()
            }
        })
    });

    io.on('connection', async(socket) => {
        console.log('a user connected ' + socket.id)
        echoHandler(io, socket)
        postHandler(io, socket)
        chatHandler(io, socket)
        await socket.join('global')
    })
    return io

}
