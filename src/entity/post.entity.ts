import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  content: string

  @Exclude()
  @Column()
  title: string

  @Exclude()
  @Column()
  image: string

  constructor(partial: Partial<Post>) {
    super()
    Object.assign(this, partial)
  }
}
