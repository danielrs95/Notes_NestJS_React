import { Note } from 'src/notes/entities/note.entity';

export class CreateTagDto {
  text: string;
  note: Note[];
}
