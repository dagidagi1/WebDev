export = (io: any, socket: any) => {
    //{'to':dest_usr_id, 
    // 'message': msg }
    const sendMessage = async (payload) => {
        socket.emit('chat:send_message', payload)
        const to = payload.to
        const msg = payload.msg
        const from = payload.data.user
        io.to(to).emit("chat:message",{'to': to, 'message': msg})
    }
    console.log('Register chat handler')
    socket.on("chat:send_message", sendMessage);
}