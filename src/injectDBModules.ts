/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './infrastructure/modules/users.module';
import { AuthModule } from './infrastructure/modules/AuthModule';
import { ListingsModule } from './infrastructure/modules/listings.module';
import { SeederModule } from './infrastructure/modules/seeder.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ListingsModule,
        SeederModule
    ],
})
export class injectDBModules { }
