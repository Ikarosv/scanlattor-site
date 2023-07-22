import { Action } from '../../enums/actions.enums';
import type { AddRuleCan } from '.';

export default class Admin {
  static permissions(can: AddRuleCan) {
    can(Action.Manage, 'all');
  }
}
