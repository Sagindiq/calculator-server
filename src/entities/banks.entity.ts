import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
    bank_service: bigint;

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
}