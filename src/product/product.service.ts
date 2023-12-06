import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductItem } from '../database_config/productItems/entity/productItems.entity';
import { StockService } from '../stock/stock.service';
import { ProdutoIngredientesInvalidos, ProdutoNomeInvalido, ProdutoNomeJaExistente, ProdutoPrecoInvalido } from '../messages/exceptions.messages';
import { ValidationException } from '../utils/exceptions';

@Injectable()
export class ProductService {

  constructor(
    @Inject("PRODUCT_REPOSITORY")
    private productRepository: Repository<Product>,
    @Inject("PRODUCT_ITEM_REPOSITORY")
    private productItemsRepository: Repository<ProductItem>,
    private stockService: StockService,
  ) {
  }

  async create(createProductsDto: CreateProductDto[]) {
    for (const createProductDto of createProductsDto) {
      console.log(createProductDto)
      if (!createProductDto.productName) {
        throw new ValidationException(ProdutoNomeInvalido)
      }
      if (createProductDto.productPrice <= 0) {
        throw new ValidationException(ProdutoPrecoInvalido)
      }

      if (createProductDto.productItems.length == 0) {
        throw new ValidationException(ProdutoIngredientesInvalidos)
      }

      const product = await this.productRepository.findOneBy({ name: createProductDto.productName })
      if (product) {
        throw new ValidationException(ProdutoNomeJaExistente)
      }

      const productItemEntities: ProductItem[] = []
      const productEntity = this.productRepository.create({ name: createProductDto.productName, price: createProductDto.productPrice, type: createProductDto.type })
      const productCreated = await this.productRepository.save(productEntity)
      for await (const productItem of createProductDto.productItems) {
        const stockProduct = await this.stockService.findOne(productItem.stockProductId)
        const productItemEntity = this.productItemsRepository.create({ product: productCreated, quantity: productItem.quantity, stock: stockProduct, isPortion: productItem.isPortion, measurementUnit: productItem.measurementUnit })
        productItemEntities.push(productItemEntity)
      }
      await this.productItemsRepository.save(productItemEntities)
    }
    return null;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    let productsOutput = [];
    for (const product of products) {
      productsOutput.push({
        id: product.id,
        name: product.name,
        description: 'Barreto vai implementar', // product.description,
        price: product.price,
      });
    }

    return productsOutput;
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

}
