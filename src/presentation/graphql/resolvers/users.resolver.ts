/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { Listing, User } from '../../../domain/entities';
import { Types } from 'mongoose';
import { GraphQLObjectID } from 'graphql-scalars';
import { Public } from 'src/presentation/decorators/public.decorator';
import { UsersService } from '../../../infrastructure/services/UsersService';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  
  @Mutation(() => User)
  async addFavorite(
    @Args('listingId', { type: () => GraphQLObjectID })
    listingId: Types.ObjectId,
    @Context() ctx,
  ) {
    return this.usersService.addFavorite(ctx.req.user.userId, new Types.ObjectId(listingId));
  }

  @Mutation(() => User)
  async removeFavorite(
    @Args('listingId', { type: () => GraphQLObjectID })
    listingId: Types.ObjectId,
    @Context() ctx,
  ) {
    return this.usersService.removeFavorite(ctx.req.user.userId, new Types.ObjectId(listingId));
  }

  @Query(() => [Listing])
  async getFavorites(@Context() ctx) {
    return this.usersService.getFavorites(ctx.req.user.userId);
  }

@Query(() => Listing, { nullable: true })
async getFavorite(
  @Args('listingId', { type: () => GraphQLObjectID }) listingId: Types.ObjectId,
  @Context() ctx,
): Promise<Types.ObjectId> {
  return this.usersService.getFavorite(ctx.req.user.userId, new Types.ObjectId(listingId));
}

}
