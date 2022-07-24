import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { Note } from '../entities/note.entity';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class NotesService {
  // * Inject dependencies
  // Now we can use the methods from Repository
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
  ) {}

  getAll() {
    return this.notesRepository.find({
      where: { archived: false },
      relations: { tags: true },
    });
  }

  getAllArchived() {
    return this.notesRepository.find({
      where: { archived: true },
      relations: { tags: true },
    });
  }

  getNoteById(id: number) {
    return this.notesRepository.findOneBy({ id });
  }

  async insert(body: CreateNoteDto) {
    const note = new Note();
    note.title = body.title;
    note.content = body.content;
    note.archived = body.archived;

    note.tags = [];

    if (body.tagsIds) {
      // Get ids from body and find tags with those ids
      const tagsIds = body.tagsIds;
      const tags = await this.tagRepository.findByIds(tagsIds);
      // Save tags on note instance
      note.tags = tags;
    }
    return this.notesRepository.save(note);
  }

  async update(id: number, body: CreateNoteDto) {
    const note = await this.notesRepository.findOneBy({ id });
    this.notesRepository.merge(note, body);
    return this.notesRepository.save(note);
  }

  async delete(id: number) {
    await this.notesRepository.delete(id);
    return id;
  }
}
