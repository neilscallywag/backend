import * as express from "express";
import session from "express-session";
import authenticationController from "../Controllers/authenticationController";

class Routes {
  public _router = express.Router();

  constructor() {
    //routes and middlewares
    //this._router.post("/api/dl/users/Connect", this.API.login);
    this._router.get("/", (req, res) => {
      if (req.session.isLoggedIn && req.session.userID) {
        res.send(req.session.isLoggedIn);
      } else {
        res.send(req.session);
      }
    });
    this._router.get("/login", (req, res) => {
      try {
        authenticationController.login(req, res);
        res.redirect("/");
      } catch (error) {
        res.json({ message: error.message });
      }
    });

    this._router.get("/logout", (req, res) => {
      res.clearCookie("HelloIamNeil");
      req.session.destroy(() =>
        res.status(200).json({ message: "Logged out" })
      );
    });

    this._router.get("*", (req, res) => {
      res.status(404);
      throw new Error("BROKEN"); // Express will catch this on its own.
    });
  }
}
export default Routes;
