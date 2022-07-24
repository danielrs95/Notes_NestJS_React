import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => Tag, (tag) => tag.note)
  tags: Tag[];
}
