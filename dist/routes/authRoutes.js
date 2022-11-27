"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const router = express_1.default.Router();
router.post('/login', auth_1.default.login);
router.post('/register', auth_1.default.register);
router.post('/logout', auth_1.default.authenticateMiddleware, auth_1.default.logout);
router.get('refresh', auth_1.default.refresh);
module.exports = router;
//# sourceMappingURL=authRoutes.js.map