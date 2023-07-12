import { Injectable } from "@nestjs/common";
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

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: {id}});
  }

  update(id: number, updateUserDto: Partial<User>) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
