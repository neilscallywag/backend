"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const authenticationController_1 = __importDefault(require("../Controllers/authenticationController"));
class Routes {
    constructor() {
        this._router = express.Router();
        //routes and middlewares
        //this._router.post("/api/dl/users/Connect", this.API.login);
        this._router.get("/", (req, res) => {
            if (req.session.isLoggedIn && req.session.userID) {
                res.send(req.session.isLoggedIn);
            }
            else {
                res.send(req.session);
            }
        });
        this._router.get("/login", (req, res) => {
            try {
                authenticationController_1.default.login(req, res);
                res.redirect("/");
            }
            catch (error) {
                res.json({ message: error.message });
            }
        });
        this._router.get("/logout", (req, res) => {
            res.clearCookie("HelloIamNeil");
            req.session.destroy(() => res.status(200).json({ message: "Logged out" }));
        });
        this._router.get("*", (req, res) => {
            res.status(404);
            throw new Error("BROKEN"); // Express will catch this on its own.
        });
    }
}
exports.default = Routes;
