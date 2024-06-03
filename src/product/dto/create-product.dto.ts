import { MeasurementUnit } from "../../stock/entities/stock.entity";

export interface CreateProductDto {
    productName: string;
    type: string;
    productPrice: number;
    productDescription: string;
    productItems: ProductItemsDto[];
    restaurantId: number;
}

export interface ProductItemsDto {
    stockProductId: number;
    measurementUnit: MeasurementUnit;
    stockProductName: string;
    isPortion: boolean;
    quantity: number;
}
