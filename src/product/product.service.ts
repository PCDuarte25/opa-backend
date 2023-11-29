import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Stock } from '../stock/entities/stock.entity';
import { ProductItem } from '../database_config/product_item/productItems.entity';
import { ValidationException } from '../utils/exceptions';
import { ProdutoExistente } from '../messages/exceptions.messages';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('PRODUCT_ITEM_REPOSITORY')
    private productItemRepository: Repository<ProductItem>,
    @Inject('STOCK_REPOSITORY')
    private stockRepository: Repository<Stock>) { }
  async create(createProductDto: CreateProductDto) {

    const product = await this.findProductByCode(createProductDto.productCode)
    if (product) {
      throw new ValidationException(ProdutoExistente)
    }

    const productCreated = await this.productRepository.create({
      code: createProductDto.productCode,
      name: createProductDto.name,
      price: createProductDto.price,
    })

    const productEntity = await this.productRepository.save(productCreated)
    const productItemEntities = await Promise.all(createProductDto.items.map(async (productItem) => {

      const stock = await this.stockRepository.findOneBy({ id: productItem.stockId })

      const productItemEntity = this.productItemRepository.create({
        isPortion: productItem.isPortion,
        measurementUnit: productItem.measurementUnit,
        product: productEntity,
        quantity: productItem.quantity,
        stock: stock,
      })

      productItemEntities.push(productItemEntity)
      return productItemEntities
    }))

    await this.productItemRepository.save(productItemEntities)

    return 'Produto cadastrado com sucesso.';
  }

  async findProductByCode(productCode: string): Promise<Product> {
    return await this.productRepository.findOneBy({ code: productCode })
  }

  findAll() {
    return `This action returns all product`;
  }
}