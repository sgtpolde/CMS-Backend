import { User } from 'src/users/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false }) // Indicates if the task is approved by admin
  approved: boolean;

  @Column({ default: false }) // Indicates if the task is rejected by admin
  rejected: boolean;

  @ManyToOne(() => User, { eager: true }) // Company that created the task
  createdBy: User;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  assignedTo: User[];

}
