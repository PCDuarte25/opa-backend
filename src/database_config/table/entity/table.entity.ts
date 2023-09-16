
import { User } from 'src/database_config/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';

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
