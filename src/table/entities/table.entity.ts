
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, CreateDateColumn } from 'typeorm';
import { Bill } from '../../bill/entities/bill.entity';
import { Person } from '../../opa_person/entities/person.entity';

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @OneToMany(() => Person, person => person.table)
    persons: Person[];

    @OneToOne(() => Bill, bill => bill.table, { eager: false })
    bill: Bill;

    @ManyToOne(() => Person, person => person.table)
    waiter: Person;

    @CreateDateColumn()
    openedAt: Date;

    @Column({ default: 1 })
    status: number;
}
