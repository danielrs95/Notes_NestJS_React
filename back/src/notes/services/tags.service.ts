import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.tagRepository.find({ relations: ['note'] });
  }

  async insert(body: any) {
    // * First we get the note, to make the relation to the tag
    const note = await this.noteRepository.findOneBy({ id: body.noteId });
    if (!note) throw new NotFoundException('Note does not exist');

    // * Make new Tag and assign the previous note finded
    const newTag = new Tag();
    newTag.note = note;
    newTag.text = body.text;
    return this.tagRepository.save(newTag);
  }

  async delete(id: number) {
    await this.tagRepository.delete(id);
    return id;
  }
}
