// RouteName.ts
import { RouterModule, RouteTree } from '@nestjs/core';
import { UsersModule } from '../../infrastructure/modules/users.module';
import { AuthModule } from 'src/infrastructure/modules/AuthModule';

export const routes: RouteTree[] = [
    { path: '/users', module: UsersModule },
    { path: '/auth', module: AuthModule },
];
