import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { Note } from '../entities/note.entity';

@Injectable()
export class NotesService {
  // * Inject dependencies
  // Now we can use the methods from Repository
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>,
  ) {}

  getAll() {
    return this.notesRepository.findBy({ archived: false });
  }

  getNoteById(id: number) {
    return this.notesRepository.findOneBy({ id });
  }

  insert(body: CreateNoteDto) {
    const note = this.notesRepository.create(body);
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
