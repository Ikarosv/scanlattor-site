import { ApiProperty } from '@nestjs/swagger';

export default class AccessToken {
  @ApiProperty({ type: String })
  access_token: string;
}
