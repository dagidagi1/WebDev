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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const chat_model_1 = __importDefault(require("../../models/chat_model"));
module.exports = (io, socket) => {
    const sendMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(payload);
        const nowTime = Date.now();
        const msg = new chat_model_1.default({
            to: payload.to,
            message: payload.message,
            from: socket.data.user,
            time: Date.now()
        });
        const res = yield msg.save();
        io.to(msg.to).emit("chat:message", { 'id': res._id, 'to': msg.to, 'from': msg.from, 'message': msg.message, 'time': nowTime });
    });
    const getMessages = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const msgsFrom = yield chat_model_1.default.find();
        socket.emit("chat:get_messages.response", msgsFrom);
    });
    socket.on("chat:send_message", sendMessage);
    socket.on("chat:get_messages", getMessages);
};
//# sourceMappingURL=chatHandler.js.map