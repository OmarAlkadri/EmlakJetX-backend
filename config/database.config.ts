/* eslint-disable prettier/prettier */

import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT
}));