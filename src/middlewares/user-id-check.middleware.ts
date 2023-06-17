import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const { id: idString } = req.params;

    const id = Number(idString);

    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Id inválido');
    }

    next();
  }
}
