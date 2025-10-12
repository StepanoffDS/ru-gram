import { PrismaService } from '@/core/prisma/prisma.service';
import { StorageService } from '@/modules/libs/storage/storage.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as Upload from 'graphql-upload/Upload.js';
import { User } from 'prisma/generated';
import * as sharp from 'sharp';
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input';

@Injectable()
export class ProfileService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  public async updateAvatar(user: User, file: Upload) {
    if (user.avatar) {
      await this.storageService.deleteFile(user.avatar);
    }

    const chunks: Buffer[] = [];

    for await (const chunk of file.createReadStream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const fileName = `/users/${user.id}.webp`;

    if (file.filename.endsWith('.gif')) {
      const processedBuffer = await sharp(buffer, { animated: true })
        .resize(512, 512)
        .webp()
        .toBuffer();

      await this.storageService.uploadFile(
        processedBuffer,
        fileName,
        'image/webp',
      );
    } else {
      const processedBuffer = await sharp(buffer)
        .resize(512, 512)
        .webp()
        .toBuffer();

      await this.storageService.uploadFile(
        processedBuffer,
        fileName,
        'image/webp',
      );
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { avatar: fileName },
    });

    return true;
  }

  public async removeAvatar(user: User) {
    if (!user.avatar) {
      return false;
    }

    await this.storageService.deleteFile(user.avatar);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { avatar: null },
    });

    return true;
  }

  public async changeInfo(
    user: User,
    changeProfileInfoInput: ChangeProfileInfoInput,
  ) {
    const { username, name, bio } = changeProfileInfoInput;

    const usernameExists = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (usernameExists && user.username !== username) {
      throw new BadRequestException('Данный никнейм уже занят');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { username, name, bio },
    });

    if (!updatedUser) {
      throw new InternalServerErrorException(
        'Не удалось изменить информацию о профиле',
      );
    }

    return true;
  }
}
