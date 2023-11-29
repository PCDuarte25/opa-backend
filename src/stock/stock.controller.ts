import { Inject, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { ValidationException } from '../utils/exceptions';
import { ProdutoExistente } from '../messages/exceptions.messages';

@Injectable()
export class StockService {
  constructor(
    @Inject("STOCK_REPOSITORY")
    private stockRepository: Repository<Stock>,
  ) { }

  async create(createStockDto: CreateStockDto[]): Promise<Stock[] | null> {
    var stockEntities: CreateStockDto[]

    for (var stockDto of createStockDto) {
      const stockExists = await this.findOneByDescription(stockDto.productDescription)
      if (stockExists) {
        throw new ValidationException(ProdutoExistente)
      }

      const stock: Stock = {
        measurementUnit: stockDto.measurementUnit,
        productDescription: stockDto.productDescription,
        stockQuantity: stockDto.stockQuantity
      }

      const stockEntity = this.stockRepository.create(stock)
      stockEntities.push(stockEntity)
    }

    return await this.stockRepository.save(stockEntities);
  }

  async findOne(id: number): Promise<Stock | null> {
    return await this.stockRepository.findOneBy({ id });
  }

  async findOneByDescription(productDescription: string): Promise<Stock | null> {
    return await this.stockRepository.findOneBy({ productDescription });
  }

  async findAll(name: string): Promise<Stock[]> {
    return await this.stockRepository.createQueryBuilder('Stock')
      .where('LOWER(productDescription) LIKE LOWER(:productDescription)', { productDescription: `%${name}%` }) // Consulta "LIKE" insensível a maiúsculas/minúsculas
      .getMany();
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}