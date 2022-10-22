import { TypeormStore } from "connect-typeorm/out";
import express from "express";
import session from "express-session";
import dataSource from "./Database/datasource";
import appDataSource from "./Database/datasource";
import routes from "./Routes/routes";
import { Session } from "./Database/Entities/session.entity";
import cors from "cors";
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

const main = async () => {
  const app = express();
  app.listen(4000, () => {
    console.log("port 4000 Running");
  });

  /////////////////////////////////////////////////////////////////////
  // Session Store setup
  /////////////////////////////////////////////////////////////////////
  const sessionRepository = dataSource.getRepository(Session);
  app.use(
    session({
      name: "HelloIamNeil", // cookie name
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false, // If using MariaDB.
        ttl: 86400,
      }).connect(sessionRepository),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: false, // makes cookie inaccessible to front end JS if true
        secure: false, // __PROD__ ENV variable makes cookie only work in https if set to true
        sameSite: "lax", // CSRF protection
      },
      secret: "sdiofhsdkfndsfjkdsnio", //ENV Variable
      resave: false,
      saveUninitialized: false,
    })
  );

  /////////////////////////////////////////////////////////////////////
  // API Routes setup
  /////////////////////////////////////////////////////////////////////
  const _routes = new routes();
  app.use("/", _routes._router);

  /////////////////////////////////////////////////////////////////////
  // cors
  /////////////////////////////////////////////////////////////////////
  const corsOptions = {
    origin: "http://localhost:4000", //Your Client, do not write '*'
    credentials: true,
  };
  app.use(cors(corsOptions));
};

/////////////////////////////////////////////////////////////////////
// Test Database Connection
/////////////////////////////////////////////////////////////////////
try {
  appDataSource
    .initialize()
    .then(async () => {
      console.log("Success");
    })
    .catch((error) => console.log(error));
} catch (error) {
  console.log("Database Connection Failed");
}

// const connection = async() => {appDataSource.initialize()}
// connection.manager

main();
