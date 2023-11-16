import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

export class Menu {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  path: string;
  @Column()
  order: number;
  @Column()
  acl: string;

  // @ManyToMany(() => Role, (role) =>role.menu)
  // @JoinTable({name: 'role_menus'})
  // role: Role[]
}
