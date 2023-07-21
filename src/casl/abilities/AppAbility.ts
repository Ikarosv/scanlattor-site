import { PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects } from '@casl/prisma';
import { User, Manga, Chapter } from '@prisma/client';
import { Action } from 'src/enums/role.enums';

export type AppAbility = PureAbility<
  [
    Action,
    (
      | Subjects<{
          User: User;
          Manga: Manga;
          Chapter: Chapter;
        }>
      | 'all'
    ),
  ],
  PrismaQuery
>;
