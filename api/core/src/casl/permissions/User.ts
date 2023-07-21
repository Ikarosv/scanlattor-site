import type { User } from "@prisma/client";
import type { AddRuleCan, AddRuleCannot } from ".";
import { Action } from "../../enums/actions.enums";

export default class UserPermission {
  static permissions(can: AddRuleCan, cannot: AddRuleCannot, user: User): void {
    if (user) {
      can([Action.Delete, Action.Update], 'User', { id: user.id })
    } else {
      cannot([Action.Delete, Action.Update], 'User')
    }
    cannot(Action.Update, 'User', ['id', 'createdAt', 'role'])
    can(Action.Read, ['Manga', 'Chapter'])
    cannot([Action.Create, Action.Delete, Action.Update], ['Manga', 'Chapter'])
  }
}