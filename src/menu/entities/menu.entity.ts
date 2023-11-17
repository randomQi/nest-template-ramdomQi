import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
    comment: '菜单名称',
    name: 'name',
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
    comment: '菜单路径',
    name: 'path',
  })
  path: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
    comment: '菜单图标',
    name: 'icon',
  })
  icon: string;

  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
