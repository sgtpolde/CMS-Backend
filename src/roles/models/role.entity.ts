// src/roles/models/role.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/models/user.entity';
import { Permission } from 'src/permissions/models/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable({ name: 'role_permissions' })
  permissions: Permission[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({ name: 'user_roles' })
  users: User[];
}
