import { Prisma, Role } from "@prisma/client";
import Admin from "./Admin";
import Mod from "./Mod";
import { Action } from "../../enums/actions.enums";
import { AppAbility } from "../abilities/AppAbility";
import { AbilityBuilder } from '@casl/ability'
import UserPermission from "./User";

export type AddRuleCan = AbilityBuilder<AppAbility>['can']
export type AddRuleCannot = AbilityBuilder<AppAbility>['cannot']

const permisions = {
  admin: Admin,
  mod: Mod,
  user: UserPermission
}

export default permisions;