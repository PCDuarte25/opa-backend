import { Inject, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { ValidationException } from '../utils/exceptions';
import { CodigoMesaJaExistente } from '../messages/exceptions.messages';

@Injectable()
export class TableService {

  constructor(
    @Inject("TABLE_REPOSITORY")
    private tableRepository: Repository<Table>,
  ) { }

  async create(createTableDto: CreateTableDto) {

    const table = await this.tableRepository.findOneBy({ code: createTableDto.code })
    if (table) {
      throw new ValidationException(CodigoMesaJaExistente)
    }

    const tableEntity = await this.tableRepository.create({ code: createTableDto.code })

    return await this.tableRepository.save(tableEntity)
  }

  findAll() {
    return `This action returns all table`;
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
