import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { TagsService } from '../services/tags.service';

@Controller('api/tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getAll() {
    return this.tagsService.getAll();
  }

  @Post()
  insert(@Body() body: any) {
    return this.tagsService.insert(body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tagsService.delete(id);
  }
}