/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { ConfigModule } from '../config/config.module';
//import { ConfigService } from '../config/config.service';
import serverConfig from '@config/server.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '@config/database.config';
import { injectDBModules } from './injectDBModules';
import { Redis } from 'ioredis';
import { MongooseConfigService } from './mongooseConfigService';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [//ConfigModule.register({ folder: './config' }),
    ConfigModule.forRoot({
      envFilePath: './env/development.env',
      //ignoreEnvFile: true,

      load: [serverConfig, databaseConfig],
      cache: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      csrfPrevention: false,
      introspection: true
    }),    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    injectDBModules,
  ],
  providers: [AppService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        });
      },
      inject: [ConfigService],
    }
  ],
  exports: ['REDIS_CLIENT'],
  controllers: [AppController],
})
export class AppModule { }
