import { Request, Response } from "express";
class AuthController {
  constructor() {}

  async login(req: Request, res: Response) {
    // here u would want to await fetch from database then assign if not send error response
    // ideally ud want this logic in the auth service section
    req.session.isLoggedIn = true;
    req.session.userID = 2;
    res.status(200).json({ message: "Logged in", userID: req.session.userID });
  }

  async register(req: Request, res: Response) {}

  async logout(req: Request, res: Response) {}
}

export default new AuthController();
