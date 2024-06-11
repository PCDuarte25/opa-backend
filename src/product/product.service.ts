import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductItem } from '../database_config/productItems/entity/productItems.entity';
import { StockService } from '../stock/stock.service';
import { IdRestauranteInexistente, ProdutoIngredientesInvalidos, ProdutoNomeInvalido, ProdutoNomeJaExistente, ProdutoPrecoInvalido } from '../messages/exceptions.messages';
import { ValidationException } from '../utils/exceptions';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class ProductService {

  constructor(
    @Inject("PRODUCT_REPOSITORY")
    private productRepository: Repository<Product>,
    @Inject("PRODUCT_ITEM_REPOSITORY")
    private productItemsRepository: Repository<ProductItem>,
    @Inject('RESTAURANT_REPOSITORY')
    private restaurantRepository: Repository<Restaurant>,
    private stockService: StockService,
  ) {
  }

  async create(restaurantId: number, createProductsDto: CreateProductDto[]) {
    for (const createProductDto of createProductsDto) {
      if (!createProductDto.productName) {
        throw new ValidationException(ProdutoNomeInvalido)
      }
      if (createProductDto.productPrice <= 0) {
        throw new ValidationException(ProdutoPrecoInvalido)
      }

      if (createProductDto.productItems.length == 0) {
        throw new ValidationException(ProdutoIngredientesInvalidos)
      }

      const product = await this.productRepository.findOneBy({ name: createProductDto.productName, restaurant: { id: restaurantId } })
      if (product) {
        throw new ValidationException(ProdutoNomeJaExistente);
      }

      if (!restaurantId) {
        throw new ValidationException(IdRestauranteInexistente);
      }

      const productItemEntities: ProductItem[] = [];
      const restaurant = await this.restaurantRepository.findOne({where: { id: restaurantId }})

      if (!restaurant) {
        throw new ValidationException('Restaurante nao encontrado');
      }

      const productEntity = this.productRepository.create({
        name: createProductDto.productName,
        price: createProductDto.productPrice,
        type: createProductDto.type,
        restaurant: restaurant,
        description: createProductDto.productDescription ,
      })
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

  async findAll(restaurantId: number): Promise<Product[]> {
    const products = await this.productRepository.find({ where: { restaurant: { id: restaurantId } }});
    let productsOutput = [];
    for (const product of products) {
      let productItems = [];
      for (const productItem of product.items) {
        productItems.push({
          ingredientId: productItem.stock.id,
          portionSize: productItem.quantity,
          stockQuantity: productItem.stock.stockQuantity,
        })
      }

      productsOutput.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        items: productItems,
      });
    }

    return productsOutput;
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

}
