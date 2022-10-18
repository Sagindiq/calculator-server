import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BankCredits } from "./bankCredits.entity";

@Entity({
    name: 'banks'
})

export class Banks {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    bank_name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    bank_image: string;

    @Column({
        type: 'bigint',
        default: 2500000
    })
    bank_service: bigint

    @OneToMany(() => BankCredits, bc => bc.bank)
    bank_credit: BankCredits
}