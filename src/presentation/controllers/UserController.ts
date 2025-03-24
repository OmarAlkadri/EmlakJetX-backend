// ControllerName.ts

import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { RegisterInputDto } from '../../application/dtos';
import { UsersService } from '../../infrastructure/services/UsersService';
import { Public } from '../decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: UsersService) {}

  @Public()
  @Get('AllUsers')
  async getAllUsers(@Res({ passthrough: true }) res: any): Promise<any> {
    try {
      const result = await this.createUserUseCase.findAll();
      res.status(HttpStatus.OK).send(result);
      return result;
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
    }
  }

  //@Get(':username?')
  @Post('signIn')
  async signIn(
    @Res({ passthrough: true }) res: any,
    @Body() data: { username: string; password: string },
  ): Promise<any> {
    try {
      const result = await this.createUserUseCase.signIn(
        data.username,
        data.password,
      );
      if (result) {
        res.status(HttpStatus.OK).send(result);
        return result;
      } else {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).send({ error: error });
    }
  }

  /*  @Get('find/')
      @Get(':id?')
      async findOne(@Res() res, @Param('id') id: string, @Query('name') name: string): Promise<any> {
        res.status(HttpStatus.OK).send([{}])
        return [{}]
      }*/

  /* @Get(':id?')
     @Get(':name?')
     async findAll(@Res() res, @Param('id') id: string, @Query('name') name: string): Promise<any> {
       res.status(HttpStatus.OK).send([{}])
       return [{}]
     }
   */
  @Public()
  @Post('add')
  // @Header('Cache-Control', 'none')
  // @HttpCode(204)
  //@Redirect('https://nestjs.com', 302)
  async create(
    @Res({ passthrough: true }) res: any,
    @Body() data: RegisterInputDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('version') version: any,
  ): Promise<any> {
    try {
      const result = await this.createUserUseCase.create(data);

      res.status(HttpStatus.CREATED).send(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
