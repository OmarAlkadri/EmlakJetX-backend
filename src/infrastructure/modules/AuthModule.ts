import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../../presentation/controllers/AuthController';
import { AuthGuard } from '../guards/AuthGuard';
import { APP_GUARD } from '@nestjs/core';
import { SignInUseCase } from '../../application/use-cases/auth/SignInUseCase';
import { jwtConstants } from '@config/constants';
import { JwtServiceWrapper } from '../services/JwtServiceWrapper';
import { UsersModule } from './users.module';
import { AuthResolver } from 'src/presentation/graphql/resolvers/auth.resolver';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtServiceWrapper,
    SignInUseCase,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthResolver,
  ],
  exports: [JwtServiceWrapper, SignInUseCase],
})
export class AuthModule {}
