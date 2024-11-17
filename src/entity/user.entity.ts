import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(["email"])
  @Column()
  email: string;

  @Column()
  userName: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  photoURL: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({
    nullable: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
