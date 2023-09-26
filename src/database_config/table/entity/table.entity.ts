
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    status: string;

    @OneToMany(() => User, user => user.table)
    @JoinColumn({ referencedColumnName: "id", name: "user_id" })
    users: User;
}
