import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { NotesService } from '../services/notes.service';

@Controller('api/notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getAll() {
    return this.notesService.getAll();
  }

  @Get('/archived')
  getAllArchived() {
    return this.notesService.getAllArchived();
  }

  @Get(':id')
  getNoteById(@Param('id') id: number) {
    return this.notesService.getNoteById(id);
  }

  @Post()
  insert(@Body() body: CreateNoteDto) {
    return this.notesService.insert(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: CreateNoteDto) {
    return this.notesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.notesService.delete(id);
  }
}
