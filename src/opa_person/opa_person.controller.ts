import { Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpStatus, HttpCode } from '@nestjs/common';
import { OpaPersonService } from './opa_person.service';
import { CreateOpaPersonDto } from './dtos/create-opa_person.dto';
import { UpdateOpaPersonDto } from './dtos/update-opa_person.dto';

@Controller('opa-person')
export class OpaPersonController {
  constructor(private readonly opaPersonService: OpaPersonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOpaPersonDto: CreateOpaPersonDto, @Response() res) {
    try{
      const person = await this.opaPersonService.create(createOpaPersonDto);
      return res.json({
        message: 'Usuário criado com sucesso!',
        data: person,
      })

    } catch (e) {
      return await res.status(400).json({
        message: e.message,
      });
    }
  }

  @Get()
  findAll(@Response() res) {
    return res.json({
      message: 'Hello World!'
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.opaPersonService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOpaPersonDto: UpdateOpaPersonDto) {
  //   return this.opaPersonService.update(+id, updateOpaPersonDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.opaPersonService.remove(+id);
  // }
}
