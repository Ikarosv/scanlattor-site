import { ApiProperty } from '@nestjs/swagger';

export default class Errors {
  @ApiProperty({
    type: 'string',
  })
  message: string;
}
