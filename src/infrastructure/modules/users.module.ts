import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserHook } from '../hooks/create-user.hook';
import { UserRepository } from '../repositories';
import { UserController } from '../../presentation/controllers';
import { User, UserSchema } from '../../domain/entities/User';
import { UsersResolver } from '../../presentation/graphql/resolvers/users.resolver';
import { UsersService } from '../services/UsersService';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: User.name, schema: usersSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UsersResolver, UsersService, CreateUserHook],
  exports: [UserRepository, UsersService, CreateUserHook],
})
export class UsersModule {}
