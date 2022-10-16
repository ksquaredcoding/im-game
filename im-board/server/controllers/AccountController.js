import { Auth0Provider } from "@bcwdev/auth0provider";
import { accountService } from "../services/AccountService";
import { boardGamesService } from "../services/BoardGamesService.js";
import { groupsService } from "../services/GroupsService.js";
import { profileService } from "../services/ProfileService.js";
import BaseController from "../utils/BaseController";

export class AccountController extends BaseController {
  constructor() {
    super("/account");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserAccount)
      .get("/:accountId", this.getUserProfile)
      .get("/boardgames", this.getAccountLists)
      .get("/groups", this.getAccountGroups)
      .get("/boardgames/:id", this.getAccountBoardGames)
      .get("/groups/:id", this.getMyGroups)
      .put("", this.editMyAccount);
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo);
      res.send(account);
    } catch (error) {
      next(error);
      //
    }
  }
  async getUserProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.accountId);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async getAccountLists(req, res, next) {
    try {
      const lists = await boardGamesService.getBoardGamesByAccountId(
        req.userInfo.id
      );
      res.send(lists);
    } catch (error) {
      next(error);
    }
  }
  async getAccountGroups(req, res, next) {
    try {
      const groups = await groupsService.getMyGroups(req.userInfo.id);
      res.send(groups);
    } catch (error) {
      next(error);
    }
  }

  // TODO account boardGame
  async getAccountBoardGames(req, res, next) {
    try {
      const boardGames = await boardGamesService.getBoardGamesByAccountId(
        req.params.id
      );
      res.send(boardGames);
    } catch (error) {
      next(error);
    }
  }
  async getMyGroups(req, res, next) {
    try {
      const groups = await groupsService.getMyGroups(req.params.id);
      res.send(groups);
    } catch (error) {
      next(error);
    }
  }
  async editMyAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(
        req.userInfo,
        req.body
      );
      res.send(account);
    } catch (error) {
      next(error);
    }
  }
}
