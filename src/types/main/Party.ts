import { randomUUID, UUID } from "crypto";

import parties from "@parties";

export default class Party {
  public static exists(id: UUID): boolean {
    return parties[id] !== undefined;
  }
  public static get(id: UUID): Party {
    return parties[id];
  }

  private readonly _id: UUID;
  public get id(): UUID {
    return this._id;
  }

  public constructor() {
    do {
      this._id = randomUUID();
    } while (Party.exists(this._id));

    parties[this._id] = this;
  }

  public destroy() {
    delete parties[this._id];
  }
}