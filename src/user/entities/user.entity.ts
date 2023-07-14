import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Log } from "../../logs/entities/log.entity";
import { Role } from "../../roles/entities/role.entity";
import { Profile } from "../../profile/entities/profile.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile

  @OneToMany(() => Log, (logs) => logs.user)
  @JoinColumn()
  logs: Log[]

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable({ name: 'user_role'})
  role: Role[]
}
