import { Action } from "../enums/actions.enums";
import { AppAbility } from "../casl/abilities/AppAbility";
import type { IPolicyHandler } from "types/policies";
import { NotImplementedException } from "@nestjs/common";

export default class UpdateAndDeleteUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    throw new NotImplementedException('UpdateAndDeleteUserPolicyHandler ainda não implementado')
    // return ability.can(Action.Delete, 'Manga');
  }
}