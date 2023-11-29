import { MeasurementUnit } from "../../stock/entities/stock.entity";

export interface CreateProductDto {
    productName: string;
    productPrice: number;
    productItems: ProductItemsDto[];
}

export interface ProductItemsDto {
    stockProductId: number;
    measurementUnit: MeasurementUnit;
    stockProductName: string;
    isPortion: boolean;
    quantity: number;
}
