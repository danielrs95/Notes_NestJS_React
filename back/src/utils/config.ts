import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

export const devConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'notesdb',
  entities: ['build/**/*.entity{.ts,.js}'],
  // In production, should be using migrations!
  synchronize: true,
  retryDelay: 3000,
  retryAttempts: 10,
  logging: true,
};

export const prodConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  url: process.env.URL_POSTGRESQL,
  database: 'vnoxmoxg',
  schema: 'notesApp',
  synchronize: true,
  retryDelay: 3000,
  retryAttempts: 10,
  logging: true,
  entities: ['build/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
};
