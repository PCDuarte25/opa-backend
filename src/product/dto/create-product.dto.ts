import { MeasurementUnit, ProductItem } from '../../database_config/product_item/productItems.entity';

export class CreateProductDto {
    id: number;
    name: string;
    price: number;
    productCode: string;
    items: CreateProductItem[];
}

export class CreateProductItem {
    stockId: number;
    isPortion: boolean;
    portionQuantity: number;
    measurementUnit: MeasurementUnit;
    quantity: number;
}