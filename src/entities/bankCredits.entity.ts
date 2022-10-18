import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Banks } from "./banks.entity";

@Entity({
    name: 'bank_credits'
})

export class BankCredits {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'integer',
        nullable: false
    })
    mortgage_duration: number;

    @Column({
        type: 'bigint',
        nullable: false
    })
    max_mortgage: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    starting_payment: number

    @ManyToOne(() => Banks, b => b.bank_credit)
    bank: Banks
}