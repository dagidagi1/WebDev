"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_1 = __importDefault(require("../controllers/post"));
router.get('/', (req, res) => {
    post_1.default.getAllPosts(req, res);
});
router.get('/:id', post_1.default.getPostById);
router.put('/:id', post_1.default.putPostById);
router.post('/', (req, res) => {
    post_1.default.addPost(req, res);
});
module.exports = router;
//# sourceMappingURL=postRoutes.js.map