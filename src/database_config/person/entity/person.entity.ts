
import { User } from '../../user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50})
    name: string;

    @Column({ length: 1 })
    gender: string;

    @Column({ length: 11 })
    cpf: string;

    @Column({ length: 70, default: '' })
    street: string;

    @Column({ length: 70, default: '' })
    neighborhood: string;

    @Column({ length: 6, default: '' })
    streetNumber: string;

    @Column({ length: 40, default: '' })
    complement: string;

    @Column({ length: 40, default: '' })
    city: string;

    @Column({ length: 40, default: '' })
    state: string;

    @Column({ length: 8, default: '' })
    cep: string;

    @Column({ length: 14 })
    phoneNumber: string;

    @Column({ type: 'date', default: null })
    birthDate: string;

    @OneToOne(() => User, user => user.person, {
        cascade: true,
    })
    @JoinColumn({referencedColumnName: "id", name: "user_id"})
    user: User;
}
