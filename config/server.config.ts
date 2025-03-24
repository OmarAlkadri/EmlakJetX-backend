/* eslint-disable prettier/prettier */

import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    host: process.env.HOST,
    port: process.env.PORT || 5432
  }));