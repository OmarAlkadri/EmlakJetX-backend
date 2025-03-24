import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../../domain/entities';
import { Listing, ListingSchema } from '../../domain/entities/Listing';
import { UserSchema } from '../../domain/entities/User';
import { ListingRepository } from '../repositories/ListingRepository';
import { UserRepository } from '../repositories';
import { SeederService } from '../services/SeederService ';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Listing.name, schema: ListingSchema },
    ]),
  ],
  providers: [UserRepository, ListingRepository, SeederService],
  exports: [SeederService],
})
export class SeederModule {}
