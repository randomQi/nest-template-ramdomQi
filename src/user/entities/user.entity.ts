import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Log } from "../../logs/entities/log.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Log, (logs) => logs.user)
  @JoinColumn()
  logs: Log[]

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable({ name: 'user_role'})
  role: Role[]
}
