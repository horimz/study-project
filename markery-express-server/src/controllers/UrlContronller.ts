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
import { Url } from "../models/Url";
import { responseFormat } from "./response/responseFormat";

@controller("/api")
class UrlController {
  // Send all urls under a folder
  @get("/urls/:id")
  @use(authenticateToken)
  async getUrls(req: Request, res: Response): Promise<void> {
    const { id: parentFolderId } = req.params;

    try {
      // Find all urls under "parent folder"
      const urls = await Url.findAllUrls(parentFolderId);

      // Send response
      res.send(responseFormat({ urls }));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // Create new url
  @post("/url")
  @bodyValidator("transactionTime", "content")
  @use(authenticateToken)
  async postUrl(req: Request, res: Response): Promise<void> {
    const {
      transactionTime,
      content: { url, alias, description, parentFolderId }
    } = req.body;

    try {
      // Create new url
      const newUrl = new Url({
        url,
        alias,
        description,
        owner: parentFolderId
      });
      await newUrl.save();

      // Send response
      res.send(
        responseFormat({
          _id: newUrl._id,
          url: newUrl.url,
          alias: newUrl.alias,
          description: newUrl.description
        })
      );
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // Update url
  @patch("/url")
  @bodyValidator("transactionTime", "content")
  @use(authenticateToken)
  async patchUrl(req: Request, res: Response): Promise<any> {
    const {
      transactionTime,
      content: {
        _id,
        url: updatedUrl,
        alias: updatedAlias,
        description: updatedDescription
      }
    } = req.body;

    try {
      // Find url to update
      const url = await Url.findOne({
        _id
      });
      if (!url) return res.status(404).send();

      // Update fields
      url.url = updatedUrl;
      url.alias = updatedAlias;
      url.description = updatedDescription;

      // Save updated url
      await url.save();

      res.send();
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  // Delete url
  @del("/url/:id")
  @use(authenticateToken)
  async deleteUrl(req: Request, res: Response): Promise<any> {
    const { id: urlId } = req.params;

    try {
      // Find url to delete
      const url = await Url.findOne({ _id: urlId });
      if (!url) return res.status(404).send({ error: "Failed to find url." });

      // Remove url from database
      await url.remove();

      res.send();
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export { UrlController };
