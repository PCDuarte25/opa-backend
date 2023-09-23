
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 1 })
    gender: string;

    @Column({ length: 11 })
    cpf: string;

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

    @Column({ type: 'date' })
    birthDate: string;

    @OneToOne(() => User, user => user.person)
    @JoinColumn({ referencedColumnName: "id", name: "user_id" })
    user?: User;
}
