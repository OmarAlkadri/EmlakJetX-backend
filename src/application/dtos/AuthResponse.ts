import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../domain/entities';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}
