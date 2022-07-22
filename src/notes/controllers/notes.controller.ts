import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('api/notes')
export class NotesController {
  @Get()
  findAll() {
    return [
      {
        id: 1,
        title: 'Important Info',
        content: 'Some importan information',
        archived: false,
      },
      {
        id: 2,
        title: 'Grosery List',
        content: 'Carrots, cheese',
        archived: true,
      },
    ];
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return id;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return true;
  }
}
