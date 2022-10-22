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
Object.defineProperty(exports, "__esModule", { value: true });
const out_1 = require("connect-typeorm/out");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const datasource_1 = __importDefault(require("./Database/datasource"));
const datasource_2 = __importDefault(require("./Database/datasource"));
const routes_1 = __importDefault(require("./Routes/routes"));
const session_entity_1 = require("./Database/Entities/session.entity");
const cors_1 = __importDefault(require("cors"));
/////////////////////////////////////////////////////////
// Some Self Reflection
// - Difference between middlewares and controllers
//      - middleware are a step in your API and controllers as the entity that will actually respond to the requests.
// - Session store
//      - Session store is a place where session data is being stored on server.
//      - On web its usually being identified by a cookie stored in clients browser.
//      - So it allows your app to identify user and keep him logged in for example.
//      -
//      - Whichever "store" eg Redis/connect-typeorm I choose, it needs to be passed as a param to express app object
//
//        app.use(
//                  session(name:
//                        store:
//                        cookie:
//                        secret:
//                        resave:
//                        )
//                );
//
//  - services are business logics
//      - Controllers will recieve and validate the request and pass it to service for computation and processing
//      - The return is done by the controllers also
//
//
//
//
//
//
//
//
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
// Express Setup setup
/////////////////////////////////////////////////////////////////////
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.listen(4000, () => {
        console.log("port 4000 Running");
    });
    /////////////////////////////////////////////////////////////////////
    // Session Store setup
    /////////////////////////////////////////////////////////////////////
    const sessionRepository = datasource_1.default.getRepository(session_entity_1.Session);
    app.use((0, express_session_1.default)({
        name: "HelloIamNeil",
        store: new out_1.TypeormStore({
            cleanupLimit: 2,
            limitSubquery: false,
            ttl: 86400,
        }).connect(sessionRepository),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: false,
            secure: false,
            sameSite: "lax", // CSRF protection
        },
        secret: "sdiofhsdkfndsfjkdsnio",
        resave: false,
        saveUninitialized: false,
    }));
    /////////////////////////////////////////////////////////////////////
    // API Routes setup
    /////////////////////////////////////////////////////////////////////
    const _routes = new routes_1.default();
    app.use("/", _routes._router);
    /////////////////////////////////////////////////////////////////////
    // cors
    /////////////////////////////////////////////////////////////////////
    const corsOptions = {
        origin: "http://localhost:4000",
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
});
/////////////////////////////////////////////////////////////////////
// Test Database Connection
/////////////////////////////////////////////////////////////////////
try {
    datasource_2.default
        .initialize()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Success");
    }))
        .catch((error) => console.log(error));
}
catch (error) {
    console.log("Database Connection Failed");
}
// const connection = async() => {appDataSource.initialize()}
// connection.manager
main();
