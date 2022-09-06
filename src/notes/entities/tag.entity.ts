import { Note } from 'src/notes/entities/note.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToMany(() => Note, (note) => note.tags)
  notes: Note[];
}
