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
const user_model_1 = __importDefault(require("../models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import { response } from '../server'
function sendError(res, error) {
    res.status(400).send({
        'status': 'fail',
        'message': error
    });
}
const authenticateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (authHeader == null || authHeader == undefined)
        return sendError(res, 'authentication header is missing!');
    const token = authHeader.split(' ')[1];
    if (token == null)
        return sendError(res, 'Authenticator missing');
    try {
        const usr = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //TODO: fix ts types
        req.body.usrId = usr._id;
        console.log(usr._id);
        next();
    }
    catch (err) {
        return sendError(res, 'failed to validate token!');
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("register!");
    const email = req.body.email;
    const pass = req.body.password;
    if (email == null || pass == null) {
        return sendError(res, 'Please provide email and password!');
    }
    try {
        let user = yield user_model_1.default.findOne({ 'email': email });
        if (user != null) {
            return sendError(res, 'User is already exist!');
        }
    }
    catch (err) {
        return sendError(res, err);
    }
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const encryptedPassword = yield bcrypt_1.default.hash(pass, salt);
        let newUser = new user_model_1.default({
            'email': email,
            'password': encryptedPassword
        });
        newUser = yield newUser.save();
        res.status(200).send(newUser);
    }
    catch (err) {
        return sendError(res, err);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Login!');
    const email = req.body.email;
    const pass = req.body.password;
    if (email == null || pass == null) {
        return sendError(res, 'Please provide email and password!');
    }
    try {
        let user = yield user_model_1.default.findOne({ 'email': email });
        if (user == null)
            return sendError(res, 'bad email or pass!');
        const match = yield bcrypt_1.default.compare(pass, user.password);
        if (!match)
            return sendError(res, 'bad email or pass');
        const accessToken = yield jsonwebtoken_1.default.sign({ '_id': user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
        const refreshToken = yield jsonwebtoken_1.default.sign({ '_id': user._id }, process.env.REFRESH_TOKEN_SECRET);
        if (user.refresh_tokens == null)
            user.refresh_tokens = [refreshToken];
        else
            user.refresh_tokens.push(refreshToken);
        yield user.save();
        res.status(200).send({
            'accessToken': accessToken,
            'refreshToken': refreshToken
        });
    }
    catch (err) {
        return sendError(res, err.message);
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Log out");
    const authHeader = req.headers['authorization'];
    if (authHeader == null || authHeader == undefined)
        return sendError(res, 'authentication header is missing!');
    const ref_token = authHeader.split(' ')[1];
    if (ref_token == null)
        return sendError(res, 'Authenticator missing');
    try {
        const usr = yield jsonwebtoken_1.default.verify(ref_token, process.env.REFRESH_TOKEN_SECRET);
        const usrObj = yield user_model_1.default.findById(usr._id);
        if (usrObj == null)
            return sendError(res, 'invalid validating token');
        if (!usrObj.refresh_tokens.includes(ref_token)) {
            usrObj.refresh_tokens = [];
            yield usrObj.save();
            return sendError(res, 'invalid validating token');
        }
        usrObj.refresh_tokens.splice(usrObj.refresh_tokens.indexOf(ref_token), 1);
        yield usrObj.save();
        res.status(200).send();
    }
    catch (err) {
        return sendError(res, err.message);
    }
});
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (authHeader == null || authHeader == undefined)
        return sendError(res, 'authentication header is missing!');
    const ref_token = authHeader.split(' ')[1];
    if (ref_token == null)
        return sendError(res, 'Authenticator missing');
    try {
        const usr = yield jsonwebtoken_1.default.verify(ref_token, process.env.REFRESH_TOKEN_SECRET);
        const usrObj = yield user_model_1.default.findById(usr._id);
        if (usrObj == null)
            return sendError(res, 'invalid validating token');
        if (!usrObj.refresh_tokens.includes(ref_token)) {
            usrObj.refresh_tokens = [];
            yield usrObj.save();
            return sendError(res, 'invalid validating token');
        }
        const newAccessToken = yield jsonwebtoken_1.default.sign({ '_id': usr._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
        const newRefreshToken = yield jsonwebtoken_1.default.sign({ '_id': usr._id }, process.env.REFRESH_TOKEN_SECRET);
        usrObj.refresh_tokens[usrObj.refresh_tokens.indexOf(ref_token)];
        yield usrObj.save();
        res.status(200).send({
            'accessToken': newAccessToken,
            'refreshToken': newRefreshToken
        });
    }
    catch (err) {
        sendError(res, err.message);
    }
});
module.exports = { login, register, logout, refresh, authenticateMiddleware };
//# sourceMappingURL=auth.js.map