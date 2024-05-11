import { Person } from "src/opa_person/entities/person.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum SegmentEnum {
  Bar = 1,
  Sweeties = 2,
  Traditional = 3,
  ToGo = 4,
  Bakery = 5,
}

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 50 })
    name: string;

    @Column({ type: 'enum', enum: SegmentEnum, default: SegmentEnum.Traditional })
    segment: number;

    @Column({ length: 14 })
    cnpj: string;

    @Column({ length: 70 })
    street: string;

    @Column({ length: 70 })
    neighborhood: string;

    @Column({ length: 6 })
    streetNumber: string;

    @Column({ length: 40 })
    complement: string;

    @Column({ length: 40 })
    city: string;

    @Column({ length: 40 })
    state: string;

    @Column({ length: 8 })
    cep: string;

    @Column({ length: 14 })
    phoneNumber: string;

    @ManyToOne(() => Person, person => person.restaurant)
    owner?: Person;

    @ManyToMany(() => Person)
    @JoinTable()
    emplooyes?: Person[];
}
