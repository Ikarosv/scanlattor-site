import { AbilityBuilder } from '@casl/ability'
import Admin from "./Admin";
import Mod from "./Mod";
import UserPermission from "./User";
import { AppAbility } from "../abilities/AppAbility";

export type AddRuleCan = AbilityBuilder<AppAbility>['can']
export type AddRuleCannot = AbilityBuilder<AppAbility>['cannot']

const permisions = {
  admin: Admin,
  mod: Mod,
  user: UserPermission
}

export default permisions;