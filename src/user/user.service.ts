import { Get, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private  readonly userRepository: Repository<User>) {
  }
  async create(createUserDto: Partial<User>): Promise<any> {
    return  await this.userRepository.insert(createUserDto)
  }

  findAll(username:string):Promise<User[]> {
    return this.userRepository.find({ where: {username}});
  }

  async findOne(parm: Partial<{ id: number, username: string }>):Promise<User> {
    return await this.userRepository.findOne({ where: parm });
  }

  update(id: number, updateUserDto: Partial<User>) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  getUserProfile(id: number) {
    return this.userRepository.findOne({where: {id}, relations: {profile: true}})
  }
}
