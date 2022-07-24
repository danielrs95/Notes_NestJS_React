import { Note } from 'src/notes/entities/note.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Note, (note) => note.tags)
  @JoinColumn({ name: 'note_id' })
  note: Note;
}
