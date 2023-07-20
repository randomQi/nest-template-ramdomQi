import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Menu } from "../../menu/entities/menu.entity";
@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id:number

  @Column()
  name:string

  @ManyToMany(() => User, (user) => user.role )
  user: User[]

  // @ManyToMany(() => Menu, (menu) => menu.role)
  // menu: Menu[]
}
