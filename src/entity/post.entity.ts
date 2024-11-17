import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "posts" })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: number;

  @Column()
  content: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({ default: "Uncategorized" })
  category: string;

  @Column()
  slug: string;

  constructor(partial: Partial<Post>) {
    super();
    Object.assign(this, partial);
  }
}
