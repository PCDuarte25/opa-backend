import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpaPersonService } from './opa_person.service';
import { CreateOpaPersonDto } from './dto/create-opa_person.dto';
import { UpdateOpaPersonDto } from './dto/update-opa_person.dto';

@Controller('opa-person')
export class OpaPersonController {
  constructor(private readonly opaPersonService: OpaPersonService) {}

  @Post()
  create(@Body() createOpaPersonDto: CreateOpaPersonDto) {
    return this.opaPersonService.create(createOpaPersonDto);
  }

  @Get()
  findAll() {
    return this.opaPersonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opaPersonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpaPersonDto: UpdateOpaPersonDto) {
    return this.opaPersonService.update(+id, updateOpaPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opaPersonService.remove(+id);
  }
}
