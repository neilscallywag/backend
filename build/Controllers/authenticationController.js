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
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor() { }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // here u would want to await fetch from database then assign if not send error response
            // ideally ud want this logic in the auth service section
            req.session.isLoggedIn = true;
            req.session.userID = 2;
            res.status(200).json({ message: "Logged in", userID: req.session.userID });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new AuthController();
