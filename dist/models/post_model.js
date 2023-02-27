"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    txt: {
        type: String,
        required: true
    },
    usrId: {
        type: String,
        required: true
    },
    imgUri: {
        type: String,
        required: true
    }
});
module.exports = mongoose_1.default.model('Post', postSchema);
//# sourceMappingURL=post_model.js.map