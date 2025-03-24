/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
//import { ConfigService } from '../config/config.service';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  PORT: number;
  URL: string;
  MONGODB_PORT: number;
  MONGODB_HOST: string;
}

@Injectable()
export class AppService {
  private helloMessage: string;


  constructor(private configService: ConfigService<EnvironmentVariables>) {
    this.helloMessage = 'Hello there, world'//configService.get('HELLO_MESSAGE');

    const port = this.configService.get('PORT', { infer: true });
    const DATABASE_PORT = this.configService.get('MONGODB_PORT', { infer: true });


    // TypeScript Error: this is invalid as the URL property is not defined in EnvironmentVariables
    const url = this.configService.get('URL', { infer: true });
    const DATABASE_HOST = this.configService.get('MONGODB_HOST', { infer: true });

    console.log(`${port}-${DATABASE_PORT}-${url}-${DATABASE_HOST}`)
  }

  getHello(): string {
    return this.helloMessage;
  }
}
