import { Account } from "./Account.js";

export class Group {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.coverImg = data.coverImg;
    this.creator = data.creator
    this.creatorId=data.creatorId
    this.groupMemberIds=data.groupMemberIds
  }
}
