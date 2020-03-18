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
import { User, Token, UserDocument } from "../models/User";
import { Folder, FolderTypes } from "../models/Folder";

@controller("/api")
class AuthController {
  @get("/users")
  @use(authenticateToken)
  getUser(req: Request, res: Response): void {
    res.send(responseFormat(req.user.toJSON()));
  }

  @post("/users")
  @bodyValidator("transactionTime", "content")
  async createUser(req: Request, res: Response): Promise<any> {
    const {
      content: { email, username }
    } = req.body;

    try {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(400).send({
          errorMessage:
            "This email has already been used. Please use a different email."
        });
      }

      const usernameExists = await User.findOne({ username });

      if (usernameExists) {
        return res.status(400).send({
          errorMessage:
            "Username is already taken. Please use a different username."
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

  @patch("/users")
  @bodyValidator("transactionTime", "content")
  @use(authenticateToken)
  async updateUser(req: Request, res: Response): Promise<any> {
    const {
      content: { username, description }
    } = req.body;

    try {
      const user = await User.findOne({ _id: req.user._id });
      if (!user) {
        throw new Error();
      }

      user.username = username;
      user.description = description;

      await user.save();

      res.send(responseFormat(user.toJSON()));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @del("/users")
  @use(authenticateToken)
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findOne({ _id: req.user._id });

      if (!user) {
        throw new Error();
      }

      user.remove();

      res.send(responseFormat(user.toJSON()));
    } catch (e) {
      // Internal server error
      res.status(500).send(e);
    }
  }

  @post("/auth/login")
  @bodyValidator("transactionTime", "content")
  async login(req: Request, res: Response): Promise<void> {
    const {
      content: { email, password }
    } = req.body;

    try {
      const user: UserDocument = await User.findByCredentials(email, password);

      const token = await user.generateAuthToken();

      res.send(responseFormat({ user: user.toJSON(), token }));
    } catch (e) {
      // Unauthorized
      res.status(401).send({ errorMessage: e.message });
    }
  }

  @post("/auth/logout")
  @bodyValidator("transactionTime")
  @use(authenticateToken)
  async logout(req: Request, res: Response): Promise<void> {
    try {
      // Fetch users tokens list
      const { tokens } = req.user;
      if (!tokens) {
        throw new Error();
      }

      // Remove token
      req.user.tokens = tokens.filter((token: Token) => {
        return token.token != req.token;
      });

      await req.user.save();

      res.send(responseFormat(req.user.toJSON()));
    } catch (e) {
      // Internal server error
      res.status(500).send(e);
    }
  }
}

export { AuthController };
