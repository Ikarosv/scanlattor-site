import { Action } from "../../enums/actions.enums";
import type { AddRuleCan, AddRuleCannot } from ".";

export default class Admin {
  static permissions(can: AddRuleCan, cannot: AddRuleCannot) {
    can(Action.Manage, 'all')
  }
}