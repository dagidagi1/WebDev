"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const http_1 = __importDefault(require("http"));
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
app.use('/auth', authRoutes_1.default);
app.use('/file', fileRoutes_1.default);
app.use('/upload_files', express_1.default.static('upload_files'));
app.use('/usr', userRoutes_1.default);
if (process.env.NODE_ENV == "development") {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Library API",
                version: "1.0.0",
                description: "A simple Express Library API",
            },
            servers: [{ url: "http://localhost:3000", },],
        },
        apis: ["./src/routes/*.ts"],
    };
    const specs = (0, swagger_jsdoc_1.default)(options);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
}
const server = http_1.default.createServer(app);
module.exports = server;
//# sourceMappingURL=server.js.map