import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { OmitUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { TUser } from './types/user.type';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async profile(id: string): Promise<TUser> | never {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User does not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<OmitUser> {
    const saltOrRounds = 10;
    const password = updateUserDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: updateUserDto.username,
        email: updateUserDto.email,
        password: hashedPassword,
      },
    });

    delete user.password;

    return user;
  }
}
