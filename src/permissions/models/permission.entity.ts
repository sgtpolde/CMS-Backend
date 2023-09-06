// src/roles/models/permission.entity.ts

import { Role } from 'src/roles/models/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({ name: 'role_permissions' })
  roles: Role[];
}
