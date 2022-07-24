import { Tag } from '../entities/tag.entity';

export class CreateNoteDto {
  title: string;
  content: string;
  archived: boolean;
  tags: Tag[];
}
