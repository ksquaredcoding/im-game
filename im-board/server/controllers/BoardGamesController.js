import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class BoardGamesController extends BaseController {
  constructor() {
    super("/api/boardgames");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getBoardGamesByAccountId);
  }
  // TODO
  async getBoardGamesByAccountId(req, res, next) {
    try {
      const example = await res.send();
    } catch (error) {
      next(error);
    }
  }
}
