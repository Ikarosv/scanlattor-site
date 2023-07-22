import type { User } from '@prisma/client';
import type { AddRuleCan, AddRuleCannot } from '.';
import { Action } from '../../enums/actions.enums';

export default class Mod {
  static permissions(can: AddRuleCan, cannot: AddRuleCannot, user: User): void {
    can([Action.Create, Action.Update, Action.Read], ['Manga', 'Chapter']);
    can([Action.Delete, Action.Update], 'User', { id: user.id });
    cannot(Action.Update, 'User', ['id', 'createdAt', 'role']);
    cannot(Action.Delete, ['Manga', 'Chapter']);
  }
}
