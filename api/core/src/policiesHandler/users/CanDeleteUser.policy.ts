import { Action } from '../../enums/actions.enums';
import { AppAbility } from '../../casl/abilities/AppAbility';
import type { IPolicyHandler } from 'types/policies';

export default class CanDeleteUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, 'User');
  }
}
