import { PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects } from '@casl/prisma';
import { User, Manga, Chapter } from '@prisma/client';
import { Action } from '../../enums/actions.enums';

export type subjects = Subjects<{
          User: User;
          Manga: Manga;
          Chapter: Chapter;
        }>
      | 'all'

export type AppAbility = PureAbility<
  [
    Action, subjects,
  ],
  PrismaQuery
>;
