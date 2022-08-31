import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { devConfig, prodConfig } from './utils/config';
import { config } from 'dotenv';

config();
const typeormConfig =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

console.log(process.env.NODE_ENV);

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), NotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
