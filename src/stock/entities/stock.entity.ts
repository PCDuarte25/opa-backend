import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { MeasurementUnit, ProductItem } from "../../database_config/product_item/productItems.entity";

//tabela de cadastro de produto
@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 100, unique: true, nullable: false, type: "varchar" })
    productCode: string;

    @Column({ length: 100, unique: true, nullable: false, type: "varchar" })
    productDescription: string;

    @Column({ nullable: false, type: "decimal" })
    stockQuantity: number;

    @Column({ nullable: true })
    portionQuantity: number;

    @Column({ nullable: true, type: "enum", enum: MeasurementUnit, default: MeasurementUnit.G })
    portionMeasurementUnit: string;

    @Column({ nullable: true, type: "enum", enum: MeasurementUnit, default: MeasurementUnit.G })
    measurementUnit: string;

    @OneToMany(() => ProductItem, productItem => productItem.stock)
    productItems?: ProductItem[];
}