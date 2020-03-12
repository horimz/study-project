import { Request, Response } from "express";
import {
  get,
  controller,
  post,
  bodyValidator,
  use,
  patch,
  del
} from "./decorators";
import { authenticateToken } from "./middlewares/authenticateToken";
import { responseFormat } from "./response/responseFormat";
import { User, IUser, Token, UserDocument } from "../models/User";
import { Folder, FolderTypes } from "../models/Folder";

@controller("/api/auth")
class AuthController {
  // Send user information based on token
  @get("/users")
  @use(authenticateToken)
  getLogin(req: Request, res: Response): void {
    res.send(responseFormat(req.user.toJSON()));
  }

  // Create new user
  @post("/users")
  @bodyValidator("transactionTime", "content")
  async postUser(req: Request, res: Response): Promise<any> {
    const {
      transactionTime,
      content: { email, username }
    } = req.body;

    try {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(400).send({
          message:
            "This email has already been used. Please use a different email."
        });
      }

      const usernameExists = await User.findOne({ username });

      if (usernameExists) {
        return res.status(400).send({
          message: "Username is already taken. Please use a different username."
        });
      }

      // Create new user
      const user = new User(req.body.content);
      await user.save();

      // Create root folder
      const rootFolder = new Folder({
        folderName: "__ROOT_FOLDER__",
        type: FolderTypes.root,
        owner: user._id
      });
      await rootFolder.save();

      // TODO: send welcome mail

      const token = await user.generateAuthToken();

      // Send response
      res.status(201).send(responseFormat({ user: user.toJSON(), token }));
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  // Update user information
  @patch("/users")
  @bodyValidator("transactionTime", "content")
  @use(authenticateToken)
  async patchUser(req: Request, res: Response): Promise<any> {
    const {
      transactionTime,
      content: { username, description }
    } = req.body;

    if (!username) throw new Error();

    try {
      // Find user
      const user = await User.findOne({ _id: req.user._id });
      if (!user) return res.status(404).send();

      // Update user information
      user.username = username;
      user.description = description;

      // Save updated user
      await user.save();

      res.send(responseFormat(user.toJSON()));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // Delete user account
  @del("/users")
  @use(authenticateToken)
  async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      // Find user
      const user = await User.findOne({ _id: req.user._id });

      // TODO: should there be other cases where the user should not be able to delete their account?
      if (!user)
        return res
          .status(404)
          .send({ message: "Failed to delete account due to..." });

      // Delete user
      user.remove();

      res.send(responseFormat(user.toJSON()));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // Send user information and generate token after when user credentials are verified
  @post("/login")
  @bodyValidator("transactionTime", "content")
  async postLogin(req: Request, res: Response): Promise<void> {
    const {
      transactionTime,
      content: { email, password }
    } = req.body;

    try {
      // Find user based on credentials
      const user: UserDocument = await User.findByCredentials(email, password);

      // Generate token
      const token = await user.generateAuthToken();

      // Send response
      res.send(responseFormat({ user: user.toJSON(), token }));
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  // Remove token from user
  @post("/logout")
  @bodyValidator("transactionTime")
  @use(authenticateToken)
  async postLogout(req: Request, res: Response): Promise<any> {
    try {
      const { tokens } = req.user;
      if (!tokens) throw new Error();

      // Remove "one" token send from device
      req.user.tokens = tokens.filter((token: Token) => {
        return token.token != req.token;
      });

      // Save updated user
      await req.user.save();

      res.send(responseFormat(req.user.toJSON()));
    } catch (e) {
      res.status(500).send();
    }
  }
}

export { AuthController };
