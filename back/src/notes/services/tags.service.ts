import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/notes/entities/note.entity';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}

  getAll() {
    return this.tagRepository.find();
  }

  getAllNotesById(id: number) {
    return this.noteRepository.find({
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
