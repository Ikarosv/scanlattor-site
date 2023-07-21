import { AppAbility } from '../src/casl/abilities/AppAbility';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean | void;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;