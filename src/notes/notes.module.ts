import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { TagsService } from './services/tags.service';
import { Tag } from './entities/tag.entity';
import { TagsController } from './controllers/tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag])],
  providers: [NotesService, TagsService],
  controllers: [NotesController, TagsController],
})
export class NotesModule {}
