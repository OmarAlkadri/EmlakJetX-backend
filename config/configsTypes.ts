/* eslint-disable */

export interface SwaggerConfig {
  server_url: string;
}

export interface TypesenseConfig {
  host: string;
  port: number;
  apiKey: string;
}
export interface ServerConfig {
  status: string;
  app_port: number;
  jwt_secret: string;
  jest_token: string;
  swagger: SwaggerConfig;
}

export interface postgreSQLConfig {
  user: string;
  password: string;
  name: string;
  port: number;
  host: string;
}

export interface DatabaseConfig {
  postgreSQL: postgreSQLConfig;
}

export interface AWSConfig {
  access_key_id: string;
  secret_access_key: string;
  region: string;
}

export interface OpenAIConfig {
  model: string;
  api_key: string;
  default_assistant_id: string;
}
export interface BedrockConfig {
  access_key_id: string;
  secret_access_key: string;
  region: string;
  default_model: string;
}
export interface DeepLConfig {
  api_key: string;
}

export interface GeminiConfig {
  api_key: string;
}

export interface AIServicesConfig {
  default: 'aws' | 'openai' | 'deepl' | 'gemini';
  retry_count: number;
  aws: AWSConfig;
  openai: OpenAIConfig;
  deepl: DeepLConfig;
  gemini: GeminiConfig;
  bedrock: BedrockConfig;
}

export interface Config {
  server: ServerConfig;
  typesense: TypesenseConfig;
  database: DatabaseConfig;
  ai_services: AIServicesConfig;
  queue: QueueConfig;
}

export interface RabbitMQConfig {
  host: string;
  port: number;
  user: string;
  password: string;
}
export interface QueueConfig {
  rabbitmq: RabbitMQConfig;
}
