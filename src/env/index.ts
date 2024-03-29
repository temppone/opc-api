/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  PORT: z.coerce.number().default(3333),
});

export const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log('! Invalid enviroment variables', _env.error.format());

  throw new Error('Invalid enviroment variables');
}

export const env = _env.data;
