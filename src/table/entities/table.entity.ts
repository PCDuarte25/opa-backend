
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../database_config/user/entity/user.entity';

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @OneToMany(() => User, user => user.table)
    users: User[];
}
