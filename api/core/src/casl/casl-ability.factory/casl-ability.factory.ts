import { Injectable } from '@nestjs/common';
import { AbilityBuilder, ExtractSubjectType } from '@casl/ability';
import { User, Manga, Chapter } from '@prisma/client';
import { createPrismaAbility } from '@casl/prisma';
import { AppAbility } from '../abilities/AppAbility';
import permisions from '../permissions';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

    permisions[user?.role || 'user'].permissions(can, cannot, user)

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Manga | Chapter | User>,
    });
  }
}
