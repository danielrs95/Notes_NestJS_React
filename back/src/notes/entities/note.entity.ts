import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  archived: boolean;

  @ManyToMany(() => Tag, (tag) => tag.notes)
  @JoinTable({
    name: 'notes_tags',
    joinColumn: {
      name: 'note_id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
    },
  })
  tags: Tag[];
}
