"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = (io, socket) => {
    //{'to':dest_usr_id, 
    // 'message': msg }
    const sendMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        socket.emit('chat:send_message', payload);
        const to = payload.to;
        const msg = payload.msg;
        const from = payload.data.user;
        io.to(to).emit("chat:message", { 'to': to, 'message': msg });
    });
    console.log('Register chat handler');
    socket.on("chat:send_message", sendMessage);
};
//# sourceMappingURL=chatHandler.js.map