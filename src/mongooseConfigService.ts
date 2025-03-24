/* eslint-disable prettier/prettier */
import { Injectable, DynamicModule } from "@nestjs/common";
import { MongooseModule, MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { ConfigService } from '@nestjs/config';


interface EnvironmentVariables {
    MONGODB_HOST: string,
    MONGODB_PORT: number,
    MONGODB_DB_Name: string
}
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {

    private readonly config: ConfigService<EnvironmentVariables>;
    private readonly connection!: DynamicModule;

    constructor(private configService: ConfigService<EnvironmentVariables>) {
        this.config = this.configService;


        /* this.connection = MongooseModule.forRoot(configService.get('DB_URL'), {
             user: configService.get('DB_USER'),
             pass: configService.get('DB_PASS'),
             auth: { authdb: configService.get('DB_AUTH') },
           });*/
    }


    createMongooseOptions(): MongooseModuleOptions {
        const url = `mongodb://${this.config.get<string>('MONGODB_HOST')}:${this.config.get<string>('MONGODB_PORT')}/${this.config.get<string>('MONGODB_DB_Name')}`;
        return {
            uri: url,
        };
    }

    getConnection(): DynamicModule {
        return this.connection;
    }
}