import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'notesdb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      // In production, should be using migrations!
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
