
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../../database_config/user/entity/user.entity';
import { Bill } from '../../bill/entities/bill.entity';

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @OneToMany(() => User, user => user.table)
    users: User[];

    @OneToOne(() => Bill, bill => bill.table)
    bill: Bill;
}
