import { Person } from "src/database_config/person/entity/person.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Table } from "../../table/entity/table.entity";

enum MeasurementUnit {
    UN = 'UN',
    G = 'G',
    KG = 'KG',
}

@Entity()
export class Estoque {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true, nullable: false, type: "varchar" })
    product_description: string;

    @Column({ nullable: false, type: "float64" })
    stock_quantity: number;

    @Column({ type: "enum", enum: MeasurementUnit, default: MeasurementUnit.G })
    measurement_unit: string
}

