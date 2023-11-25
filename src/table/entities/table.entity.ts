
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Bill } from '../../bill/entities/bill.entity';
import { User } from '../../opa_person/entities/opa_person.entity';
import { Person } from '../../opa_person/entities/person.entity';

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @OneToMany(() => Person, person => person.table)
    persons: Person[];

    @OneToOne(() => Bill, bill => bill.table)
    bill: Bill;
}
