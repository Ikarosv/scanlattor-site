import { Injectable } from '@nestjs/common';
import {
  // Ability,
  // PureAbility,
  AbilityBuilder,
  // AbilityClass,
  // MongoAbility,
  // InferSubjects,
} from '@casl/ability';
import { Action } from 'src/enums/role.enums';
import { User, Manga } from '@prisma/client';
import { createPrismaAbility, Subjects } from '@casl/prisma';
import { AppAbility } from '../abilities/AppAbility';

// type Subjects = InferSubjects<Manga | User> | 'all';
// export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

    switch (user.role) {
      case 'admin':
        can(Action.Manage, 'all');
        break;
      case 'mod':
        can([Action.Create, Action.Update], ['Manga', 'Chapter']);
        cannot([Action.Delete, Action.Update], 'User');
        break;
      default:
        can(Action.Read, 'all');
    }

    // if (user.role === 'admin') {
    //   can(Action.Manage, 'all'); // read-write access to everything
    // } else if (user.role === 'mod') {
    //   can([Action.Create, Action.Update], ['Manga', 'Chapter']);
    //   cannot([Action.Delete, Action.Update], 'User');
    // } else {
    //   can(Action.Read, 'all'); // read-only access to everything
    // }

    can([Action.Update, Action.Delete], 'User', { id: user.id });
    // cannot(
    //   [Action.Delete, Action.Update, Action.Create],
    //   ['Manga', 'Chapter', 'User'],
    // );

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
