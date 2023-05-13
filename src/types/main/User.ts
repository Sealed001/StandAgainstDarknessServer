import { randomUUID, UUID } from 'crypto';

import users from "@users";

export default class User {
  public static exists(id: UUID): boolean {
    return users[id] !== undefined;
  }
  public static get(id: UUID): User {
    return users[id];
  }

  private readonly _id: UUID;
  public get id(): UUID {
    return this._id;
  }

  public constructor() {
    do {
      this._id = randomUUID();
    } while (User.exists(this._id));

    users[this._id] = this;
  }

  public destroy() {
    delete users[this._id];
  }
};