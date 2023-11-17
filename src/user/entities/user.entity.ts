import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Log } from '../../logs/entities/log.entity';
import { Role } from '../../roles/entities/role.entity';
import { Profile } from '../../profile/entities/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: false,
    nullable: false,
    type: 'varchar',
    length: 50,
    name: 'username',
    comment: '用户名',
  })
  username: string;

  @Column({
    unique: false,
    nullable: false,
    type: 'varchar',
    name: 'password',
    comment: '密码',
  })
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Log, (logs) => logs.user)
  @JoinColumn()
  logs: Log[];

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable({ name: 'user_role' })
  role: Role[];
}
