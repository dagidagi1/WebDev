import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import Chat from "../../models/chat_model"

export = (io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, 
    socket:Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
    
        const sendMessage = async (payload) => {
            const msg = new Chat({
                to: payload.to,
                message: payload.message,
                from: socket.data.user,
                time: Date.now()
            })
            await msg.save()

            io.to(msg.to).emit("chat:message", {'to': msg.to, 'from': msg.from, 'message': msg.message})
        }

        const getMessages = async (payload) => {
            const msgsFrom = await Chat.find({"from": payload.id, "to": socket.data.user})
            const msgsTo = await Chat.find({"to": payload.id, "from": socket.data.user})
            const msgs = msgsFrom.concat(msgsTo)

            socket.emit("chat:get_messages.response", msgs)
        }

    socket.on("chat:send_message", sendMessage)
    socket.on("chat:get_messages", getMessages)
}