"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '1mb' }));
app.use(body_parser_1.default.json());
mongoose_1.default.connect(process.env.DATABASE_URL); //, {useNewUrlParser: true})
const db = mongoose_1.default.connection;
db.on('error', err => { console.error(err); });
db.once('open', () => { console.log('connected to mongo!'); });
app.use('/pub', express_1.default.static('public'));
app.use('/post', postRoutes_1.default);
module.exports = app;
//# sourceMappingURL=server.js.map