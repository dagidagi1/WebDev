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
        const msg = new chat_model_1.default({
            to: payload.to,
            message: payload.message,
            from: socket.data.user,
            time: Date.now()
        });
        yield msg.save();
        io.to(msg.to).emit("chat:message", { 'to': msg.to, 'from': msg.from, 'message': msg.message });
    });
    const getMessages = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const msgsFrom = yield chat_model_1.default.find({ "from": payload.id, "to": socket.data.user });
        const msgsTo = yield chat_model_1.default.find({ "to": payload.id, "from": socket.data.user });
        const msgs = msgsFrom.concat(msgsTo);
        socket.emit("chat:get_messages.response", msgs);
    });
    socket.on("chat:send_message", sendMessage);
    socket.on("chat:get_messages", getMessages);
};
//# sourceMappingURL=chatHandler.js.map