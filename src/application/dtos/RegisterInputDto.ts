import { Field, InputType } from '@nestjs/graphql';
import { ERoles } from '../../shared/types/ERoles';
import { Matches } from 'class-validator';
@InputType()
export class RegisterInputDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  registrationNumber?: string;

  @Field({ nullable: true })
  @Matches(/^[0-9\-\+]{9,15}$/, { message: "Invalid phone number format" })
  phoneNumber?: string;
  
  @Field(() => [ERoles], { nullable: true, defaultValue: [ERoles.Employee] })
  ERoles?: ERoles[];

  @Field(() => ERoles, { defaultValue: ERoles.Employee })
  EUserType: ERoles;
}
