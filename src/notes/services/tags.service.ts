import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/notes/entities/note.entity';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(Note) private notesRepository: Repository<Note>,
  ) {}

  getAll() {
    return this.tagRepository.find();
  }

  getAllNotesById(id: number) {
    if (id === undefined) {
      return this.notesRepository.find({
        where: { archived: false },
        relations: { tags: true },
      });
    }

    return this.notesRepository.find({
      relations: { tags: true },
      where: { tags: { id: id } },
    });
  }

  async insert(body: any) {
    const tag = this.tagRepository.create(body);
    return this.tagRepository.save(tag);
  }

  async delete(id: number) {
    await this.tagRepository.delete(id);
    return id;
  }
}
