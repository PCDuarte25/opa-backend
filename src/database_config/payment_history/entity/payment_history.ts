import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalValue: number;

    @CreateDateColumn()
    date: string;

    @Column({ nullable: false, type: "decimal" })
    tax: number;
}

