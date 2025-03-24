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

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { httpsOptions: { rejectUnauthorized: false } }
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3030;

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.register(fastifyHelmet as any, { contentSecurityPolicy: false });

  await app.register(fastifyMultipart as any, {
    attachFieldsToBody: true,
    limits: {
      fileSize: 100 * 1024 * 1024,
      files: 5,
    },
  });

  await app.register(fastifyCompress as any, { encodings: ['gzip', 'deflate'] });

  await app.register(fastifyRateLimit as any, {
    max: 100,
    timeWindow: '1 minute',
  });

  await app.register(fastifyCors as any, {
    origin: ['http://localhost:3000', 'https://frontend.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-apollo-operation-name', 'apollo-require-preflight'],
    credentials: true,
  });

  const fastifyInstance = app.getHttpAdapter().getInstance();
  fastifyInstance.addHook('preHandler', async (req, reply) => {
    if (req.isMultipart()) {
      req.body = await req.file();
    }
  });


  await app.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
    console.log(`🚀 Server ready at ${address}`);
  });
}

bootstrap();
