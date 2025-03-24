import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Listing, ListingSchema } from '../../domain/entities/Listing';
import { ListingRepository } from '../repositories/ListingRepository';
import { ListingService } from 'src/infrastructure/services/ListingService';
import { ListingController } from 'src/presentation/controllers/ListingController';
import { CloudinaryConfig } from 'src/config/cloudinary.config';
import { ConfigModule } from '@nestjs/config';
import { ListingsResolver } from 'src/presentation/graphql/resolvers/listings.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeatureAsync([
      {
        name: Listing.name,
        useFactory: () => {
          const schema = ListingSchema;
          // schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [ListingController],
  providers: [
    ListingRepository,
    ListingsResolver,
    CloudinaryConfig,
    ListingService,
  ],
  exports: [ListingRepository, ListingService],
})
export class ListingsModule {}
