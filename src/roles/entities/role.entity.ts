import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Menu } from '../../menu/entities/menu.entity';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
    comment: '角色名称',
    name: 'name',
  })
  name: string;

  @ManyToMany(() => User, (user) => user.role)
  user: User[];

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
    select: false,
    comment: '角色描述',
    name: 'description',
  })
  description: string;

  @JoinTable({ name: 'role_menu' })
  @ManyToMany(() => Menu, (menu) => menu.roles)
  menus: Menu[];
}
