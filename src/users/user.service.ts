import { User } from "../entity/user.entity";
import { UserRepository } from "./user.repository";
import { Injectable } from "@nestjs/common";
import { BaseService } from "../base.service";
import { LoggerService } from "../logger/custom.logger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { LoginUserDto } from "../../src/auth/dto/login.user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(userData: LoginUserDto): Promise<string> {
    const id = uuidv4();
    await this.userRepository.insert(userData);
    return id;
  }
}
