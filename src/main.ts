import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './all-exceptions.filter';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyCompress from '@fastify/compress';
import fastifyCors from '@fastify/cors';
import { SeederService } from './infrastructure/services/SeederService ';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { httpsOptions: { rejectUnauthorized: false } }
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3030;

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.register(fastifyHelmet, { contentSecurityPolicy: false });

  await app.register(fastifyMultipart , {
    attachFieldsToBody: true,
    limits: {
      fileSize: 100 * 1024 * 1024,
      files: 10,
    },
  });

  await app.register(fastifyCompress, { encodings: ['gzip', 'deflate'] });

  await app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  await app.register(fastifyCors, {
    origin: ['http://localhost:3000', 'https://emlakjetx-backend-1.onrender.com/','https://emlak-jet-x-frontend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-apollo-operation-name', 'apollo-require-preflight'],
    credentials: true,
  });


  const seeder = app.get(SeederService);
  await seeder.seedDatabase();
  await app.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
    console.log(`🚀 Server ready at ${address}`);
  });
}

bootstrap();
