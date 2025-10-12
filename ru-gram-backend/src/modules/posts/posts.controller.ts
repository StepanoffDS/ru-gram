import { Auth } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';
import {
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';

@Auth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':postId/images')
  @UseInterceptors(FileInterceptor('file'))
  addImageToPost(
    @Param('postId') postId: string,
    @Authorized('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File is required');
    }

    return this.postsService.addImageToPost(postId, userId, file);
  }

  @Put(':postId/images')
  @UseInterceptors(FilesInterceptor('files', 10))
  updatePostImages(
    @Param('postId') postId: string,
    @Authorized('id') userId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new Error('Files are required');
    }

    return this.postsService.updatePostImages(postId, userId, files);
  }

  @Delete(':postId/images')
  removeImageFromPost(
    @Param('postId') postId: string,
    @Authorized('id') userId: string,
    @Query('imageUrl') imageUrl: string,
  ) {
    if (!imageUrl) {
      throw new Error('imageUrl query parameter is required');
    }

    return this.postsService.removeImageFromPost(postId, userId, imageUrl);
  }
}
