import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { devConfig, prodConfig } from './utils/config';
import { config } from 'dotenv';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

config();
const typeormConfig =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

console.log(process.env.NODE_ENV);

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front', 'build'),
    }),
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
